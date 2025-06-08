
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

      // Get total users count
      const { count: totalUsers, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (usersError) throw usersError;

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
      const { count: totalBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      if (bookingsError) throw bookingsError;

      // Get average rating
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('service_providers')
        .select('rating');

      if (ratingsError) throw ratingsError;

      const avgRating = ratingsData?.length > 0 
        ? ratingsData.reduce((sum, provider) => sum + (provider.rating || 0), 0) / ratingsData.length
        : 0;

      // Calculate total revenue (mock calculation based on bookings)
      const totalRevenue = (totalBookings || 0) * 1200; // Average booking price

      setAnalytics({
        totalUsers: totalUsers || 0,
        activeProviders: activeProviders || 0,
        pendingApprovals: pendingApprovals || 0,
        totalRevenue,
        monthlyGrowth: 15.2, // Mock data
        avgRating: parseFloat(avgRating.toFixed(1)),
        totalBookings: totalBookings || 0,
        completionRate: 94.5, // Mock data
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
