
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Booking {
  id: string;
  customer_name: string;
  customer_phone: number;
  address: string;
  selected_date: string;
  selected_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  provider_id: string | null;
  customer_id: string;
  description?: string;
  total_price?: number;
  created_at: string;
  updated_at: string;
}

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Type assertion to ensure status field matches our interface
      const typedBookings = (data || []).map(booking => ({
        ...booking,
        status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
      }));

      setBookings(typedBookings);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'customer_id'>) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { error: insertError } = await supabase
        .from('bookings')
        .insert([
          {
            ...bookingData,
            customer_id: user.id,
          }
        ]);

      if (insertError) throw insertError;

      await fetchBookings(); // Refresh bookings
      return { success: true };
    } catch (err: any) {
      console.error('Error creating booking:', err);
      return { success: false, error: err.message };
    }
  };

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));

      return { success: true };
    } catch (err: any) {
      console.error('Error updating booking status:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBookingStatus,
    refetch: fetchBookings,
  };
};
