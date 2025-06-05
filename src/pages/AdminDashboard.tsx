import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserCheck, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Shield,
  Settings,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [language] = useState('bn');
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const [reportFilter, setReportFilter] = useState('all');
  const { toast } = useToast();

  const text = {
    bn: {
      dashboard: 'অ্যাডমিন ড্যাশবোর্ড',
      overview: 'সংক্ষিপ্ত বিবরণ',
      users: 'ব্যবহারকারী',
      providers: 'প্রদানকারী',
      reports: 'রিপোর্ট',
      analytics: 'বিশ্লেষণ',
      settings: 'সেটিংস',
      totalUsers: 'মোট ব্যবহারকারী',
      activeProviders: 'সক্রিয় প্রদানকারী',
      pendingApprovals: 'অনুমোদনের অপেক্ষায়',
      totalRevenue: 'মোট আয়',
      userManagement: 'ব্যবহারকারী পরিচালনা',
      providerManagement: 'প্রদানকারী পরিচালনা',
      systemReports: 'সিস্টেম রিপোর্ট',
      performanceAnalytics: 'কর্মক্ষমতা বিশ্লেষণ',
      viewAll: 'সবগুলো দেখুন',
      approve: 'অনুমোদন',
      reject: 'প্রত্যাখ্যান',
      view: 'দেখুন',
      edit: 'সম্পাদনা',
      delete: 'মুছুন',
      suspend: 'স্থগিত',
      activate: 'সক্রিয়',
      name: 'নাম',
      email: 'ইমেইল',
      phone: 'ফোন',
      status: 'অবস্থা',
      location: 'এলাকা',
      category: 'ক্যাটেগরি',
      rating: 'রেটিং',
      completedJobs: 'সম্পন্ন কাজ',
      joinDate: 'যোগদানের তারিখ',
      actions: 'কার্যক্রম',
      generateReport: 'রিপোর্ট তৈরি',
      downloadReport: 'রিপোর্ট ডাউনলোড',
      refreshData: 'তথ্য রিফ্রেশ',
      exportData: 'তথ্য রপ্তানি',
      systemSettings: 'সিস্টেম সেটিংস',
      userSettings: 'ব্যবহারকারী সেটিংস',
      notificationSettings: 'নোটিফিকেশন সেটিংস',
      securitySettings: 'নিরাপত্তা সেটিংস',
      backupData: 'ব্যাকআপ তথ্য',
      restoreData: 'পুনরুদ্ধার তথ্য',
      active: 'সক্রিয়',
      inactive: 'নিষ্ক্রিয়',
      pending: 'অপেক্ষমাণ',
      suspended: 'স্থগিত',
      approved: 'অনুমোদিত',
      rejected: 'প্রত্যাখ্যাত',
      electrician: 'ইলেকট্রিশিয়ান',
      plumber: 'প্লাম্বার',
      cleaner: 'ক্লিনার',
      acRepair: 'এসি মেরামত',
      painter: 'রঙমিস্ত্রি',
      carpenter: 'কাঠমিস্ত্রি'
    },
    en: {
      dashboard: 'Admin Dashboard',
      overview: 'Overview',
      users: 'Users',
      providers: 'Providers',
      reports: 'Reports',
      analytics: 'Analytics',
      settings: 'Settings',
      totalUsers: 'Total Users',
      activeProviders: 'Active Providers',
      pendingApprovals: 'Pending Approvals',
      totalRevenue: 'Total Revenue',
      userManagement: 'User Management',
      providerManagement: 'Provider Management',
      systemReports: 'System Reports',
      performanceAnalytics: 'Performance Analytics',
      viewAll: 'View All',
      approve: 'Approve',
      reject: 'Reject',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      suspend: 'Suspend',
      activate: 'Activate',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      status: 'Status',
      location: 'Location',
      category: 'Category',
      rating: 'Rating',
      completedJobs: 'Completed Jobs',
      joinDate: 'Join Date',
      actions: 'Actions',
      generateReport: 'Generate Report',
      downloadReport: 'Download Report',
      refreshData: 'Refresh Data',
      exportData: 'Export Data',
      systemSettings: 'System Settings',
      userSettings: 'User Settings',
      notificationSettings: 'Notification Settings',
      securitySettings: 'Security Settings',
      backupData: 'Backup Data',
      restoreData: 'Restore Data',
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      suspended: 'Suspended',
      approved: 'Approved',
      rejected: 'Rejected',
      electrician: 'Electrician',
      plumber: 'Plumber',
      cleaner: 'Cleaner',
      acRepair: 'AC Repair',
      painter: 'Painter',
      carpenter: 'Carpenter'
    }
  };

  const [dashboardStats] = useState({
    totalUsers: 1247,
    activeProviders: 89,
    pendingApprovals: 12,
    totalRevenue: 125000,
    monthlyGrowth: 15.2,
    avgRating: 4.6,
    totalBookings: 3456,
    completionRate: 94.5
  });

  const [recentUsers] = useState([
    {
      id: 1,
      name: 'আহমেদ আলী',
      email: 'ahmed@example.com',
      phone: '+880 1234 567890',
      status: 'active',
      joinDate: '২০২৪-০১-১৫',
      totalBookings: 23,
      location: 'ধানমন্ডি'
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      email: 'fatema@example.com',
      phone: '+880 1234 567891',
      status: 'active',
      joinDate: '২০২৪-০১-১২',
      totalBookings: 18,
      location: 'গুলশান'
    },
    {
      id: 3,
      name: 'করিম মিয়া',
      email: 'karim@example.com',
      phone: '+880 1234 567892',
      status: 'inactive',
      joinDate: '২০২৪-০১-১০',
      totalBookings: 5,
      location: 'উত্তরা'
    }
  ]);

  const [pendingProviders] = useState([
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      email: 'rahim@example.com',
      phone: '+880 1234 567893',
      category: 'electrician',
      location: 'ধানমন্ডি',
      experience: '৮ বছর',
      status: 'pending',
      appliedDate: '২০২৪-০১-১৪',
      documents: ['জাতীয় পরিচয়পত্র', 'অভিজ্ঞতার সার্টিফিকেট']
    },
    {
      id: 2,
      name: 'সালমা বেগম',
      email: 'salma@example.com',
      phone: '+880 1234 567894',
      category: 'cleaner',
      location: 'গুলশান',
      experience: '৫ বছর',
      status: 'pending',
      appliedDate: '২০২৪-০১-১৩',
      documents: ['জাতীয় পরিচয়পত্র', 'রেফারেন্স']
    }
  ]);

  const [allProviders] = useState([
    {
      id: 1,
      name: 'মোহাম্মদ হাসান',
      email: 'hasan@example.com',
      phone: '+880 1234 567895',
      category: 'electrician',
      location: 'ধানমন্ডি',
      rating: 4.8,
      completedJobs: 156,
      status: 'active',
      joinDate: '২০২৩-০৮-১৫'
    },
    {
      id: 2,
      name: 'নাসির আহমেদ',
      email: 'nasir@example.com',
      phone: '+880 1234 567896',
      category: 'plumber',
      location: 'উত্তরা',
      rating: 4.6,
      completedJobs: 134,
      status: 'active',
      joinDate: '২০২৩-০৯-২০'
    },
    {
      id: 3,
      name: 'রাশিদা খাতুন',
      email: 'rashida@example.com',
      phone: '+880 1234 567897',
      category: 'cleaner',
      location: 'গুলশান',
      rating: 4.9,
      completedJobs: 98,
      status: 'suspended',
      joinDate: '২০২৩-১০-০৫'
    }
  ]);

  const handleUserAction = (userId: number, action: string) => {
    toast({
      title: 'ব্যবহারকারী কার্যক্রম',
      description: `ব্যবহারকারী #${userId} এর জন্য ${action} সম্পাদিত হয়েছে।`,
    });
  };

  const handleProviderAction = (providerId: number, action: string) => {
    toast({
      title: 'প্রদানকারী কার্যক্রম',
      description: `প্রদানকারী #${providerId} এর জন্য ${action} সম্পাদিত হয়েছে।`,
    });
  };

  const handleReportGeneration = (reportType: string) => {
    toast({
      title: 'রিপোর্ট তৈরি',
      description: `${reportType} রিপোর্ট তৈরি করা হচ্ছে...`,
    });
  };

  const handleSystemAction = (action: string) => {
    toast({
      title: 'সিস্টেম কার্যক্রম',
      description: `${action} সম্পাদিত হচ্ছে...`,
    });
  };

  const stats = [
    {
      title: text[language].totalUsers,
      value: dashboardStats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: `+${dashboardStats.monthlyGrowth}% এই মাসে`
    },
    {
      title: text[language].activeProviders,
      value: dashboardStats.activeProviders.toString(),
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12 নতুন এই মাসে'
    },
    {
      title: text[language].pendingApprovals,
      value: dashboardStats.pendingApprovals.toString(),
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: 'পর্যালোচনার প্রয়োজন'
    },
    {
      title: text[language].totalRevenue,
      value: `৳${dashboardStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+18% গত মাস থেকে'
    }
  ];

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredProviders = allProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = providerFilter === 'all' || provider.status === providerFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{text[language].dashboard}</h1>
              <p className="text-gray-600 mt-2">সিস্টেম পরিচালনা এবং নিয়ন্ত্রণ কেন্দ্র</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => handleSystemAction('তথ্য রিফ্রেশ')}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {text[language].refreshData}
              </Button>
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
            <TabsTrigger value="users">{text[language].users}</TabsTrigger>
            <TabsTrigger value="providers">{text[language].providers}</TabsTrigger>
            <TabsTrigger value="reports">{text[language].reports}</TabsTrigger>
            <TabsTrigger value="analytics">{text[language].analytics}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      {text[language].viewAll}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.joinDate} এ যোগদান</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                            {user.status === 'active' ? text[language].active : text[language].inactive}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{user.totalBookings} বুকিং</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>অনুমোদনের অপেক্ষায়</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingProviders.map((provider) => (
                      <div key={provider.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{provider.name}</p>
                          <Badge variant="outline">{text[language][provider.category as keyof typeof text[typeof language]]}</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{provider.location} • {provider.experience}</p>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleProviderAction(provider.id, 'অনুমোদন')}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {text[language].approve}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleProviderAction(provider.id, 'প্রত্যাখ্যান')}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            {text[language].reject}
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" size="sm">
                      সব অনুরোধ দেখুন
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>দ্রুত কার্যক্রম</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => handleReportGeneration('ব্যবহারকারী রিপোর্ট')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {text[language].generateReport}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => handleSystemAction('তথ্য রপ্তানি')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {text[language].exportData}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => handleSystemAction('ব্যাকআপ তৈরি')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {text[language].backupData}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      size="sm"
                      onClick={() => handleSystemAction('সিস্টেম সেটিংস')}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {text[language].systemSettings}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{text[language].userManagement}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleSystemAction('ব্যবহারকারী রপ্তানি')}>
                      <Download className="w-4 h-4 mr-2" />
                      {text[language].exportData}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="ব্যবহারকারী অনুসন্ধান করুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব ব্যবহারকারী</SelectItem>
                      <SelectItem value="active">{text[language].active}</SelectItem>
                      <SelectItem value="inactive">{text[language].inactive}</SelectItem>
                      <SelectItem value="suspended">{text[language].suspended}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{text[language].name}</TableHead>
                      <TableHead>{text[language].email}</TableHead>
                      <TableHead>{text[language].phone}</TableHead>
                      <TableHead>{text[language].location}</TableHead>
                      <TableHead>{text[language].status}</TableHead>
                      <TableHead>বুকিং</TableHead>
                      <TableHead>{text[language].joinDate}</TableHead>
                      <TableHead>{text[language].actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                            {user.status === 'active' ? text[language].active : text[language].inactive}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.totalBookings}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleUserAction(user.id, 'দেখুন')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUserAction(user.id, user.status === 'active' ? 'স্থগিত' : 'সক্রিয়')}
                            >
                              {user.status === 'active' ? text[language].suspend : text[language].activate}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{text[language].providerManagement}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleSystemAction('প্রদানকারী রপ্তানি')}>
                      <Download className="w-4 h-4 mr-2" />
                      {text[language].exportData}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="প্রদানকারী অনুসন্ধান করুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={providerFilter} onValueChange={setProviderFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব প্রদানকারী</SelectItem>
                      <SelectItem value="active">{text[language].active}</SelectItem>
                      <SelectItem value="inactive">{text[language].inactive}</SelectItem>
                      <SelectItem value="suspended">{text[language].suspended}</SelectItem>
                      <SelectItem value="pending">{text[language].pending}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{text[language].name}</TableHead>
                      <TableHead>{text[language].email}</TableHead>
                      <TableHead>{text[language].category}</TableHead>
                      <TableHead>{text[language].location}</TableHead>
                      <TableHead>{text[language].rating}</TableHead>
                      <TableHead>{text[language].completedJobs}</TableHead>
                      <TableHead>{text[language].status}</TableHead>
                      <TableHead>{text[language].actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProviders.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">{provider.name}</TableCell>
                        <TableCell>{provider.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {text[language][provider.category as keyof typeof text[typeof language]]}
                          </Badge>
                        </TableCell>
                        <TableCell>{provider.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{provider.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{provider.completedJobs}</TableCell>
                        <TableCell>
                          <Badge variant={
                            provider.status === 'active' ? 'secondary' : 
                            provider.status === 'suspended' ? 'destructive' : 'outline'
                          }>
                            {text[language][provider.status as keyof typeof text[typeof language]]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleProviderAction(provider.id, 'দেখুন')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleProviderAction(provider.id, 
                                provider.status === 'active' ? 'স্থগিত' : 
                                provider.status === 'suspended' ? 'সক্রিয়' : 'অনুমোদন'
                              )}
                            >
                              {provider.status === 'active' ? text[language].suspend : 
                               provider.status === 'suspended' ? text[language].activate : text[language].approve}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{text[language].systemReports}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleReportGeneration('ব্যবহারকারী রিপোর্ট')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    ব্যবহারকারী রিপোর্ট তৈরি করুন
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleReportGeneration('প্রদানকারী রিপোর্ট')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    প্রদানকারী রিপোর্ট তৈরি করুন
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleReportGeneration('আর্থিক রিপোর্ট')}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    আর্থিক রিপোর্ট তৈরি করুন
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleReportGeneration('বুকিং রিপোর্ট')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    বুকিং রিপোর্ট তৈরি করুন
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleReportGeneration('কর্মক্ষমতা রিপোর্ট')}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    কর্মক্ষমতা রিপোর্ট তৈরি করুন
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>রিপোর্ট ইতিহাস</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'মাসিক ব্যবহারকারী রিপোর্ট', date: '২০২৪-০১-১৫', size: '২.৩ MB' },
                      { name: 'প্রদানকারী কর্মক্ষমতা রিপোর্ট', date: '২০২৪-০১-১০', size: '১.৮ MB' },
                      { name: 'আর্থিক সারসংক্ষেপ', date: '২০২৪-০১-০৫', size: '৯৫৬ KB' }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{report.name}</p>
                          <p className="text-xs text-gray-600">{report.date} • {report.size}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleSystemAction(`${report.name} ডাউনলোড`)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{text[language].performanceAnalytics}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">কর্মক্ষমতা চার্ট</h3>
                      <p className="text-gray-500">সিস্টেম অ্যানালিটিক্স এখানে প্রদর্শিত হবে</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>মূল পরিসংখ্যান</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">গড় প্রতিক্রিয়ার সময়</p>
                      <p className="text-xl font-bold text-blue-600">১২ মিনিট</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">সম্পূর্ণতার হার</p>
                      <p className="text-xl font-bold text-green-600">{dashboardStats.completionRate}%</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600">গড় রেটিং</p>
                      <p className="text-xl font-bold text-yellow-600">{dashboardStats.avgRating}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">মোট বুকিং</p>
                      <p className="text-xl font-bold text-purple-600">{dashboardStats.totalBookings.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSystemAction('বিস্তারিত অ্যানালিটিক্স')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      বিস্তারিত অ্যানালিটিক্স দেখুন
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSystemAction('কাস্টম রিপোর্ট')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      কাস্টম রিপোর্ট তৈরি করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
