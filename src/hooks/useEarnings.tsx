
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Earning {
  id: string;
  provider_id: string;
  booking_id: string;
  amount: number;
  commission: number;
  net_amount: number;
  payment_status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
}

export const useEarnings = (providerId?: string) => {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEarnings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fallback to mock data since database tables may not exist yet
      const mockEarnings: Earning[] = [
        {
          id: '1',
          provider_id: providerId || user.id,
          booking_id: '1',
          amount: 1000,
          commission: 100,
          net_amount: 900,
          payment_status: 'paid',
          created_at: new Date().toISOString(),
        }
      ];
      setEarnings(mockEarnings);
      setTotalEarnings(900);
      
    } catch (err: any) {
      console.error('Error fetching earnings:', err);
      setError(err.message);
      
      // Fallback to mock data
      const mockEarnings: Earning[] = [
        {
          id: '1',
          provider_id: providerId || user.id,
          booking_id: '1',
          amount: 1000,
          commission: 100,
          net_amount: 900,
          payment_status: 'paid',
          created_at: new Date().toISOString(),
        }
      ];
      setEarnings(mockEarnings);
      setTotalEarnings(900);
    } finally {
      setLoading(false);
    }
  };

  const createEarning = async (bookingId: string, amount: number, providerId: string) => {
    try {
      const commission = amount * 0.1; // 10% commission
      const netAmount = amount - commission;
      
      // For now, just add to local state as fallback
      const newEarning: Earning = {
        id: Date.now().toString(),
        provider_id: providerId,
        booking_id: bookingId,
        amount,
        commission,
        net_amount: netAmount,
        payment_status: 'pending',
        created_at: new Date().toISOString(),
      };
      
      setEarnings(prev => [...prev, newEarning]);
      setTotalEarnings(prev => prev + netAmount);
      
      return { success: true };
    } catch (err: any) {
      console.error('Error creating earning:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, [user, providerId]);

  return {
    earnings,
    totalEarnings,
    loading,
    error,
    createEarning,
    refetch: fetchEarnings,
  };
};
