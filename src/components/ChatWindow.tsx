
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Send, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatWindowProps {
  provider: any;
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  provider,
  language,
  isOpen,
  onClose
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'provider',
      text: language === 'bn' ? 'আস্সালামু আলাইকুম! আমি কিভাবে আপনাকে সাহায্য করতে পারি?' : 'Hello! How can I help you today?',
      time: new Date().toLocaleTimeString()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate provider response
      setTimeout(() => {
        const responses = language === 'bn' ? [
          'ধন্যবাদ! আমি শীঘ্রই আপনার কাছে পৌঁছাবো।',
          'হ্যাঁ, এই কাজটি করতে পারব। খরচ হবে প্রায় ৮০০ টাকা।',
          'আমি আজ বিকেলে ফ্রি আছি। সময় ঠিক করুন।'
        ] : [
          'Thank you! I will reach you soon.',
          'Yes, I can do this work. It will cost around 800 BDT.',
          'I am free this afternoon. Please confirm the time.'
        ];
        
        const response = {
          id: messages.length + 2,
          sender: 'provider',
          text: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <DialogTitle className="text-lg">
                {language === 'bn' ? provider.name : provider.nameEn}
              </DialogTitle>
              <p className="text-sm text-gray-500">
                {provider.available ? 
                  (language === 'bn' ? 'অনলাইন' : 'Online') : 
                  (language === 'bn' ? 'ব্যস্ত' : 'Busy')
                }
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder={language === 'bn' ? 'মেসেজ লিখুন...' : 'Type a message...'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
