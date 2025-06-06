
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
      // Since we can't directly query auth.users, we'll create mock data
      // In a real app, you'd need a profiles table or similar
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'ahmed@example.com',
          full_name: 'আহমেদ আলী',
          phone: '+880 1234 567890',
          status: 'active',
          created_at: '2024-01-15',
          total_bookings: 23,
          location: 'ধানমন্ডি'
        },
        {
          id: '2',
          email: 'fatema@example.com',
          full_name: 'ফাতেমা খাতুন',
          phone: '+880 1234 567891',
          status: 'active',
          created_at: '2024-01-12',
          total_bookings: 18,
          location: 'গুলশান'
        },
        {
          id: '3',
          email: 'karim@example.com',
          full_name: 'করিম মিয়া',
          phone: '+880 1234 567892',
          status: 'inactive',
          created_at: '2024-01-10',
          total_bookings: 5,
          location: 'উত্তরা'
        }
      ];
      
      setUsers(mockUsers);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: 'active' | 'inactive' | 'suspended') => {
    try {
      // In a real app, you'd update the user status in the database
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
      return { success: true };
    } catch (err: any) {
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
