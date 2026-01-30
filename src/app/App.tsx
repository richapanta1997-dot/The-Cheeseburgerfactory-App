import { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  UtensilsCrossed,
  MapPin,
  Award,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  Tag,
  Gift,
  ShoppingBag,
  Bike,
  Menu,
  Instagram,
  Music
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Skeleton } from '@/app/components/ui/skeleton';
import { MenuItemCard } from '@/app/components/menu-item';
import type { MenuItem } from '@/app/components/menu-item';
import { OrderHistory } from '@/app/components/order-history';
import type { Order } from '@/app/components/order-history';
import { LoyaltyCard } from '@/app/components/loyalty-card';
import type { LoyaltyAccount } from '@/app/components/loyalty-card';
import { ProfileView } from '@/app/components/profile-view';
import { FindUs } from '@/app/components/find-us';
import type { Location } from '@/app/components/location-selector';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { getLoyaltyAccount, isSupabaseConfigured } from '@/lib/supabase';
import { LoyaltyTutorial } from '@/app/components/loyalty-tutorial';
import { Toaster, toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';

// Logo placeholder - replace with actual logo URL
const logo = "https://images.unsplash.com/photo-1625331725309-83e4f3c1373b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3Njk2Njg1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Burger hero image
const burgerHero = "https://images.unsplash.com/photo-1653581490850-bf7c7b7fc1c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBjaGVlc2VidXJnZXIlMjBmcmllcyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY5NzU4NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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

type ViewType = 'home' | 'order-now' | 'orders' | 'loyalty' | 'find-us' | 'promotions';

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
          <div className="space-y-4 p-4">
            {/* Compact Header with Logo */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-white text-center">
              <div className="flex items-center justify-center gap-3">
                <img 
                  src={logo} 
                  alt="Cheeseburger Factory" 
                  className="w-14 h-14 drop-shadow-lg"
                />
                <div className="text-left">
                  <h1 className="text-xl font-bold">Cheeseburger Factory</h1>
                  <p className="text-white/90 text-sm">Premium burgers delivered fresh</p>
                </div>
              </div>
            </div>

            {/* Loyalty Points Preview (if signed in) */}
            {user && loyaltyAccount && (
              <div 
                onClick={() => setCurrentView('loyalty')}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="h-7 w-7 text-yellow-600" />
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Your Rewards</p>
                      <p className="text-xl font-bold text-gray-900">{loyaltyAccount.points} points</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-yellow-700">{loyaltyAccount.tier}</p>
                    <p className="text-xs text-gray-500">Tap →</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Info - Sign in to earn rewards */}
            {!user && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-7 w-7 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900">Earn Rewards!</p>
                    <p className="text-xs text-gray-600">Sign in to collect points</p>
                  </div>
                </div>
                <Button
                  onClick={() => signIn()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  Sign In with Google
                </Button>
              </div>
            )}

            {/* Hero Menu Section with New Image */}
            <div 
              onClick={() => setCurrentView('order-now')}
              className="relative bg-white border-2 border-red-200 rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow group"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={burgerHero}
                  alt="Delicious Burgers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Order Now</h3>
                      <p className="text-white/90 text-sm">Fresh, juicy burgers await</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <UtensilsCrossed className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500">
                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <ShoppingBag className="h-5 w-5" />
                  <span>PICKUP OR DELIVERY</span>
                  <span className="text-white/80">→</span>
                </div>
              </div>
            </div>

            {/* Quick Action Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Special Offers Card */}
              <div 
                onClick={() => setCurrentView('promotions')}
                className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-shadow"
              >
                <Tag className="h-8 w-8 mb-2" />
                <h4 className="font-bold text-sm mb-1">Special Offers</h4>
                <p className="text-xs text-white/90">Save on combos!</p>
              </div>

              {/* Find Us Card */}
              <div 
                onClick={() => setCurrentView('find-us')}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-shadow"
              >
                <MapPin className="h-8 w-8 mb-2" />
                <h4 className="font-bold text-sm mb-1">Find Us</h4>
                <p className="text-xs text-white/90">Locations & hours</p>
              </div>
            </div>

            {/* Location Quick Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{selectedLocation.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{selectedLocation.address}</p>
                  <p className="text-xs text-gray-500">{selectedLocation.hours}</p>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Follow Us</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.open('https://www.instagram.com/cheeseburgerfactoryau/?igsh=OWpkdXg0Nm80c3Zz&utm_source=qr#', '_blank')}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg transition-shadow"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="text-xs font-medium">Instagram</span>
                </button>
                <button
                  onClick={() => window.open('https://www.tiktok.com/@thecheeseburgerfactoryau?lang=en', '_blank')}
                  className="flex flex-col items-center gap-2 p-4 bg-black rounded-xl text-white hover:shadow-lg transition-shadow"
                >
                  <Music className="h-6 w-6" />
                  <span className="text-xs font-medium">TikTok</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'order-now' && (
          <div className="p-4 flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-sm space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">How would you like your order?</h2>
                <p className="text-gray-600">Choose your preferred option</p>
              </div>

              {/* Pickup Option */}
              <button
                onClick={() => window.open('https://cheeseburgerfactory.com.au/order-now-2', '_blank')}
                className="w-full bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <ShoppingBag className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">PICKUP</h3>
                <p className="text-white/90">
                  Order now and collect from store
                </p>
              </button>

              {/* Delivery Option */}
              <button
                onClick={() => window.open('https://cheeseburgerfactory.com.au/order-now-2', '_blank')}
                className="w-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Bike className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">DELIVERY</h3>
                <p className="text-white/90">
                  Get it delivered to your door
                </p>
              </button>

              <div className="text-center text-sm text-gray-500 pt-4">
                Both options will redirect you to our online ordering system
              </div>
            </div>
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
            {!user ? (
              // Show Sign In Prompt for non-authenticated users
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-sm space-y-6 text-center">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8">
                    <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Earn Rewards on Every Order!
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Sign in with Google to start earning points and unlock exclusive rewards
                    </p>
                    <Button
                      onClick={() => signIn()}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
                      size="lg"
                    >
                      Sign In with Google
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-left">
                    <h3 className="font-semibold text-gray-900 mb-3">🎁 Rewards Benefits:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Earn points on every purchase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Unlock exclusive rewards & free items</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Tier progression with VIP benefits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Birthday surprises & special offers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              // Show Profile & Rewards for authenticated users
              <>
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

                    {/* Quick Actions Section */}
                    <div className="mt-8 space-y-4">
                      <h3 className="font-semibold text-gray-900 text-lg mb-4">Follow Us</h3>
                      
                      {/* Social Media Section */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => window.open('https://www.instagram.com/cheeseburgerfactoryau/?igsh=OWpkdXg0Nm80c3Zz&utm_source=qr#', '_blank')}
                            className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg transition-shadow"
                          >
                            <Instagram className="h-7 w-7" />
                            <span className="text-sm font-medium">Instagram</span>
                          </button>
                          <button
                            onClick={() => window.open('https://www.tiktok.com/@thecheeseburgerfactoryau?lang=en', '_blank')}
                            className="flex flex-col items-center gap-2 p-5 bg-black rounded-xl text-white hover:shadow-lg transition-shadow"
                          >
                            <Music className="h-7 w-7" />
                            <span className="text-sm font-medium">TikTok</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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

        {currentView === 'promotions' && (
          <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
            
            {/* Featured Promotion Banner */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-yellow-400 text-black font-bold">LIMITED TIME</Badge>
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">Welcome Offer!</h3>
              <p className="text-white/90 text-lg mb-4">
                Get <span className="font-bold text-2xl">20% OFF</span> your first order
              </p>
              <Button
                onClick={handleOrderNow}
                className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold py-4"
              >
                ORDER NOW & SAVE
              </Button>
            </div>

            {/* Promotion Cards */}
            <div className="space-y-4">
              {/* Combo Deal */}
              <div className="bg-white border-2 border-orange-300 rounded-xl p-5 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Tag className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Burger + Fries Combo</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Any burger with large fries and a drink for just $15.90
                    </p>
                    <Badge variant="outline" className="border-orange-400 text-orange-700">
                      Save $3.50
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Family Deal */}
              <div className="bg-white border-2 border-blue-300 rounded-xl p-5 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Gift className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Family Pack Deal</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      4 burgers + 2 large fries + 4 drinks for $49.90
                    </p>
                    <Badge variant="outline" className="border-blue-400 text-blue-700">
                      Perfect for 4 people
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Loyalty Bonus */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-5 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Double Points Week!</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Earn 2X loyalty points on all orders this week
                    </p>
                    {user ? (
                      <Button
                        onClick={() => setCurrentView('loyalty')}
                        variant="outline"
                        size="sm"
                        className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                      >
                        View Your Points
                      </Button>
                    ) : (
                      <Button
                        onClick={() => signIn()}
                        variant="outline"
                        size="sm"
                        className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                      >
                        Sign In to Earn
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Student Discount */}
              <div className="bg-white border-2 border-green-300 rounded-xl p-5 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Tag className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Student Special</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Show your student ID for 15% off every Monday-Thursday
                    </p>
                    <Badge variant="outline" className="border-green-400 text-green-700">
                      Valid student ID required
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Now CTA */}
            <Button
              onClick={handleOrderNow}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
              size="lg"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              ORDER NOW
            </Button>
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
            onClick={() => setCurrentView('order-now')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'order-now' ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span className="text-xs">Order</span>
          </button>
          <button
            onClick={() => setCurrentView('promotions')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'promotions' ? 'text-yellow-500' : 'text-gray-400'
            } hover:text-yellow-500 transition-colors`}
          >
            <Tag className="h-6 w-6" />
            <span className="text-xs">Offers</span>
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
