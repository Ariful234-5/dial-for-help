
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, DollarSign, Star, MessageCircle, Settings, User, TrendingUp } from 'lucide-react';

const ProviderDashboard = () => {
  const [language] = useState('bn');
  const [isAvailable, setIsAvailable] = useState(true);

  const text = {
    bn: {
      dashboard: 'প্রদানকারী ড্যাশবোর্ড',
      profile: 'প্রোফাইল',
      bookings: 'বুকিংসমূহ',
      earnings: 'আয়',
      reviews: 'রিভিউ',
      settings: 'সেটিংস',
      todayEarnings: 'আজকের আয়',
      totalBookings: 'মোট বুকিং',
      averageRating: 'গড় রেটিং',
      totalReviews: 'মোট রিভিউ',
      availability: 'উপলব্ধতা',
      available: 'উপলব্ধ',
      unavailable: 'অনুপলব্ধ',
      recentBookings: 'সাম্প্রতিক বুকিং',
      upcomingBookings: 'আসন্ন বুকিং',
      completedBookings: 'সম্পন্ন বুকিং'
    },
    en: {
      dashboard: 'Provider Dashboard',
      profile: 'Profile',
      bookings: 'Bookings',
      earnings: 'Earnings',
      reviews: 'Reviews',
      settings: 'Settings',
      todayEarnings: "Today's Earnings",
      totalBookings: 'Total Bookings',
      averageRating: 'Average Rating',
      totalReviews: 'Total Reviews',
      availability: 'Availability',
      available: 'Available',
      unavailable: 'Unavailable',
      recentBookings: 'Recent Bookings',
      upcomingBookings: 'Upcoming Bookings',
      completedBookings: 'Completed Bookings'
    }
  };

  const stats = [
    {
      title: text[language].todayEarnings,
      value: '৳2,500',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: text[language].totalBookings,
      value: '156',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: text[language].averageRating,
      value: '4.8',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: text[language].totalReviews,
      value: '127',
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      customer: 'রহিম উদ্দিন',
      service: 'ইলেকট্রিক ওয়্যারিং',
      time: '10:00 AM',
      date: '২০২৪-০১-১৫',
      status: 'completed',
      amount: '৳১,২০০'
    },
    {
      id: 2,
      customer: 'ফাতেমা খাতুন',
      service: 'ফ্যান ইনস্টলেশন',
      time: '2:00 PM',
      date: '২০২৪-০১-১৫',
      status: 'upcoming',
      amount: '৳৮০০'
    },
    {
      id: 3,
      customer: 'করিম মিয়া',
      service: 'সুইচবোর্ড মেরামত',
      time: '11:00 AM',
      date: '২০২৪-০১-১৪',
      status: 'completed',
      amount: '৳৬০০'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{text[language].dashboard}</h1>
              <p className="text-gray-600 mt-2">Manage your services and bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {text[language].availability}:
                </span>
                <Switch 
                  checked={isAvailable} 
                  onCheckedChange={setIsAvailable}
                />
                <span className={`text-sm font-medium ${
                  isAvailable ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isAvailable ? text[language].available : text[language].unavailable}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">{text[language].bookings}</TabsTrigger>
            <TabsTrigger value="earnings">{text[language].earnings}</TabsTrigger>
            <TabsTrigger value="reviews">{text[language].reviews}</TabsTrigger>
            <TabsTrigger value="profile">{text[language].profile}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{text[language].recentBookings}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{booking.customer}</p>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                          <p className="text-xs text-gray-500">{booking.date} • {booking.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{booking.amount}</p>
                          <Badge variant={booking.status === 'completed' ? 'secondary' : 'default'}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Earnings Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.customer}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date} • {booking.time}</TableCell>
                        <TableCell className="text-green-600 font-semibold">{booking.amount}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === 'completed' ? 'secondary' : 'default'}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Detailed earnings analytics will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Review management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Profile editing features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
