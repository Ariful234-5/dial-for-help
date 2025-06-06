
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Booking = Tables<'bookings'>;
export type BookingInsert = TablesInsert<'bookings'>;

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
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type assertion to ensure the data matches our expected types
      setBookings((data || []) as Booking[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: Omit<BookingInsert, 'id' | 'created_at' | 'updated_at' | 'customer_id'>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
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
