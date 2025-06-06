
import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'নতুন বুকিং',
      message: 'আপনার একটি নতুন বুকিং রিকুয়েস্ট এসেছে',
      type: 'info',
      read: false,
      createdAt: '২০২৪-০১-১৮ ১০:৩০'
    },
    {
      id: '2',
      title: 'পেমেন্ট সম্পন্ন',
      message: 'আপনার ৳১৫০০ পেমেন্ট সফলভাবে সম্পন্ন হয়েছে',
      type: 'success',
      read: false,
      createdAt: '২০২৪-০১-১৭ ০৮:১৫'
    },
    {
      id: '3',
      title: 'রেটিং আপডেট',
      message: 'আপনি একটি ৫ স্টার রেটিং পেয়েছেন!',
      type: 'success',
      read: true,
      createdAt: '২০২৪-০১-১৬ ১৪:২০'
    }
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};
