import { Star, Gift, Award, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { useEffect, useState } from 'react';
import { getAvailableRewards, Reward as SupabaseReward } from '@/lib/supabase';
import { Skeleton } from '@/app/components/ui/skeleton';

interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  description: string;
  icon: React.ReactNode;
}

interface LoyaltyCardProps {
  points: number;
  tier: string;
  userId?: string;
  onRedeemReward: (rewardId: string) => void;
}

const getTierInfo = (points: number) => {
  if (points >= 1000) return { name: 'Platinum', color: 'bg-purple-500', nextTier: null, progress: 100 };
  if (points >= 500) return { name: 'Gold', color: 'bg-yellow-500', nextTier: 'Platinum', progress: (points / 1000) * 100 };
  if (points >= 250) return { name: 'Silver', color: 'bg-gray-400', nextTier: 'Gold', progress: (points / 500) * 100 };
  return { name: 'Bronze', color: 'bg-orange-700', nextTier: 'Silver', progress: (points / 250) * 100 };
};

export function LoyaltyCard({ points, tier, userId, onRedeemReward }: LoyaltyCardProps) {
  const tierInfo = getTierInfo(points);
  const [rewards, setRewards] = useState<SupabaseReward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      const availableRewards = await getAvailableRewards();
      setRewards(availableRewards);
      setLoading(false);
    };

    fetchRewards();
  }, []);

  return (
    <div className="space-y-6">
      {/* Loyalty Points Card */}
      <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Loyalty Points</span>
            <Badge className={`${tierInfo.color} border-0`}>{tierInfo.name}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2">{points}</div>
            <p className="text-sm opacity-90">Total Points</p>
          </div>
          
          {tierInfo.nextTier && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to {tierInfo.nextTier}</span>
                <span>{tierInfo.progress.toFixed(0)}%</span>
              </div>
              <Progress value={tierInfo.progress} className="h-2 bg-white/20" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <div>
        <h3 className="font-semibold mb-4">Available Rewards</h3>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : rewards.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {rewards.map((reward) => {
              const canRedeem = points >= reward.points_required;
              return (
                <Card key={reward.id} className={!canRedeem ? 'opacity-60' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${canRedeem ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                        {reward.reward_type === 'free_item' && <Gift className="h-5 w-5" />}
                        {reward.reward_type === 'discount' && <Award className="h-5 w-5" />}
                        {reward.reward_type === 'special_offer' && <Crown className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{reward.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-orange-600">
                            {reward.points_required} pts
                          </span>
                          <Button
                            size="sm"
                            disabled={!canRedeem}
                            onClick={() => onRedeemReward(reward.id)}
                          >
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <p>No rewards available at the moment. Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* How to Earn Points */}
      <Card>
        <CardHeader>
          <CardTitle>How to Earn Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Every $1 spent</span>
            <Badge variant="secondary">10 points</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">First order of the day</span>
            <Badge variant="secondary">25 bonus points</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Refer a friend</span>
            <Badge variant="secondary">100 points</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}