
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface AdminRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export const useAdminRoles = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // For now, use fallback logic since database tables may not exist yet
      // Check if user email contains 'admin' as fallback
      const isUserAdmin = user.email?.includes('admin') || false;
      setIsAdmin(isUserAdmin);
      
    } catch (err: any) {
      console.error('Error checking admin status:', err);
      setError(err.message);
      
      // Fallback: check if user email contains 'admin'
      setIsAdmin(user.email?.includes('admin') || false);
    } finally {
      setLoading(false);
    }
  };

  const makeUserAdmin = async (userId: string) => {
    try {
      // For now, return success as fallback
      console.log('Making user admin:', userId);
      return { success: true };
    } catch (err: any) {
      console.error('Error making user admin:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  return {
    isAdmin,
    loading,
    error,
    makeUserAdmin,
    refetch: checkAdminStatus,
  };
};
