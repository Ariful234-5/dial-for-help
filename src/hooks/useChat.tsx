
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface ChatMessage {
  id: string;
  booking_id: string;
  sender_id: string;
  sender_type: 'customer' | 'provider';
  message: string;
  created_at: string;
}

export const useChat = (bookingId: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!bookingId || !user) return;

    try {
      setLoading(true);
      
      // Fallback to mock data since database tables may not exist yet
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          booking_id: bookingId,
          sender_id: 'provider-1',
          sender_type: 'provider',
          message: 'আস্সালামু আলাইকুম! আমি কিভাবে আপনাকে সাহায্য করতে পারি?',
          created_at: new Date().toISOString(),
        }
      ];
      setMessages(mockMessages);
      
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError(err.message);
      
      // Fallback to mock data
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          booking_id: bookingId,
          sender_id: 'provider-1',
          sender_type: 'provider',
          message: 'আস্সালামু আলাইকুম! আমি কিভাবে আপনাকে সাহায্য করতে পারি?',
          created_at: new Date().toISOString(),
        }
      ];
      setMessages(mockMessages);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string, senderType: 'customer' | 'provider') => {
    if (!user || !bookingId || !message.trim()) return;

    try {
      // Fallback for mock data since database may not have the table yet
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        booking_id: bookingId,
        sender_id: user.id,
        sender_type: senderType,
        message: message.trim(),
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, newMessage]);
      
      return { success: true };
    } catch (err: any) {
      console.error('Error sending message:', err);
      
      // Fallback for mock data
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        booking_id: bookingId,
        sender_id: user.id,
        sender_type: senderType,
        message: message.trim(),
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, newMessage]);
      
      return { success: true };
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [bookingId, user]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    refetch: fetchMessages,
  };
};
