
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  total_bookings: number;
  location?: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get all profiles with their auth data
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Get booking counts for each user
      const userIds = profiles?.map(p => p.id) || [];
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('customer_id')
        .in('customer_id', userIds);

      if (bookingsError) throw bookingsError;

      // Count bookings per user
      const bookingCounts = bookings?.reduce((acc: Record<string, number>, booking) => {
        acc[booking.customer_id] = (acc[booking.customer_id] || 0) + 1;
        return acc;
      }, {}) || {};

      // Transform profiles to users
      const transformedUsers: User[] = profiles?.map(profile => ({
        id: profile.id,
        email: profile.id, // We'll need to get this from auth
        full_name: profile.full_name || 'N/A',
        phone: profile.phone,
        status: 'active', // Default status
        created_at: new Date(profile.created_at).toLocaleDateString('bn-BD'),
        total_bookings: bookingCounts[profile.id] || 0,
        location: profile.location,
      })) || [];
      
      setUsers(transformedUsers);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: 'active' | 'inactive' | 'suspended') => {
    try {
      // Since we don't have a status field in profiles yet, we'll just update locally
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
      return { success: true };
    } catch (err: any) {
      console.error('Error updating user status:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    updateUserStatus,
    refetch: fetchUsers,
  };
};
