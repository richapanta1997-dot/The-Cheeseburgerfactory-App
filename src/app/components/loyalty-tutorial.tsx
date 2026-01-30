import { Award, Gift, Star, QrCode, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface LoyaltyTutorialProps {
  onClose: () => void;
}

export function LoyaltyTutorial({ onClose }: LoyaltyTutorialProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">🎉 Loyalty Rewards</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-white/90 text-sm">
            Earn points on every order and unlock exclusive rewards!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1: Sign In */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-lg">1</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Sign In with Google</h3>
              <p className="text-sm text-gray-600">
                Create your loyalty account in seconds using your Google account. No passwords to remember!
              </p>
            </div>
          </div>

          {/* Step 2: Show QR Code */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">2</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">Show Your QR Code</h3>
                <QrCode className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-sm text-gray-600">
                After ordering, show your unique QR code to staff at checkout. They'll scan it to add points to your account!
              </p>
            </div>
          </div>

          {/* Step 3: Earn Points */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">3</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">Earn Points</h3>
                <Award className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Earn <strong>10 points for every $1</strong> you spend!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                <p className="text-green-800 font-medium">Example:</p>
                <p className="text-green-700">$15 order = 150 points 🎉</p>
              </div>
            </div>
          </div>

          {/* Step 4: Redeem Rewards */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">4</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">Redeem Rewards</h3>
                <Gift className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Use your points to unlock delicious rewards!
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
                  <span className="text-gray-700">Free Small Fries</span>
                  <span className="font-semibold text-purple-600">500 pts</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
                  <span className="text-gray-700">Free Burger</span>
                  <span className="font-semibold text-purple-600">1,500 pts</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
                  <span className="text-gray-700">$10 Off Order</span>
                  <span className="font-semibold text-purple-600">2,000 pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tier System */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <h3 className="font-semibold text-gray-900">Tier Benefits</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">🥉 Bronze (0-999 pts)</span>
                <span className="text-gray-600">10 pts/$1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">🥈 Silver (1,000+ pts)</span>
                <span className="text-gray-600">12 pts/$1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">🥇 Gold (5,000+ pts)</span>
                <span className="text-gray-600">15 pts/$1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <Button
            onClick={onClose}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
            size="lg"
          >
            Got It! Let's Start Earning
          </Button>
        </div>
      </div>
    </div>
  );
}
