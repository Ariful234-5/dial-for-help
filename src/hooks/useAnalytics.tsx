
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsData {
  totalUsers: number;
  activeProviders: number;
  pendingApprovals: number;
  totalRevenue: number;
  monthlyGrowth: number;
  avgRating: number;
  totalBookings: number;
  completionRate: number;
  responseTime: number;
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeProviders: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    avgRating: 0,
    totalBookings: 0,
    completionRate: 0,
    responseTime: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Get unique users count from bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('customer_id, total_price, status');

      if (bookingsError) throw bookingsError;

      // Get unique customer count
      const uniqueCustomers = new Set(bookingsData?.map(b => b.customer_id) || []);
      const totalUsers = uniqueCustomers.size;

      // Get active providers count
      const { count: activeProviders, error: providersError } = await supabase
        .from('service_providers')
        .select('*', { count: 'exact', head: true })
        .eq('available', true);

      if (providersError) throw providersError;

      // Get pending approvals count
      const { count: pendingApprovals, error: pendingError } = await supabase
        .from('service_providers')
        .select('*', { count: 'exact', head: true })
        .eq('verified', false);

      if (pendingError) throw pendingError;

      // Get total bookings count
      const totalBookings = bookingsData?.length || 0;

      // Get average rating
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('service_providers')
        .select('rating');

      if (ratingsError) throw ratingsError;

      const avgRating = ratingsData?.length > 0 
        ? ratingsData.reduce((sum, provider) => sum + (provider.rating || 0), 0) / ratingsData.length
        : 0;

      // Calculate total revenue from bookings
      const totalRevenue = bookingsData?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0;

      // Calculate completion rate
      const completedBookings = bookingsData?.filter(b => b.status === 'completed').length || 0;
      const completionRate = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;

      setAnalytics({
        totalUsers,
        activeProviders: activeProviders || 0,
        pendingApprovals: pendingApprovals || 0,
        totalRevenue,
        monthlyGrowth: 15.2, // Mock data
        avgRating: parseFloat(avgRating.toFixed(1)),
        totalBookings,
        completionRate: parseFloat(completionRate.toFixed(1)),
        responseTime: 12 // Mock data
      });

    } catch (err: any) {
      console.error('Error fetching analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    await fetchAnalytics();
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analytics,
    loading,
    error,
    refreshAnalytics,
  };
};
