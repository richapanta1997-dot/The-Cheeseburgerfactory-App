import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { User, LogOut, QrCode, Award, Mail, Calendar } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '@/contexts/auth-context';
import { LoyaltyAccount } from '@/lib/supabase';

interface ProfileViewProps {
  loyaltyAccount: LoyaltyAccount | null;
}

export function ProfileView({ loyaltyAccount }: ProfileViewProps) {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const userInitials = user.user_metadata?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-orange-500 text-white text-2xl">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">
                {user.user_metadata?.full_name || 'Guest'}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              {loyaltyAccount && (
                <Badge className={`
                  ${loyaltyAccount.tier === 'Platinum' ? 'bg-purple-500' : ''}
                  ${loyaltyAccount.tier === 'Gold' ? 'bg-yellow-500' : ''}
                  ${loyaltyAccount.tier === 'Silver' ? 'bg-gray-400' : ''}
                  ${loyaltyAccount.tier === 'Bronze' ? 'bg-orange-700' : ''}
                `}>
                  <Award className="h-3 w-3 mr-1" />
                  {loyaltyAccount.tier} Member
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Your Loyalty QR Code
          </CardTitle>
          <CardDescription>
            Show this at checkout to earn points on your order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg border-4 border-gray-200">
              <QRCodeSVG
                value={JSON.stringify({
                  userId: user.id,
                  email: user.email,
                  type: 'loyalty',
                  timestamp: Date.now(),
                })}
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>

            {/* User ID Display */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Customer ID</p>
              <code className="text-xs bg-gray-100 px-3 py-1 rounded font-mono">
                {user.id.slice(0, 8)}...{user.id.slice(-8)}
              </code>
            </div>

            <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>How to use:</strong> Present this QR code to staff when placing your order.
                They'll scan it to add points to your account.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      {loyaltyAccount && (
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Points</span>
              <span className="font-bold text-xl text-orange-600">{loyaltyAccount.points}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lifetime Points</span>
              <span className="font-semibold">{loyaltyAccount.lifetime_points}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Member Since</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-semibold">
                  {new Date(loyaltyAccount.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Actions */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Button
            onClick={signOut}
            variant="destructive"
            className="w-full"
            size="lg"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
