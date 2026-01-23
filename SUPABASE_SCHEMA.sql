-- Cheeseburger Factory Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS PROFILE TABLE
-- =====================================================
-- Stores additional user information beyond Supabase auth
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- =====================================================
-- LOYALTY POINTS TABLE
-- =====================================================
-- Tracks loyalty points for each customer
CREATE TABLE public.loyalty_accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    points INTEGER DEFAULT 0 CHECK (points >= 0),
    tier TEXT DEFAULT 'Bronze' CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
    lifetime_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.loyalty_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loyalty_accounts
CREATE POLICY "Users can view own loyalty account"
    ON public.loyalty_accounts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own loyalty account"
    ON public.loyalty_accounts FOR UPDATE
    USING (auth.uid() = user_id);

-- =====================================================
-- LOYALTY TRANSACTIONS TABLE
-- =====================================================
-- Records every loyalty point transaction (earned, redeemed, adjusted)
CREATE TABLE public.loyalty_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    points_change INTEGER NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'redeemed', 'adjusted', 'bonus', 'expired')),
    description TEXT,
    order_reference TEXT,
    created_by UUID REFERENCES auth.users(id), -- Admin who made the change
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for loyalty_transactions
CREATE POLICY "Users can view own transactions"
    ON public.loyalty_transactions FOR SELECT
    USING (auth.uid() = user_id);

-- Admins can insert transactions (we'll add admin role later)
CREATE POLICY "Service role can insert transactions"
    ON public.loyalty_transactions FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- FAVORITES TABLE
-- =====================================================
-- Stores user's favorite menu items
CREATE TABLE public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_id)
);

-- Enable Row Level Security
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for favorites
CREATE POLICY "Users can view own favorites"
    ON public.favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
    ON public.favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
    ON public.favorites FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- ORDER HISTORY TABLE
-- =====================================================
-- Records orders (for display purposes, actual ordering happens externally)
CREATE TABLE public.order_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    order_number TEXT,
    total_amount DECIMAL(10, 2),
    points_earned INTEGER DEFAULT 0,
    location TEXT,
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled')),
    items JSONB, -- Stores order items as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.order_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for order_history
CREATE POLICY "Users can view own orders"
    ON public.order_history FOR SELECT
    USING (auth.uid() = user_id);

-- =====================================================
-- REWARDS CATALOG TABLE
-- =====================================================
-- Available rewards that users can redeem with points
CREATE TABLE public.rewards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    points_required INTEGER NOT NULL CHECK (points_required > 0),
    reward_type TEXT CHECK (reward_type IN ('discount', 'free_item', 'special_offer')),
    is_active BOOLEAN DEFAULT true,
    image_url TEXT,
    terms TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Anyone can view active rewards
CREATE POLICY "Anyone can view active rewards"
    ON public.rewards FOR SELECT
    USING (is_active = true);

-- =====================================================
-- REDEEMED REWARDS TABLE
-- =====================================================
-- Tracks which rewards users have redeemed
CREATE TABLE public.redeemed_rewards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    reward_id UUID REFERENCES public.rewards(id),
    points_spent INTEGER NOT NULL,
    redemption_code TEXT, -- Unique code to show at restaurant
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
    expires_at TIMESTAMP WITH TIME ZONE,
    redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.redeemed_rewards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for redeemed_rewards
CREATE POLICY "Users can view own redeemed rewards"
    ON public.redeemed_rewards FOR SELECT
    USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to automatically update tier based on lifetime points
CREATE OR REPLACE FUNCTION update_loyalty_tier()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lifetime_points >= 10000 THEN
        NEW.tier := 'Platinum';
    ELSIF NEW.lifetime_points >= 5000 THEN
        NEW.tier := 'Gold';
    ELSIF NEW.lifetime_points >= 2000 THEN
        NEW.tier := 'Silver';
    ELSE
        NEW.tier := 'Bronze';
    END IF;
    
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update tier automatically
CREATE TRIGGER update_tier_trigger
    BEFORE UPDATE OF lifetime_points ON public.loyalty_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_loyalty_tier();

-- Function to create loyalty account when user signs up
CREATE OR REPLACE FUNCTION create_loyalty_account()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.loyalty_accounts (user_id, points, tier, lifetime_points)
    VALUES (NEW.id, 0, 'Bronze', 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create loyalty account
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_loyalty_account();

-- Function to add loyalty points (awards points and creates transaction)
CREATE OR REPLACE FUNCTION add_loyalty_points(
    p_user_id UUID,
    p_points INTEGER,
    p_description TEXT,
    p_order_reference TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Update loyalty account
    UPDATE public.loyalty_accounts
    SET 
        points = points + p_points,
        lifetime_points = lifetime_points + p_points,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- Create transaction record
    INSERT INTO public.loyalty_transactions (user_id, points_change, transaction_type, description, order_reference)
    VALUES (p_user_id, p_points, 'earned', p_description, p_order_reference);
END;
$$ LANGUAGE plpgsql;

-- Function to redeem loyalty points
CREATE OR REPLACE FUNCTION redeem_loyalty_points(
    p_user_id UUID,
    p_points INTEGER,
    p_description TEXT
)
RETURNS VOID AS $$
DECLARE
    current_points INTEGER;
BEGIN
    -- Check if user has enough points
    SELECT points INTO current_points
    FROM public.loyalty_accounts
    WHERE user_id = p_user_id;
    
    IF current_points < p_points THEN
        RAISE EXCEPTION 'Insufficient points. Current balance: %', current_points;
    END IF;
    
    -- Deduct points
    UPDATE public.loyalty_accounts
    SET 
        points = points - p_points,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- Create transaction record
    INSERT INTO public.loyalty_transactions (user_id, points_change, transaction_type, description)
    VALUES (p_user_id, -p_points, 'redeemed', p_description);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_loyalty_accounts_user_id ON public.loyalty_accounts(user_id);
CREATE INDEX idx_loyalty_transactions_user_id ON public.loyalty_transactions(user_id);
CREATE INDEX idx_loyalty_transactions_created_at ON public.loyalty_transactions(created_at DESC);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_order_history_user_id ON public.order_history(user_id);
CREATE INDEX idx_order_history_created_at ON public.order_history(created_at DESC);
CREATE INDEX idx_redeemed_rewards_user_id ON public.redeemed_rewards(user_id);

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample rewards
INSERT INTO public.rewards (name, description, points_required, reward_type, is_active) VALUES
('Free Small Fries', 'Redeem for a free small fries with any purchase', 100, 'free_item', true),
('10% Off Next Order', 'Get 10% off your entire next order', 200, 'discount', true),
('Free Cheeseburger', 'Redeem for a free classic cheeseburger', 300, 'free_item', true),
('Free Drink', 'Redeem for a free drink of your choice', 150, 'free_item', true),
('20% Off Next Order', 'Get 20% off your entire next order', 500, 'discount', true),
('Free Nashville Burger', 'Redeem for a free Nashville chicken burger', 400, 'free_item', true);

-- =====================================================
-- ADMIN FUNCTIONS (For manual point management)
-- =====================================================

-- Function for admins to manually adjust points
CREATE OR REPLACE FUNCTION admin_adjust_points(
    p_user_id UUID,
    p_points INTEGER,
    p_reason TEXT,
    p_admin_id UUID
)
RETURNS VOID AS $$
BEGIN
    -- Update loyalty account
    UPDATE public.loyalty_accounts
    SET 
        points = points + p_points,
        lifetime_points = CASE 
            WHEN p_points > 0 THEN lifetime_points + p_points 
            ELSE lifetime_points 
        END,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- Create transaction record
    INSERT INTO public.loyalty_transactions (user_id, points_change, transaction_type, description, created_by)
    VALUES (p_user_id, p_points, 'adjusted', p_reason, p_admin_id);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Run this entire SQL script in your Supabase SQL Editor
-- 2. Enable Google OAuth in Supabase Authentication settings
-- 3. Update your app's Supabase configuration with your project URL and anon key
-- 4. For production, consider adding more admin-specific tables and policies
-- 5. You may want to add email notifications for point awards/redemptions
