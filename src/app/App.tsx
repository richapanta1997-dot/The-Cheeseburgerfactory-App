import { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  UtensilsCrossed,
  MapPin,
  Award,
  Star,
  ExternalLink,
  AlertCircle,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { QuickActionButton } from '@/app/components/quick-action-button';
import { FeaturedItem } from '@/app/components/featured-item';
import { PopularItemCard } from '@/app/components/popular-item-card';
import { MenuItemCard, type MenuItem } from '@/app/components/menu-item';
import { LoyaltyCard } from '@/app/components/loyalty-card';
import { OrderHistory, type Order } from '@/app/components/order-history';
import { LocationSelector, type Location } from '@/app/components/location-selector';
import { FindUs } from '@/app/components/find-us';
import { AuthScreen } from '@/app/components/auth-screen';
import { ProfileView } from '@/app/components/profile-view';
import { LoyaltyTutorial } from '@/app/components/loyalty-tutorial.tsx';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { getLoyaltyAccount, LoyaltyAccount, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';

// ⭐ GOOGLE REVIEWS CONFIGURATION - UPDATE THESE VALUES! ⭐
const GOOGLE_REVIEWS = {
  rating: 4.8, // Update with your actual Google rating
  totalReviews: 2400, // Update with your actual review count
  reviewsUrl: 'https://www.google.com/search?q=cheeseburger+factory+burwood+reviews#lrd=0x6b12bbf638ef7ce9:0x45f163abf2f6549,1,,,', // Update with your Google Maps/Reviews link
};

const LOCATIONS: Location[] = [
  {
    id: 'burwood',
    name: 'Burwood',
    address: '320-324 Parramatta Rd, Burwood NSW 2134',
    phone: '0499 952 010',
    hours: 'Mon-Thu: 12pm-12am | Fri: 4pm-12am | Sat: 12pm-12am | Sun: 12pm-10pm',
  },
];

const MENU_ITEMS: MenuItem[] = [
  // BURGERS
  {
    id: 'burger-1',
    name: 'Cheeseburger',
    description: 'Smashed Beef Patty, Cheese, Ketchup, Mustard, Onion, Pickles, Milk Bun',
    price: 11.90,
    category: 'Burgers',
    image: '',
    popular: true,
  },
  {
    id: 'burger-2',
    name: 'Double Cheeseburger',
    description: '2 X Smashed Beef Patty, Cheese, Ketchup, Mustard, Onion, Pickles, Milk Bun',
    price: 12.90,
    category: 'Burgers',
    image: '',
    popular: true,
  },
  {
    id: 'burger-3',
    name: 'Triple Cheeseburger',
    description: '3 X Smashed Beef Patty, Cheese, Ketchup, Mustard, Onion, Pickles, Milk Bun',
    price: 16.90,
    category: 'Burgers',
    image: '',
  },
  {
    id: 'burger-4',
    name: 'Deluxe',
    description: '2 X Smashed Beef Patty, Cheese, Lettuce, Tomato, Onion, Pickles, Mayo, Ketchup, Milk Bun',
    price: 13.90,
    category: 'Burgers',
    image: '',
    popular: true,
  },
  {
    id: 'burger-5',
    name: 'Royale',
    description: '2 X Smashed Beef Patty, Lettuce, Onion, Pickles, Special Sauce, Milk Bun',
    price: 13.90,
    category: 'Burgers',
    image: '',
  },
  {
    id: 'burger-6',
    name: 'Original',
    description: 'Southern Fried Chicken, Lettuce, Mayo, Milk Bun',
    price: 12.90,
    category: 'Burgers',
    image: '',
  },
  {
    id: 'burger-7',
    name: 'SFC',
    description: 'Southern Fried Chicken, Cheese, Lettuce, Pickles, Mayo, Milk Bun',
    price: 13.90,
    category: 'Burgers',
    image: '',
    popular: true,
  },
  {
    id: 'burger-8',
    name: 'Nashville',
    description: 'Spicy Fried Chicken, Slaw, Pickles, Comeback Sauce, Milk Bun',
    price: 13.90,
    category: 'Burgers',
    image: '',
  },
  {
    id: 'burger-9',
    name: 'Classic Chicken',
    description: 'Grilled Chicken, Lettuce, Mayo, Milk Bun',
    price: 11.90,
    category: 'Burgers',
    image: '',
  },
  {
    id: 'burger-10',
    name: 'Truffled',
    description: '2 x Smashed Beef Patty, Cheese, Rocket, Caramelised Onion, Truffle Aioli, Milk Bun',
    price: 13.90,
    category: 'Burgers',
    image: '',
  },
  // SIDES
  {
    id: 'side-1',
    name: 'Small Fries',
    description: 'Crispy golden fries',
    price: 4.90,
    category: 'Sides',
    image: '',
  },
  {
    id: 'side-2',
    name: 'Large Fries',
    description: 'Crispy golden fries - large size',
    price: 5.90,
    category: 'Sides',
    image: '',
  },
  {
    id: 'side-3',
    name: 'Cheesy Fries',
    description: 'Fries with cheese sauce',
    price: 7.90,
    category: 'Sides',
    image: '',
    popular: true,
  },
  {
    id: 'side-4',
    name: 'Gravy Fries',
    description: 'Fries with gravy',
    price: 7.90,
    category: 'Sides',
    image: '',
  },
  {
    id: 'side-5',
    name: 'Cali Fries',
    description: 'Fries with cheese sauce and special sauce',
    price: 8.90,
    category: 'Sides',
    image: '',
  },
  {
    id: 'side-6',
    name: 'Onion Rings',
    description: '6 pieces',
    price: 7.90,
    category: 'Sides',
    image: '',
  },
  {
    id: 'side-7',
    name: 'Nashville Chicken Loaded Fries',
    description: 'Loaded fries with Nashville chicken',
    price: 9.99,
    category: 'Sides',
    image: '',
  },
  // COMBOS
  {
    id: 'combo-1',
    name: 'Small Combo',
    description: 'Small fries and can of soft drink',
    price: 7.50,
    category: 'Combos',
    image: '',
  },
  {
    id: 'combo-2',
    name: 'Large Combo',
    description: 'Large fries and 600ml drink',
    price: 9.50,
    category: 'Combos',
    image: '',
  },
  {
    id: 'combo-3',
    name: 'Large Loaded Combo',
    description: 'Loaded fries and 600ml soft drink',
    price: 11.50,
    category: 'Combos',
    image: '',
  },
  {
    id: 'combo-4',
    name: 'Small Loaded Combo',
    description: 'Loaded fries and 600ml drink',
    price: 10.50,
    category: 'Combos',
    image: '',
  },
  // DRINKS
  {
    id: 'drink-1',
    name: 'Red Bull',
    description: 'Energy drink',
    price: 5.00,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-2',
    name: 'Red Bull No Sugar',
    description: 'Sugar-free energy drink',
    price: 5.00,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-3',
    name: 'Lipton Peach Ice Tea',
    description: 'Refreshing iced tea',
    price: 5.00,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-4',
    name: 'Orange Juice',
    description: 'Fresh orange juice',
    price: 5.00,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-5',
    name: 'Apple Juice',
    description: 'Fresh apple juice',
    price: 5.00,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-6',
    name: 'Pepsi',
    description: 'Classic cola',
    price: 3.50,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-7',
    name: 'Pepsi Max',
    description: 'Zero sugar cola',
    price: 3.50,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-8',
    name: 'Mountain Dew',
    description: 'Citrus flavored soda',
    price: 3.50,
    category: 'Drinks',
    image: '',
  },
  {
    id: 'drink-9',
    name: 'Water',
    description: 'Bottled water',
    price: 3.50,
    category: 'Drinks',
    image: '',
  },
  // SAUCES
  {
    id: 'sauce-1',
    name: 'Special Sauce',
    description: 'Our signature sauce',
    price: 1.00,
    category: 'Sauces',
    image: '',
  },
  {
    id: 'sauce-2',
    name: 'Comeback Sauce',
    description: 'Tangy comeback sauce',
    price: 1.00,
    category: 'Sauces',
    image: '',
  },
  {
    id: 'sauce-3',
    name: 'Gravy',
    description: 'Rich gravy',
    price: 3.00,
    category: 'Sauces',
    image: '',
  },
  {
    id: 'sauce-4',
    name: 'Mayo',
    description: 'Creamy mayonnaise',
    price: 1.00,
    category: 'Sauces',
    image: '',
  },
  {
    id: 'sauce-5',
    name: 'Cheese Sauce',
    description: 'Creamy cheese sauce',
    price: 3.00,
    category: 'Sauces',
    image: '',
  },
];

type ViewType = 'home' | 'menu' | 'orders' | 'loyalty' | 'find-us' | 'reviews';

function MainApp() {
  const { user, loading: authLoading, signIn } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loyaltyAccount, setLoyaltyAccount] = useState<LoyaltyAccount | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(LOCATIONS[0]);
  const [loadingLoyalty, setLoadingLoyalty] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Check if Supabase is configured
  const supabaseConfigured = isSupabaseConfigured();

  // Fetch loyalty account when user logs in
  useEffect(() => {
    const fetchLoyaltyAccount = async () => {
      if (user && supabaseConfigured) {
        setLoadingLoyalty(true);
        const account = await getLoyaltyAccount(user.id);
        setLoyaltyAccount(account);
        setLoadingLoyalty(false);
      }
    };

    fetchLoyaltyAccount();
  }, [user, supabaseConfigured]);

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location);
    toast.success(`Location changed to ${location.name}`);
  };

  const redeemReward = (rewardId: string) => {
    toast.success('Reward redeemed! Use it on your next order.', { duration: 3000 });
  };

  const handleOrderNow = () => {
    window.open('https://ou.abacus.co/en/Store/5972057/', '_blank');
  };

  const handleViewReviews = () => {
    window.open(GOOGLE_REVIEWS.reviewsUrl, '_blank');
  };

  const popularItems = MENU_ITEMS.filter(item => item.popular);

  // Show auth screen if user is not logged in
  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Toaster />
        <div className="max-w-2xl mx-auto mt-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Supabase Not Configured</AlertTitle>
            <AlertDescription>
              Please configure your Supabase credentials in the .env file to enable authentication and loyalty features.
              <br /><br />
              <strong>Required environment variables:</strong>
              <ul className="list-disc list-inside mt-2">
                <li>VITE_SUPABASE_URL</li>
                <li>VITE_SUPABASE_ANON_KEY</li>
              </ul>
              <br />
              See .env.example for reference.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  // Allow browsing without authentication - only loyalty features require sign-in
  // if (!user) {
  //   return <AuthScreen onSignIn={signIn} />;
  // }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Toaster />

      {/* Loyalty Tutorial Modal */}
      {showTutorial && <LoyaltyTutorial onClose={() => setShowTutorial(false)} />}

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {currentView === 'home' && (
          <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Cheeseburger Factory</h1>
                <LocationSelector
                  locations={LOCATIONS}
                  selectedLocation={selectedLocation}
                  onSelectLocation={handleLocationChange}
                />
              </div>
              {user ? (
                <button
                  onClick={() => setCurrentView('loyalty')}
                  className="flex items-center gap-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8 text-gray-600" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Featured Item */}
            <FeaturedItem
              name="Camel Burger"
              badge="Limited Offer"
              originalPrice={15.99}
              salePrice={9.99}
            />

            {/* Quick Actions */}
            <div>
              <h2 className="font-semibold mb-4">Quick Action</h2>
              <div className="grid grid-cols-4 gap-4">
                <QuickActionButton
                  icon={UtensilsCrossed}
                  label="Menu"
                  color="bg-yellow-500"
                  onClick={() => setCurrentView('menu')}
                />
                <QuickActionButton
                  icon={Award}
                  label="Rewards"
                  color="bg-green-500"
                  onClick={() => setCurrentView('loyalty')}
                />
                <QuickActionButton
                  icon={MapPin}
                  label="Find Us"
                  color="bg-blue-500"
                  onClick={() => setCurrentView('find-us')}
                />
              </div>
            </div>

            {/* Popular Items */}
            <div>
              <h2 className="font-semibold mb-4">Popular Items</h2>
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-2">
                  {popularItems.map((item) => (
                    <PopularItemCard
                      key={item.id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      rating={4.8}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Order Now Button */}
            <Button
              onClick={handleOrderNow}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
              size="lg"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Order Now
            </Button>
          </div>
        )}

        {currentView === 'menu' && (
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Full Menu</h2>
              <Badge variant="outline">{MENU_ITEMS.length} items</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {MENU_ITEMS.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
            
            {/* Order Now Button */}
            <Button
              onClick={handleOrderNow}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold sticky bottom-20 z-10"
              size="lg"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Order Now
            </Button>
          </div>
        )}

        {currentView === 'orders' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            <OrderHistory orders={orders} />
          </div>
        )}

        {currentView === 'loyalty' && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Profile & Rewards</h2>
              <button
                onClick={() => setShowTutorial(true)}
                className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                title="How Loyalty Works"
              >
                <HelpCircle className="h-5 w-5 text-red-500" />
              </button>
            </div>
            {loadingLoyalty ? (
              <div className="space-y-4">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
            ) : (
              <>
                <ProfileView loyaltyAccount={loyaltyAccount} />
                <div className="mt-6">
                  <LoyaltyCard
                    points={loyaltyAccount?.points || 0}
                    tier={loyaltyAccount?.tier || 'Bronze'}
                    userId={user?.id}
                    onRedeemReward={redeemReward}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {currentView === 'find-us' && (
          <div className="p-4">
            <FindUs
              locations={LOCATIONS}
              selectedLocation={selectedLocation}
              onSelectLocation={handleLocationChange}
            />
          </div>
        )}

        {currentView === 'reviews' && (
          <div className="p-4 flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-sm space-y-6">
              {/* Google Reviews Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Google Reviews</h3>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-6 w-6 ${
                          i < Math.floor(GOOGLE_REVIEWS.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'fill-gray-200 text-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{GOOGLE_REVIEWS.rating}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">
                  Based on {GOOGLE_REVIEWS.totalReviews.toLocaleString()} reviews
                </p>

                {/* Leave a Review Button */}
                <Button
                  onClick={handleViewReviews}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-6 text-lg font-semibold"
                  size="lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  LEAVE US A REVIEW
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'home' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setCurrentView('menu')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'menu' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Search className="h-6 w-6" />
            <span className="text-xs">Menu</span>
          </button>
          <button
            onClick={() => setCurrentView('reviews')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'reviews' ? 'text-yellow-500' : 'text-gray-400'
            } hover:text-yellow-500 transition-colors`}
          >
            <Star className="h-6 w-6" />
            <span className="text-xs">Reviews</span>
          </button>
          <button
            onClick={() => setCurrentView('find-us')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'find-us' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs">Locations</span>
          </button>
          <button
            onClick={() => setCurrentView('loyalty')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'loyalty' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
