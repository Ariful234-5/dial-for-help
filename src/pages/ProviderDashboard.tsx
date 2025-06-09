
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Calendar, 
  Users, 
  Star, 
  MessageCircle, 
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useProviderDashboard } from '@/hooks/useProviderDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import EarningsReport from '@/components/enhanced/EarningsReport';
import { ChatWindow } from '@/components/ChatWindow';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { stats, recentBookings, loading, updateBookingStatus } = useProviderDashboard(user?.id);
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);

  const handleStatusChange = async (bookingId: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    const result = await updateBookingStatus(bookingId, status);
    
    if (result.success) {
      toast({
        title: 'সফল',
        description: `বুকিং স্ট্যাটাস ${status === 'confirmed' ? 'নিশ্চিত' : status === 'completed' ? 'সম্পন্ন' : 'বাতিল'} করা হয়েছে।`,
      });
    } else {
      toast({
        title: 'ত্রুটি',
        description: 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।',
        variant: 'destructive',
      });
    }
  };

  const openChat = (booking: any) => {
    setSelectedBooking(booking);
    setShowChat(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'অপেক্ষমাণ';
      case 'confirmed': return 'নিশ্চিত';
      case 'completed': return 'সম্পন্ন';
      case 'cancelled': return 'বাতিল';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">অ্যাক্সেস প্রয়োজন</h1>
          <p className="text-gray-600 mb-4">প্রোভাইডার ড্যাশবোর্ড দেখতে লগইন করুন।</p>
          <Button onClick={() => window.location.href = '/auth'}>
            লগইন করুন
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">প্রোভাইডার ড্যাশবোর্ড</h1>
              <p className="text-gray-600 mt-2">আপনার সেবা এবং বুকিং পরিচালনা করুন</p>
            </div>
            <Button className="w-full lg:w-auto">
              <Settings className="w-4 h-4 mr-2" />
              প্রোফাইল আপডেট
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">মোট আয়</p>
                  <p className="text-lg lg:text-2xl font-bold">৳{stats.totalEarnings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">মোট বুকিং</p>
                  <p className="text-lg lg:text-2xl font-bold">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">অপেক্ষমাণ</p>
                  <p className="text-lg lg:text-2xl font-bold">{stats.pendingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">রেটিং</p>
                  <p className="text-lg lg:text-2xl font-bold">{stats.averageRating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 h-auto p-1">
            <TabsTrigger value="bookings" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <Calendar className="w-4 h-4 mr-1 lg:mr-2" />
              বুকিং
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <TrendingUp className="w-4 h-4 mr-1 lg:mr-2" />
              আয়
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <Settings className="w-4 h-4 mr-1 lg:mr-2" />
              প্রোফাইল
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>সাম্প্রতিক বুকিং</CardTitle>
              </CardHeader>
              <CardContent>
                {recentBookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    কোন বুকিং পাওয়া যায়নি
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold">{booking.customer_name}</h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {getStatusText(booking.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              📅 {booking.selected_date} • ⏰ {booking.selected_time}
                            </p>
                            <p className="text-sm text-gray-600">
                              📍 {booking.address}
                            </p>
                            <p className="text-sm text-gray-600">
                              📞 {booking.customer_phone}
                            </p>
                            {booking.description && (
                              <p className="text-sm text-gray-500">💬 {booking.description}</p>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openChat(booking)}
                              className="w-full sm:w-auto"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              চ্যাট
                            </Button>
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  className="text-green-600 hover:bg-green-50 w-full sm:w-auto"
                                  variant="outline"
                                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  গ্রহণ
                                </Button>
                                <Button
                                  size="sm"
                                  className="text-red-600 hover:bg-red-50 w-full sm:w-auto"
                                  variant="outline"
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  বাতিল
                                </Button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                className="text-green-600 hover:bg-green-50 w-full sm:w-auto"
                                variant="outline"
                                onClick={() => handleStatusChange(booking.id, 'completed')}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                সম্পন্ন
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsReport providerId={user.id} />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>প্রোফাইল সেটিংস</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    প্রোফাইল আপডেট ফিচার শীঘ্রই আসছে...
                  </p>
                  <Button disabled>
                    প্রোফাইল এডিট করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Window */}
      {selectedBooking && (
        <ChatWindow
          bookingId={selectedBooking.id}
          provider={{ name: 'আপনি', available: true }}
          isOpen={showChat}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;
