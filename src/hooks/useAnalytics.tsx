
import { useState, useEffect } from 'react';

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
    totalUsers: 1247,
    activeProviders: 89,
    pendingApprovals: 12,
    totalRevenue: 125000,
    monthlyGrowth: 15.2,
    avgRating: 4.6,
    totalBookings: 3456,
    completionRate: 94.5,
    responseTime: 12
  });
  
  const [loading, setLoading] = useState(true);

  const refreshAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update with slightly different values to simulate real data
      setAnalytics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        totalBookings: prev.totalBookings + Math.floor(Math.random() * 50),
      }));
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setLoading(false), 500);
  }, []);

  return {
    analytics,
    loading,
    refreshAnalytics,
  };
};
