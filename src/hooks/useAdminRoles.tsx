
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      
      const { data, error: fetchError } = await supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      setIsAdmin(!!data);
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
      const { error: insertError } = await supabase
        .from('admin_roles')
        .insert({
          user_id: userId,
          role: 'admin'
        });

      if (insertError) throw insertError;
      
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
