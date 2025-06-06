
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  DollarSign, 
  Calendar, 
  Clock, 
  Star, 
  Users, 
  CheckCircle, 
  XCircle,
  Eye,
  Phone,
  MessageCircle,
  Bell,
  Settings,
  BarChart3,
  TrendingUp,
  MapPin,
  Edit,
  Save
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useProviderDashboard } from "@/hooks/useProviderDashboard";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/hooks/useAuth";

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [language] = useState('bn');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAvailable, setIsAvailable] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  
  // Provider profile state
  const [profile, setProfile] = useState({
    name: 'মোহাম্মদ হাসান',
    nameEn: 'Mohammad Hasan',
    category: 'electrician',
    phone: '+880 1712 345678',
    location: 'ধানমন্ডি, ঢাকা',
    locationEn: 'Dhanmondi, Dhaka',
    experience: 8,
    description: 'অভিজ্ঞ ইলেকট্রিশিয়ান। সব ধরনের ইলেকট্রিক্যাল কাজে দক্ষ।',
    descriptionEn: 'Experienced electrician skilled in all types of electrical work.',
    price: '৫০০-১৫০০ টাকা',
    priceEn: '500-1500 BDT',
    specialties: ['বাড়ির তার', 'ফ্যান ইনস্টলেশন', 'আলো মেরামত'],
    specialtiesEn: ['House Wiring', 'Fan Installation', 'Light Repair']
  });

  const { stats, recentBookings, loading, updateBookingStatus } = useProviderDashboard(user?.id);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const text = {
    bn: {
      dashboard: 'প্রদানকারী ড্যাশবোর্ড',
      overview: 'সংক্ষিপ্ত বিবরণ',
      bookings: 'বুকিংসমূহ',
      profile: 'প্রোফাইল',
      analytics: 'বিশ্লেষণ',
      notifications: 'নোটিফিকেশন',
      settings: 'সেটিংস',
      totalBookings: 'মোট বুকিং',
      completedJobs: 'সম্পন্ন কাজ',
      pendingBookings: 'অপেক্ষমাণ বুকিং',
      totalEarnings: 'মোট আয়',
      averageRating: 'গড় রেটিং',
      responseTime: 'প্রতিক্রিয়ার সময়',
      available: 'উপলব্ধ',
      unavailable: 'অনুপলব্ধ',
      accept: 'গ্রহণ',
      reject: 'প্রত্যাখ্যান',
      complete: 'সম্পন্ন',
      contact: 'যোগাযোগ',
      view: 'দেখুন',
      edit: 'সম্পাদনা',
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      customer: 'গ্রাহক',
      date: 'তারিখ',
      time: 'সময়',
      status: 'অবস্থা',
      amount: 'পরিমাণ',
      actions: 'কার্যক্রম',
      pending: 'অপেক্ষমাণ',
      confirmed: 'নিশ্চিত',
      completed: 'সম্পন্ন',
      cancelled: 'বাতিল',
      name: 'নাম',
      category: 'ক্যাটেগরি',
      phone: 'ফোন',
      location: 'এলাকা',
      experience: 'অভিজ্ঞতা',
      description: 'বিবরণ',
      price: 'মূল্য',
      specialties: 'বিশেষত্ব'
    }
  };

  const getTranslation = (key: string): string => {
    return text[language][key] || key;
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

  const handleBookingAction = async (bookingId: string, action: string) => {
    let newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled' = 'pending';
    
    switch (action) {
      case 'গ্রহণ':
        newStatus = 'confirmed';
        break;
      case 'সম্পন্ন':
        newStatus = 'completed';
        break;
      case 'প্রত্যাখ্যান':
        newStatus = 'cancelled';
        break;
    }

    const result = await updateBookingStatus(bookingId, newStatus);
    
    if (result.success) {
      toast({
        title: 'সফল',
        description: `বুকিং ${action} করা হয়েছে।`,
      });
    } else {
      toast({
        title: 'ত্রুটি',
        description: 'অপারেশন সম্পন্ন করতে পারা যায়নি।',
        variant: 'destructive',
      });
    }
  };

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
    toast({
      title: 'স্ট্যাটাস আপডেট',
      description: `আপনি এখন ${!isAvailable ? 'উপলব্ধ' : 'অনুপলব্ধ'} হিসেবে দেখানো হবে।`,
    });
  };

  const handleProfileSave = () => {
    setEditingProfile(false);
    toast({
      title: 'প্রোফাইল আপডেট',
      description: 'আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে।',
    });
  };

  const statsCards = [
    {
      title: getTranslation('totalBookings'),
      value: stats.totalBookings.toString(),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: getTranslation('completedJobs'),
      value: stats.completedJobs.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: getTranslation('pendingBookings'),
      value: stats.pendingBookings.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: getTranslation('totalEarnings'),
      value: `৳${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{getTranslation('dashboard')}</h1>
              <p className="text-gray-600 mt-2">আপনার সেবা পরিচালনা করুন</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {isAvailable ? getTranslation('available') : getTranslation('unavailable')}
                </span>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleAvailabilityToggle}
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                {getTranslation('notifications')} ({unreadCount})
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                {getTranslation('settings')}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{getTranslation('averageRating')}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-800">{stats.averageRating}</span>
                    <span className="text-gray-600 ml-1">/ ৫.০</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">গত মাসের তুলনায়</p>
                  <p className="text-sm text-green-600 font-medium">+০.২ বৃদ্ধি</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{getTranslation('responseTime')}</p>
                  <div className="flex items-center mt-2">
                    <Clock className="w-6 h-6 text-blue-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-800">{stats.responseTime}</span>
                    <span className="text-gray-600 ml-1">মিনিট</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">গড় প্রতিক্রিয়ার সময়</p>
                  <p className="text-sm text-green-600 font-medium">দ্রুত</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{getTranslation('overview')}</TabsTrigger>
            <TabsTrigger value="bookings">{getTranslation('bookings')}</TabsTrigger>
            <TabsTrigger value="profile">{getTranslation('profile')}</TabsTrigger>
            <TabsTrigger value="analytics">{getTranslation('analytics')}</TabsTrigger>
            <TabsTrigger value="notifications">{getTranslation('notifications')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>সাম্প্রতিক বুকিংসমূহ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{booking.customer_name}</h4>
                            <Badge className={getStatusColor(booking.status || 'pending')}>
                              {getTranslation(booking.status || 'pending')}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{booking.description}</p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {booking.selected_date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {booking.selected_time}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {booking.address}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleBookingAction(booking.id, 'গ্রহণ')}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {getTranslation('accept')}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'প্রত্যাখ্যান')}
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                {getTranslation('reject')}
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleBookingAction(booking.id, 'সম্পন্ন')}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {getTranslation('complete')}
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>আজকের পরিসংখ্যান</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">নতুন বুকিং</span>
                      <span className="text-xl font-bold text-blue-600">৩</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">সম্পন্ন কাজ</span>
                      <span className="text-xl font-bold text-green-600">৫</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">আজকের আয়</span>
                      <span className="text-xl font-bold text-purple-600">৳৪,৫০০</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>দ্রুত কার্যক্রম</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      সব বুকিং দেখুন
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      আয়ের রিপোর্ট
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      প্রোফাইল আপডেট
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>সব বুকিংসমূহ</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">লোড হচ্ছে...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{getTranslation('customer')}</TableHead>
                        <TableHead>{getTranslation('date')}</TableHead>
                        <TableHead>{getTranslation('time')}</TableHead>
                        <TableHead>বিবরণ</TableHead>
                        <TableHead>{getTranslation('amount')}</TableHead>
                        <TableHead>{getTranslation('status')}</TableHead>
                        <TableHead>{getTranslation('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{booking.customer_name}</p>
                              <p className="text-sm text-gray-600">{booking.customer_phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>{booking.selected_date}</TableCell>
                          <TableCell>{booking.selected_time}</TableCell>
                          <TableCell>
                            <p className="text-sm">{booking.description}</p>
                            <p className="text-xs text-gray-500">{booking.address}</p>
                          </TableCell>
                          <TableCell>৳{booking.total_price}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status || 'pending')}>
                              {getTranslation(booking.status || 'pending')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              {booking.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleBookingAction(booking.id, 'গ্রহণ')}
                                  >
                                    গ্রহণ
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleBookingAction(booking.id, 'প্রত্যাখ্যান')}
                                  >
                                    প্রত্যাখ্যান
                                  </Button>
                                </>
                              )}
                              {booking.status === 'confirmed' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleBookingAction(booking.id, 'সম্পন্ন')}
                                >
                                  সম্পন্ন
                                </Button>
                              )}
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>প্রোফাইল তথ্য</CardTitle>
                  <Button 
                    variant="outline" 
                    onClick={() => editingProfile ? handleProfileSave() : setEditingProfile(true)}
                  >
                    {editingProfile ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {getTranslation('save')}
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        {getTranslation('edit')}
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('name')} (বাংলা)</label>
                    {editingProfile ? (
                      <Input 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-800">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('name')} (English)</label>
                    {editingProfile ? (
                      <Input 
                        value={profile.nameEn} 
                        onChange={(e) => setProfile({...profile, nameEn: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-800">{profile.nameEn}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('phone')}</label>
                    {editingProfile ? (
                      <Input 
                        value={profile.phone} 
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-800">{profile.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('category')}</label>
                    {editingProfile ? (
                      <Select 
                        value={profile.category} 
                        onValueChange={(value) => setProfile({...profile, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrician">ইলেকট্রিশিয়ান</SelectItem>
                          <SelectItem value="plumber">প্লাম্বার</SelectItem>
                          <SelectItem value="cleaner">ক্লিনার</SelectItem>
                          <SelectItem value="ac-repair">এসি মেরামত</SelectItem>
                          <SelectItem value="painter">রঙমিস্ত্রি</SelectItem>
                          <SelectItem value="carpenter">কাঠমিস্ত্রি</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-800">ইলেকট্রিশিয়ান</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('experience')} (বছর)</label>
                    {editingProfile ? (
                      <Input 
                        type="number"
                        value={profile.experience} 
                        onChange={(e) => setProfile({...profile, experience: parseInt(e.target.value)})}
                      />
                    ) : (
                      <p className="text-gray-800">{profile.experience} বছর</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('price')}</label>
                    {editingProfile ? (
                      <Input 
                        value={profile.price} 
                        onChange={(e) => setProfile({...profile, price: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-800">{profile.price}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('location')} (বাংলা)</label>
                    {editingProfile ? (
                      <Input 
                        value={profile.location} 
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-800">{profile.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{getTranslation('location')} (English)</label>
                    {editingProfile ? (
                      <Input 
                        value={profile.locationEn} 
                        onChange={(e) => setProfile({...profile, locationEn: e.target.value})}
                      />
                    ) : (
                      <p className="text-gray-800">{profile.locationEn}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{getTranslation('description')} (বাংলা)</label>
                  {editingProfile ? (
                    <Textarea 
                      value={profile.description} 
                      onChange={(e) => setProfile({...profile, description: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-800">{profile.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{getTranslation('description')} (English)</label>
                  {editingProfile ? (
                    <Textarea 
                      value={profile.descriptionEn} 
                      onChange={(e) => setProfile({...profile, descriptionEn: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-800">{profile.descriptionEn}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{getTranslation('specialties')} (বাংলা)</label>
                  {editingProfile ? (
                    <Input 
                      value={profile.specialties.join(', ')} 
                      onChange={(e) => setProfile({...profile, specialties: e.target.value.split(', ')})}
                      placeholder="বিশেষত্বগুলো কমা দিয়ে আলাদা করুন"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{getTranslation('specialties')} (English)</label>
                  {editingProfile ? (
                    <Input 
                      value={profile.specialtiesEn.join(', ')} 
                      onChange={(e) => setProfile({...profile, specialtiesEn: e.target.value.split(', ')})}
                      placeholder="Separate specialties with commas"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.specialtiesEn.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  )}
                </div>

                {editingProfile && (
                  <div className="flex space-x-4">
                    <Button onClick={handleProfileSave}>
                      <Save className="w-4 h-4 mr-2" />
                      সংরক্ষণ করুন
                    </Button>
                    <Button variant="outline" onClick={() => setEditingProfile(false)}>
                      বাতিল
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>আয়ের গ্রাফ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">আয়ের চার্ট</h3>
                      <p className="text-gray-500">মাসিক আয়ের তথ্য এখানে প্রদর্শিত হবে</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>বুকিং প্রবণতা</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">এই সপ্তাহ</p>
                        <p className="text-xl font-bold text-blue-600">১২</p>
                        <p className="text-xs text-green-600">+২০% বৃদ্ধি</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">এই মাস</p>
                        <p className="text-xl font-bold text-green-600">৪৮</p>
                        <p className="text-xs text-green-600">+১৫% বৃদ্ধি</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">জনপ্রিয় সেবা</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">ফ্যান ইনস্টলেশন</span>
                          <div className="flex items-center">
                            <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                              <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-600">৮০%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">বাড়ির তার</span>
                          <div className="flex items-center">
                            <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                              <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-600">৬০%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">আলো মেরামত</span>
                          <div className="flex items-center">
                            <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                              <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-600">৪০%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{getTranslation('notifications')}</CardTitle>
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    সব পড়া হিসেবে চিহ্নিত করুন
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.createdAt}</p>
                        </div>
                        <Badge 
                          variant={
                            notification.type === 'success' ? 'secondary' :
                            notification.type === 'warning' ? 'outline' :
                            notification.type === 'error' ? 'destructive' : 'default'
                          }
                        >
                          {notification.type === 'success' ? 'সফল' :
                           notification.type === 'warning' ? 'সতর্কতা' :
                           notification.type === 'error' ? 'ত্রুটি' : 'তথ্য'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
