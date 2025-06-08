
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  user_id: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Since notifications table doesn't exist, create mock notifications
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'নতুন বুকিং',
          message: 'আপনার একটি নতুন সার্ভিস বুকিং এসেছে।',
          type: 'info',
          read: false,
          createdAt: new Date().toLocaleDateString('bn-BD'),
          user_id: user.id,
        },
        {
          id: '2',
          title: 'পেমেন্ট সফল',
          message: 'আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 86400000).toLocaleDateString('bn-BD'),
          user_id: user.id,
        },
        {
          id: '3',
          title: 'প্রোফাইল আপডেট করুন',
          message: 'আপনার প্রোফাইল আপডেট করার জন্য অনুরোধ।',
          type: 'warning',
          read: true,
          createdAt: new Date(Date.now() - 172800000).toLocaleDateString('bn-BD'),
          user_id: user.id,
        }
      ];

      setNotifications(mockNotifications);
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      ));
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
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
    refetch: fetchNotifications,
  };
};
