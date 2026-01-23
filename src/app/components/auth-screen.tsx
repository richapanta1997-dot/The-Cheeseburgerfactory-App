import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Award, MapPin, Star, UtensilsCrossed } from 'lucide-react';

interface AuthScreenProps {
  onSignIn: () => void;
}

export function AuthScreen({ onSignIn }: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo/Brand */}
        <div className="text-center text-white">
          <div className="bg-white rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <UtensilsCrossed className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Cheeseburger Factory</h1>
          <p className="text-lg opacity-90">Join our loyalty program</p>
        </div>

        {/* Features Card */}
        <Card>
          <CardHeader>
            <CardTitle>Why Join?</CardTitle>
            <CardDescription>Get rewarded for every order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Award className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Earn Points</h3>
                <p className="text-sm text-gray-600">10 points for every $1 spent</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Exclusive Rewards</h3>
                <p className="text-sm text-gray-600">Redeem points for free items & discounts</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Multiple Locations</h3>
                <p className="text-sm text-gray-600">Use your rewards at any location</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign In Button */}
        <Button
          onClick={onSignIn}
          className="w-full bg-white text-red-600 hover:bg-gray-100 py-6 text-lg font-semibold"
          size="lg"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </Button>

        <p className="text-center text-white text-sm opacity-75">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
