
import { useState, useEffect } from 'react';
import { Tables } from '@/integrations/supabase/types';

type Booking = Tables<'bookings'>;
type ServiceProvider = Tables<'service_providers'>;

export interface ProviderStats {
  totalBookings: number;
  completedJobs: number;
  pendingBookings: number;
  totalEarnings: number;
  averageRating: number;
  responseTime: number;
}

export const useProviderDashboard = (providerId?: string) => {
  const [stats, setStats] = useState<ProviderStats>({
    totalBookings: 156,
    completedJobs: 142,
    pendingBookings: 8,
    totalEarnings: 45000,
    averageRating: 4.8,
    responseTime: 15
  });
  
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Create mock recent bookings
      const mockBookings: Booking[] = [
        {
          id: '1',
          customer_name: 'আহমেদ আলী',
          customer_phone: 1234567890,
          address: 'ধানমন্ডি, ঢাকা',
          selected_date: '2024-01-20',
          selected_time: '১০:০০ AM',
          status: 'pending',
          provider_id: providerId || '1',
          customer_id: '1',
          description: 'ইলেকট্রিক্যাল সমস্যা সমাধান',
          total_price: 1500,
          created_at: '2024-01-18T10:00:00Z',
          updated_at: '2024-01-18T10:00:00Z'
        },
        {
          id: '2',
          customer_name: 'ফাতেমা খাতুন',
          customer_phone: 1234567891,
          address: 'গুলশান, ঢাকা',
          selected_date: '2024-01-19',
          selected_time: '২:০০ PM',
          status: 'confirmed',
          provider_id: providerId || '1',
          customer_id: '2',
          description: 'ফ্যান ইনস্টলেশন',
          total_price: 800,
          created_at: '2024-01-17T14:00:00Z',
          updated_at: '2024-01-17T14:00:00Z'
        }
      ];
      
      setRecentBookings(mockBookings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
      setRecentBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));
      
      // Update stats if needed
      if (status === 'completed') {
        setStats(prev => ({
          ...prev,
          completedJobs: prev.completedJobs + 1,
          pendingBookings: Math.max(0, prev.pendingBookings - 1)
        }));
      }
      
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [providerId]);

  return {
    stats,
    recentBookings,
    loading,
    error,
    updateBookingStatus,
    refetch: fetchDashboardData,
  };
};
