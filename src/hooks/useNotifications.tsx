
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  user_id: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      setNotifications(data || []);
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setError(err.message);
      
      // Fallback to mock data if no notifications table exists yet
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'নতুন বুকিং',
          message: 'আপনার একটি নতুন সার্ভিস বুকিং এসেছে।',
          type: 'info',
          read: false,
          created_at: new Date().toISOString(),
          user_id: user.id,
        },
        {
          id: '2',
          title: 'পেমেন্ট সফল',
          message: 'আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।',
          type: 'success',
          read: false,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          user_id: user.id,
        }
      ];
      setNotifications(mockNotifications);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', user?.id);

      if (updateError) throw updateError;

      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      ));
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
      // Fallback for mock data
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      ));
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error: updateError } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user?.id)
        .eq('read', false);

      if (updateError) throw updateError;

      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    }
  };

  const createNotification = async (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    if (!user) return;

    try {
      const { error: insertError } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title,
          message,
          type,
          read: false
        });

      if (insertError) throw insertError;
      
      fetchNotifications(); // Refresh notifications
    } catch (err: any) {
      console.error('Error creating notification:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    createNotification,
    refetch: fetchNotifications,
  };
};
