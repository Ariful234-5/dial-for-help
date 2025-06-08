
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
      
      // Get unique customer IDs from bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('customer_id, customer_name, customer_phone, created_at');

      if (bookingsError) throw bookingsError;

      // Group bookings by customer to get user data
      const userMap = new Map<string, User>();
      
      bookings?.forEach(booking => {
        const userId = booking.customer_id;
        if (userMap.has(userId)) {
          const existingUser = userMap.get(userId)!;
          existingUser.total_bookings += 1;
        } else {
          userMap.set(userId, {
            id: userId,
            email: `${booking.customer_name?.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            full_name: booking.customer_name || 'N/A',
            phone: booking.customer_phone?.toString(),
            status: 'active',
            created_at: new Date(booking.created_at).toLocaleDateString('bn-BD'),
            total_bookings: 1,
            location: 'ঢাকা, বাংলাদেশ',
          });
        }
      });

      setUsers(Array.from(userMap.values()));
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: 'active' | 'inactive' | 'suspended') => {
    try {
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
