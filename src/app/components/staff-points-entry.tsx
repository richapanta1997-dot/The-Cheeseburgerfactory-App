import { useState } from 'react';
import { DollarSign, Scan, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { toast } from 'sonner';

interface StaffPointsEntryProps {
  onAddPoints: (userId: string, amount: number, points: number) => void;
  onClose: () => void;
}

export function StaffPointsEntry({ onAddPoints, onClose }: StaffPointsEntryProps) {
  const [scannedUserId, setScannedUserId] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculatePoints = (amount: number): number => {
    // 10 points per dollar
    return Math.floor(amount * 10);
  };

  const handleSubmit = async () => {
    if (!scannedUserId || !orderAmount) {
      toast.error('Please scan QR code and enter order amount');
      return;
    }

    const amount = parseFloat(orderAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    
    try {
      const points = calculatePoints(amount);
      await onAddPoints(scannedUserId, amount, points);
      
      toast.success(`Added ${points} points! ($${amount.toFixed(2)} order)`, {
        duration: 4000,
      });
      
      // Reset form
      setScannedUserId('');
      setOrderAmount('');
    } catch (error) {
      toast.error('Failed to add points. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScan = () => {
    // Simulated QR scan - in production, this would use device camera
    const mockUserId = prompt('Enter customer ID from QR code:');
    if (mockUserId) {
      setScannedUserId(mockUserId);
      toast.success('Customer scanned! Enter order amount.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold mb-1">Staff: Add Points</h2>
          <p className="text-white/90 text-sm">
            Scan customer QR code and enter order amount
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1: Scan QR Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Step 1: Scan Customer QR Code
            </label>
            <Button
              onClick={handleScan}
              className={`w-full h-24 ${
                scannedUserId
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white text-lg font-semibold`}
              disabled={isProcessing}
            >
              <Scan className="mr-2 h-6 w-6" />
              {scannedUserId ? '✓ Customer Scanned' : 'Scan QR Code'}
            </Button>
            {scannedUserId && (
              <p className="text-xs text-green-600 mt-2">
                Customer ID: {scannedUserId.substring(0, 8)}...
              </p>
            )}
          </div>

          {/* Step 2: Enter Order Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Step 2: Enter Order Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                className="pl-10 text-2xl font-semibold h-16"
                disabled={!scannedUserId || isProcessing}
              />
            </div>
            {orderAmount && (
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm font-semibold text-yellow-800">
                  Points to award: {calculatePoints(parseFloat(orderAmount) || 0)} pts
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  10 points per $1 spent
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!scannedUserId || !orderAmount || isProcessing}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            {isProcessing ? 'Adding Points...' : 'Add Points to Account'}
          </Button>

          {/* Cancel Button */}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
            disabled={isProcessing}
          >
            Cancel
          </Button>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              💡 How it works:
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Customer shows QR code from their profile</li>
              <li>• Scan the QR code with camera</li>
              <li>• Enter total order amount</li>
              <li>• Points are added instantly to their account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
