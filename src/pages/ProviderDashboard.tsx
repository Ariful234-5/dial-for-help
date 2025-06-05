import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, DollarSign, Star, MessageCircle, Settings, User, TrendingUp, Shield, CheckCircle, Phone, MapPin, Edit, Eye, Download, RefreshCw, Plus, Search, Filter } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ProviderDashboard = () => {
  const [language] = useState('bn');
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const { toast } = useToast();

  const text = {
    bn: {
      dashboard: 'প্রদানকারী ড্যাশবোর্ড',
      profile: 'প্রোফাইল',
      bookings: 'বুকিংসমূহ',
      earnings: 'আয়',
      reviews: 'রিভিউ',
      settings: 'সেটিংস',
      todayEarnings: "আজকের আয়",
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

  const [earningsData, setEarningsData] = useState({
    todayEarnings: 2500,
    weeklyEarnings: 15000,
    monthlyEarnings: 45000,
    totalEarnings: 125000,
    pendingPayments: 3500,
    lastPayment: '২০২৪-০১-১০',
    avgBookingValue: 850
  });

  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      date: '২০২৪-০১-১৬',
      time: '10:00 AM',
      customer: 'আহমেদ আলী',
      service: 'ইলেকট্রিক ওয়্যারিং',
      status: 'confirmed',
      payment: '৳১,২০০',
      location: 'ধানমন্ডি'
    },
    {
      id: 2,
      date: '২০২৪-০১-১৬',
      time: '2:00 PM',
      customer: 'ফাতেমা খাতুন',
      service: 'ফ্যান ইনস্টলেশন',
      status: 'pending',
      payment: '৳৮০০',
      location: 'গুলশান'
    },
    {
      id: 3,
      date: '২০২৪-০১-১৭',
      time: '11:00 AM',
      customer: 'করিম মিয়া',
      service: 'সুইচবোর্ড মেরামত',
      status: 'completed',
      payment: '৳৬০০',
      location: 'উত্তরা'
    }
  ]);

  const [recentBookings, setRecentBookings] = useState([
    {
      id: 1,
      customer: 'রহিম উদ্দিন',
      service: 'ইলেকট্রিক ওয়্যারিং',
      time: '10:00 AM',
      date: '২০২৪-০১-১৫',
      status: 'completed',
      amount: '৳১,২০০',
      rating: 5,
      location: 'ধানমন্ডি'
    },
    {
      id: 2,
      customer: 'ফাতেমা খাতুন',
      service: 'ফ্যান ইনস্টলেশন',
      time: '2:00 PM',
      date: '২০২৪-০১-১৫',
      status: 'upcoming',
      amount: '৳৮০০',
      rating: 0,
      location: 'গুলশান'
    },
    {
      id: 3,
      customer: 'করিম মিয়া',
      service: 'সুইচবোর্ড মেরামত',
      time: '11:00 AM',
      date: '২০২৪-০১-১৪',
      status: 'completed',
      amount: '৳৬০০',
      rating: 4,
      location: 'উত্তরা'
    },
    {
      id: 4,
      customer: 'সালমা বেগম',
      service: 'লাইট রিপেয়ার',
      time: '3:00 PM',
      date: '২০২৪-০১-১৩',
      status: 'cancelled',
      amount: '৳৪০০',
      rating: 0,
      location: 'মিরপুর'
    }
  ]);

  const [profileData, setProfileData] = useState({
    name: 'রহিম উদ্দিন',
    email: 'rahim@example.com',
    phone: '+880 1234 567890',
    location: 'ধানমন্ডি, ঢাকা',
    bio: 'বৈদ্যুতিক সার্ভিসিং এবং ইনস্টলেশনের ৮ বছরের অভিজ্ঞতা আছে। সব ধরনের ইলেকট্রিক্যাল কাজে দক্ষ।',
    category: 'electrician',
    priceRange: '৳৫০০-১৫০০',
    experience: 8,
    rating: 4.8,
    completedJobs: 156,
    responseTime: '15 মিনিট',
    languages: ['বাংলা', 'English']
  });

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    toast({
      title: 'উপলব্ধতা আপডেট হয়েছে',
      description: `আপনি এখন বুকিংয়ের জন্য ${checked ? 'উপলব্ধ' : 'অনুপলব্ধ'}।`,
    });
  };

  const handleBookingAction = (bookingId: number, action: 'complete' | 'view' | 'cancel' | 'reschedule' | 'contact') => {
    const booking = recentBookings.find(b => b.id === bookingId);
    
    if (action === 'complete') {
      setRecentBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'completed' }
            : booking
        )
      );
      toast({
        title: 'বুকিং সম্পন্ন',
        description: 'বুকিং সফলভাবে সম্পন্ন হিসেবে চিহ্নিত করা হয়েছে।',
      });
    } else if (action === 'cancel') {
      setRecentBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      toast({
        title: 'বুকিং বাতিল',
        description: 'বুকিং বাতিল করা হয়েছে।',
      });
    } else if (action === 'contact') {
      toast({
        title: 'গ্রাহকের সাথে যোগাযোগ',
        description: `${booking?.customer} এর সাথে যোগাযোগ করা হচ্ছে...`,
      });
    } else if (action === 'reschedule') {
      toast({
        title: 'বুকিং পুনঃনির্ধারণ',
        description: 'বুকিং পুনঃনির্ধারণের পৃষ্ঠা খোলা হচ্ছে...',
      });
    } else {
      toast({
        title: 'বুকিং বিস্তারিত',
        description: 'বুকিংয়ের বিস্তারিত তথ্য দেখানো হচ্ছে...',
      });
    }
  };

  const handleProfileSave = async () => {
    setIsUpdatingProfile(true);
    
    setTimeout(() => {
      setIsUpdatingProfile(false);
      toast({
        title: 'প্রোফাইল আপডেট হয়েছে',
        description: 'আপনার প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে।',
      });
    }, 1500);
  };

  const handleServiceUpdate = () => {
    toast({
      title: 'সেবা আপডেট হয়েছে',
      description: 'আপনার সেবা সেটিংস সফলভাবে আপডেট হয়েছে।',
    });
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      schedule: 'আপনার সময়সূচী খোলা হচ্ছে...',
      earnings: 'আয়ের রিপোর্ট তৈরি করা হচ্ছে...',
      profile: 'প্রোফাইল এডিটর খোলা হচ্ছে...',
      settings: 'অ্যাকাউন্ট সেটিংস খোলা হচ্ছে...',
      calendar: 'ক্যালেন্ডার ভিউ খোলা হচ্ছে...',
      analytics: 'আপনার পারফরম্যান্স বিশ্লেষণ দেখানো হচ্ছে...',
      support: 'সহায়তা কেন্দ্র খোলা হচ্ছে...',
      withdraw: 'টাকা তোলার প্রক্রিয়া শুরু হচ্ছে...'
    };
    
    toast({
      title: 'দ্রুত কার্যক্রম',
      description: actionMessages[action as keyof typeof actionMessages] || 'কার্যক্রম সম্পাদিত হয়েছে',
    });
  };

  const handleEarningsAction = (action: 'withdraw' | 'statement' | 'tax') => {
    const actionMessages = {
      withdraw: 'টাকা তোলার অনুরোধ প্রক্রিয়াধীন...',
      statement: 'আয়ের বিবৃতি ডাউনলোড হচ্ছে...',
      tax: 'কর তথ্য তৈরি করা হচ্ছে...'
    };

    toast({
      title: 'আয় ব্যবস্থাপনা',
      description: actionMessages[action],
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredBookings = recentBookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = bookingFilter === 'all' || booking.status === bookingFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      title: 'আজকের আয়',
      value: `৳${earningsData.todayEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+৳500 গতকাল থেকে'
    },
    {
      title: 'মোট বুকিং',
      value: profileData.completedJobs.toString(),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12 এই মাসে'
    },
    {
      title: 'গড় রেটিং',
      value: profileData.rating.toString(),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '+0.2 গত মাস থেকে'
    },
    {
      title: 'মোট রিভিউ',
      value: '127',
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+8 নতুন রিভিউ'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{text[language].dashboard}</h1>
              <p className="text-gray-600 mt-2">আপনার সেবা এবং বুকিং পরিচালনা করুন</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{text[language].availability}:</span>
                <Switch 
                  checked={isAvailable} 
                  onCheckedChange={handleAvailabilityChange}
                />
                <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? text[language].available : text[language].unavailable}
                </span>
              </div>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                {text[language].settings}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{text[language].overview}</TabsTrigger>
            <TabsTrigger value="bookings">{text[language].bookings}</TabsTrigger>
            <TabsTrigger value="earnings">{text[language].earnings}</TabsTrigger>
            <TabsTrigger value="reviews">{text[language].reviews}</TabsTrigger>
            <TabsTrigger value="profile">{text[language].profile}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{text[language].recentBookings}</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickAction('calendar')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {text[language].viewAll}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 4).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="font-medium">{booking.customer}</p>
                              <p className="text-sm text-gray-600">{booking.service}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <p className="text-xs text-gray-500">{booking.date} • {booking.time}</p>
                                <MapPin className="w-3 h-3 text-gray-400 ml-2" />
                                <p className="text-xs text-gray-500">{booking.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-semibold text-green-600">{booking.amount}</p>
                          <Badge variant={
                            booking.status === 'completed' ? 'secondary' : 
                            booking.status === 'upcoming' ? 'default' :
                            booking.status === 'cancelled' ? 'destructive' : 'outline'
                          }>
                            {booking.status === 'completed' ? 'সম্পন্ন' :
                             booking.status === 'upcoming' ? 'আসন্ন' :
                             booking.status === 'cancelled' ? 'বাতিল' : booking.status}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleBookingAction(booking.id, 'view')}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            {booking.status === 'upcoming' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'contact')}
                              >
                                <Phone className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      {text[language].viewAll}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{text[language].quickActions}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleQuickAction('schedule')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {text[language].viewAll}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleQuickAction('earnings')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {text[language].earnings}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleQuickAction('profile')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {text[language].profile}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleQuickAction('analytics')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {text[language].serviceAnalytics}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleQuickAction('support')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {text[language].customerReviews}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{text[language].earnings}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">{text[language].totalEarningsThisMonth}</p>
                      <p className="text-xl font-bold text-green-600">৳{earningsData.monthlyEarnings.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">{text[language].pendingPayments}</p>
                      <p className="text-xl font-bold text-blue-600">৳{earningsData.pendingPayments.toLocaleString()}</p>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleEarningsAction('withdraw')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {text[language].withdraw}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{text[language].bookings}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickAction('calendar')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {text[language].viewAll}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="গ্রাহক বা সেবা অনুসন্ধান করুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={bookingFilter} onValueChange={setBookingFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{text[language].viewAll}</SelectItem>
                      <SelectItem value="upcoming">{text[language].upcomingBookings}</SelectItem>
                      <SelectItem value="completed">{text[language].completedBookings}</SelectItem>
                      <SelectItem value="cancelled">{text[language].cancelled}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{text[language].customer}</TableHead>
                      <TableHead>{text[language].service}</TableHead>
                      <TableHead>{text[language].dateAndTime}</TableHead>
                      <TableHead>{text[language].location}</TableHead>
                      <TableHead>{text[language].amount}</TableHead>
                      <TableHead>{text[language].status}</TableHead>
                      <TableHead>{text[language].rating}</TableHead>
                      <TableHead>{text[language].actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.customer}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date} • {booking.time}</TableCell>
                        <TableCell>{booking.location}</TableCell>
                        <TableCell className="text-green-600 font-semibold">{booking.amount}</TableCell>
                        <TableCell>
                          <Badge variant={
                            booking.status === 'completed' ? 'secondary' : 
                            booking.status === 'upcoming' ? 'default' :
                            booking.status === 'cancelled' ? 'destructive' : 'outline'
                          }>
                            {booking.status === 'completed' ? 'সম্পন্ন' :
                             booking.status === 'upcoming' ? 'আসন্ন' :
                             booking.status === 'cancelled' ? 'বাতিল' : booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {booking.rating > 0 ? (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="ml-1 text-sm">{booking.rating}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleBookingAction(booking.id, 'view')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {booking.status === 'upcoming' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="default" 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleBookingAction(booking.id, 'complete')}
                                >
                                  {text[language].complete}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleBookingAction(booking.id, 'reschedule')}
                                >
                                  {text[language].reschedule}
                                </Button>
                              </>
                            )}
                            {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                              >
                                {text[language].cancel}
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
                  <div className="flex items-center justify-between">
                    <CardTitle>{text[language].earnings}</CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEarningsAction('statement')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {text[language].viewAll}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEarningsAction('tax')}
                      >
                        {text[language].tax}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">আয়ের চার্ট</h3>
                      <p className="text-gray-500 mb-4">মাসিক আয়ের তথ্য এখানে প্রদর্শিত হবে</p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">গড় দৈনিক আয়</p>
                          <p className="text-xl font-bold text-green-600">৳{Math.round(earningsData.monthlyEarnings / 30).toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">গড় বুকিং মূল্য</p>
                          <p className="text-xl font-bold text-blue-600">৳{earningsData.avgBookingValue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{text[language].earningsSummary}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">{text[language].totalEarningsThisMonth}</p>
                    <p className="text-2xl font-bold text-green-600">৳{earningsData.monthlyEarnings.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">+15% গত মাস থেকে</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">{text[language].weeklyEarnings}</p>
                    <p className="text-2xl font-bold text-blue-600">৳{earningsData.weeklyEarnings.toLocaleString()}</p>
                    <p className="text-xs text-blue-600 mt-1">+8% গত সপ্তাহ থেকে</p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">{text[language].pendingPayments}</p>
                    <p className="text-2xl font-bold text-yellow-600">৳{earningsData.pendingPayments.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">প্রক্রিয়াধীন</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">{text[language].totalEarnings}</p>
                    <p className="text-2xl font-bold text-purple-600">৳{earningsData.totalEarnings.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">শুরু থেকে</p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Button 
                      className="w-full"
                      onClick={() => handleEarningsAction('withdraw')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {text[language].withdraw}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleEarningsAction('statement')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {text[language].viewAll}
                    </Button>
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
                    <div key={review.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
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
                          <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">সহায়ক ছিল?</span>
                        <Button variant="ghost" size="sm">
                          জবাব দিন
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    আরও রিভিউ লোড করুন
                  </Button>
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
                      <Label htmlFor="name">নাম</Label>
                      <Input 
                        id="name" 
                        value={profileData.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">ইমেইল</Label>
                      <Input 
                        id="email" 
                        value={profileData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">ফোন</Label>
                      <Input 
                        id="phone" 
                        value={profileData.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">এলাকা</Label>
                      <Input 
                        id="location" 
                        value={profileData.location} 
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">অভিজ্ঞতা (বছর)</Label>
                      <Input 
                        id="experience" 
                        type="number"
                        value={profileData.experience} 
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="responseTime">প্রতিক্রিয়ার সময়</Label>
                      <Input 
                        id="responseTime" 
                        value={profileData.responseTime} 
                        onChange={(e) => handleInputChange('responseTime', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio">পরিচিতি</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button 
                      onClick={handleProfileSave}
                      disabled={isUpdatingProfile}
                    >
                      {isUpdatingProfile ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      পরিবর্তন সংরক্ষণ করুন
                    </Button>
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
                      <Label htmlFor="category">ক্যাটেগরি</Label>
                      <Select 
                        value={profileData.category} 
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrician">ইলেকট্রিশিয়ান</SelectItem>
                          <SelectItem value="plumber">প্লাম্বার</SelectItem>
                          <SelectItem value="ac-repair">এসি মেরামত</SelectItem>
                          <SelectItem value="cleaner">ক্লিনার</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priceRange">মূল্য পরিসীমা</Label>
                      <Input 
                        id="priceRange" 
                        value={profileData.priceRange} 
                        onChange={(e) => handleInputChange('priceRange', e.target.value)}
                        className="mt-1" 
                      />
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full" onClick={handleServiceUpdate}>
                        সেবা আপডেট করুন
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{text[language].accountSettings}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleQuickAction('settings')}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {text[language].notificationSettings}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleQuickAction('settings')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {text[language].paymentSettings}
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      লগ আউট
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
