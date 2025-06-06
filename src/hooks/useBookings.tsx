
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Booking {
  id: string;
  customer_id: string;
  provider_id: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  description?: string;
  selected_date: string;
  selected_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price?: number;
  created_at: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBookings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('bookings')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'customer_id'>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await (supabase as any)
      .from('bookings')
      .insert([{
        ...bookingData,
        customer_id: user.id,
      }])
      .select()
      .single();

    if (error) throw error;

    await fetchBookings();
    return data;
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  return {
    bookings,
    loading,
    error,
    createBooking,
    refetch: fetchBookings,
  };
};
