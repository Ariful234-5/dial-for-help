
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, DollarSign, Star, MessageCircle, Settings, User, TrendingUp, Shield } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
      completedBookings: 'সম্পন্ন বুকিং',
      monthlyEarnings: 'মাসিক আয়',
      serviceAnalytics: 'সেবা বিশ্লেষণ',
      customerReviews: 'গ্রাহক রিভিউ',
      accountSettings: 'অ্যাকাউন্ট সেটিংস',
      viewAll: 'সবগুলো দেখুন',
      totalEarningsThisMonth: 'এই মাসের মোট আয়',
      totalEarningsLastMonth: 'গত মাসের মোট আয়',
      personalInfo: 'ব্যক্তিগত তথ্য',
      serviceSettings: 'সেবা সেটিংস',
      paymentSettings: 'পেমেন্ট সেটিংস',
      notificationSettings: 'নোটিফিকেশন সেটিংস'
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
      completedBookings: 'Completed Bookings',
      monthlyEarnings: 'Monthly Earnings',
      serviceAnalytics: 'Service Analytics',
      customerReviews: 'Customer Reviews',
      accountSettings: 'Account Settings',
      viewAll: 'View All',
      totalEarningsThisMonth: 'Total Earnings This Month',
      totalEarningsLastMonth: 'Total Earnings Last Month',
      personalInfo: 'Personal Information',
      serviceSettings: 'Service Settings',
      paymentSettings: 'Payment Settings',
      notificationSettings: 'Notification Settings'
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

  const reviewsList = [
    {
      id: 1,
      customer: 'মোহাম্মদ আলী',
      service: 'ইলেকট্রিক ওয়্যারিং',
      date: '২০২৪-০১-১২',
      rating: 5,
      comment: 'খুবই ভালো কাজ করেন। দ্রুত এবং নিখুঁত।'
    },
    {
      id: 2,
      customer: 'আয়েশা বেগম',
      service: 'ফ্যান ইনস্টলেশন',
      date: '২০২৪-০১-১০',
      rating: 4,
      comment: 'ভালো কাজ, তবে সময়ের চেয়ে একটু বেশি সময় নিয়েছে।'
    },
    {
      id: 3,
      customer: 'জহির উদ্দিন',
      service: 'লাইট রিপেয়ার',
      date: '২০২৪-০১-০৮',
      rating: 5,
      comment: 'অসাধারণ সেবা, আবার নিব।'
    }
  ];

  const monthlyEarningsData = [
    { month: 'Jan', amount: 18500 },
    { month: 'Feb', amount: 22000 },
    { month: 'Mar', amount: 19800 },
    { month: 'Apr', amount: 27500 },
    { month: 'May', amount: 24600 },
    { month: 'Jun', amount: 32000 }
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
                <CardTitle>{text[language].upcomingBookings}</CardTitle>
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
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            {booking.status !== 'completed' && (
                              <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                                Complete
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{text[language].monthlyEarnings}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Earnings Chart</h3>
                      <p className="text-gray-500 mb-4">Monthly earnings data will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">{text[language].totalEarningsThisMonth}</p>
                    <p className="text-2xl font-bold text-green-600">৳32,000</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">{text[language].totalEarningsLastMonth}</p>
                    <p className="text-2xl font-bold text-blue-600">৳24,600</p>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Recent Payments</h4>
                    <div className="space-y-3">
                      {monthlyEarningsData.slice(-3).map((data, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{data.month} Payment</p>
                            <p className="text-xs text-gray-500">Received on {data.month} 30, 2024</p>
                          </div>
                          <p className="font-semibold text-green-600">৳{data.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>{text[language].customerReviews}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviewsList.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{review.customer}</h3>
                          <p className="text-sm text-gray-500">{review.service} • {review.date}</p>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{text[language].personalInfo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value="রহিম উদ্দিন" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value="rahim@example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value="+880 1234 567890" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value="ধানমন্ডি, ঢাকা" className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value="বৈদ্যুতিক সার্ভিসিং এবং ইনস্টলেশনের ৮ বছরের অভিজ্ঞতা আছে। সব ধরনের ইলেকট্রিক্যাল কাজে দক্ষ।"
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{text[language].serviceSettings}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="electrician">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrician">Electrician</SelectItem>
                          <SelectItem value="plumber">Plumber</SelectItem>
                          <SelectItem value="ac-repair">AC Repair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priceRange">Price Range</Label>
                      <Input id="priceRange" value="৳৫০০-১৫০০" className="mt-1" />
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">Update Services</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{text[language].accountSettings}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      {text[language].notificationSettings}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      {text[language].paymentSettings}
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      Log Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
