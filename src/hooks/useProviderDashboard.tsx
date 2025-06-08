
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: number;
  address: string;
  selected_date: string;
  selected_time: string;
  status: string;
  provider_id: string;
  customer_id: string;
  description?: string;
  total_price?: number;
  created_at: string;
  updated_at: string;
}

export interface ProviderStats {
  totalBookings: number;
  completedJobs: number;
  pendingBookings: number;
  totalEarnings: number;
  averageRating: number;
  responseTime: number;
}

export const useProviderDashboard = (providerId?: string) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProviderStats>({
    totalBookings: 0,
    completedJobs: 0,
    pendingBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
    responseTime: 0
  });
  
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user || !providerId) return;

    try {
      setLoading(true);
      
      // Get all bookings for this provider
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('provider_id', providerId)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Get provider rating
      const { data: providerData, error: providerError } = await supabase
        .from('service_providers')
        .select('rating')
        .eq('id', providerId)
        .single();

      if (providerError) throw providerError;

      const totalBookings = bookings?.length || 0;
      const completedJobs = bookings?.filter(b => b.status === 'completed').length || 0;
      const pendingBookings = bookings?.filter(b => b.status === 'pending' || b.status === 'confirmed').length || 0;
      const totalEarnings = bookings?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0;

      setStats({
        totalBookings,
        completedJobs,
        pendingBookings,
        totalEarnings,
        averageRating: providerData?.rating || 0,
        responseTime: 15 // Mock data
      });

      setRecentBookings(bookings || []);
      
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (updateError) throw updateError;

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
      console.error('Error updating booking status:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user, providerId]);

  return {
    stats,
    recentBookings,
    loading,
    error,
    updateBookingStatus,
    refetch: fetchDashboardData,
  };
};
