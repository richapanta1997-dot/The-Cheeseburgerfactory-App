import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Supabase configuration
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '');
};

// Create Supabase client only if configured
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyAccount {
  id: string;
  user_id: string;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  lifetime_points: number;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyTransaction {
  id: string;
  user_id: string;
  points_change: number;
  transaction_type: 'earned' | 'redeemed' | 'adjusted' | 'bonus' | 'expired';
  description: string | null;
  order_reference: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string | null;
  points_required: number;
  reward_type: 'discount' | 'free_item' | 'special_offer';
  is_active: boolean;
  image_url: string | null;
  terms: string | null;
  created_at: string;
  updated_at: string;
}

export interface RedeemedReward {
  id: string;
  user_id: string;
  reward_id: string;
  points_spent: number;
  redemption_code: string | null;
  status: 'active' | 'used' | 'expired';
  expires_at: string | null;
  redeemed_at: string;
  used_at: string | null;
}

// Get current user
export const getCurrentUser = async () => {
  if (!supabase) return null;
  
  try {
    // First check if there's a session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }
    
    // If no session, return null (user not logged in)
    if (!session) {
      return null;
    }
    
    // If session exists, get the user
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
};

// Get user's loyalty account
export const getLoyaltyAccount = async (userId: string): Promise<LoyaltyAccount | null> => {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('loyalty_accounts')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // Don't log error if table doesn't exist yet (database not set up)
      if (error.code !== 'PGRST116' && error.code !== 'PGRST204' && error.code !== 'PGRST205') {
        console.error('Error fetching loyalty account:', error);
      }
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching loyalty account:', error);
    return null;
  }
};

// Get user's loyalty transactions
export const getLoyaltyTransactions = async (userId: string, limit = 10): Promise<LoyaltyTransaction[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('loyalty_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }

  return data || [];
};

// Get available rewards
export const getAvailableRewards = async (): Promise<Reward[]> => {
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true)
      .order('points_required', { ascending: true });

    if (error) {
      // Don't log error if table doesn't exist yet (database not set up)
      if (error.code !== 'PGRST204' && error.code !== 'PGRST205') {
        console.error('Error fetching rewards:', error);
      }
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return [];
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }

  return data;
};

// Sign out
export const signOut = async () => {
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (session: any) => void) => {
  if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};