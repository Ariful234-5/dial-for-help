import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserCheck, Clock, TrendingUp, AlertTriangle, Shield, CheckCircle, XCircle, Download, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [language] = useState('bn');
  const { toast } = useToast();

  const text = {
    bn: {
      dashboard: 'অ্যাডমিন ড্যাশবোর্ড',
      overview: 'সংক্ষিপ্ত বিবরণ',
      approvals: 'অনুমোদন',
      users: 'ব্যবহারকারী',
      providers: 'সেবা প্রদানকারী',
      analytics: 'বিশ্লেষণ',
      totalUsers: 'মোট ব্যবহারকারী',
      totalProviders: 'মোট প্রদানকারী',
      pendingApprovals: 'অনুমোদনের অপেক্ষায়',
      totalBookings: 'মোট বুকিং',
      approve: 'অনুমোদন',
      reject: 'প্রত্যাখ্যান',
      pending: 'অপেক্ষমান',
      approved: 'অনুমোদিত',
      rejected: 'প্রত্যাখ্যাত',
      recentActivity: 'সাম্প্রতিক কার্যকলাপ',
      systemHealth: 'সিস্টেম স্বাস্থ্য',
      manageUsers: 'ব্যবহারকারী পরিচালনা',
      viewAllProviders: 'সব প্রদানকারী দেখুন',
      generateReport: 'রিপোর্ট তৈরি করুন',
      userManagement: 'ব্যবহারকারী ব্যবস্থাপনা',
      providerManagement: 'প্রদানকারী ব্যবস্থাপনা',
      revenue: 'আয়',
      activeUsers: 'সক্রিয় ব্যবহারকারী',
      completedBookings: 'সম্পন্ন বুকিং'
    },
    en: {
      dashboard: 'Admin Dashboard',
      overview: 'Overview',
      approvals: 'Approvals',
      users: 'Users',
      providers: 'Providers',
      analytics: 'Analytics',
      totalUsers: 'Total Users',
      totalProviders: 'Total Providers',
      pendingApprovals: 'Pending Approvals',
      totalBookings: 'Total Bookings',
      approve: 'Approve',
      reject: 'Reject',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      recentActivity: 'Recent Activity',
      systemHealth: 'System Health',
      manageUsers: 'Manage Users',
      viewAllProviders: 'View All Providers',
      generateReport: 'Generate Report',
      userManagement: 'User Management',
      providerManagement: 'Provider Management',
      revenue: 'Revenue',
      activeUsers: 'Active Users',
      completedBookings: 'Completed Bookings'
    }
  };

  const [pendingProviders, setPendingProviders] = useState([
    {
      id: 1,
      name: 'আহমেদ আলী',
      nameEn: 'Ahmed Ali',
      category: 'electrician',
      location: 'ধানমন্ডি',
      locationEn: 'Dhanmondi',
      experience: 5,
      phone: '+880 1234 567890',
      status: 'pending',
      submittedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'ফাতেমা বেগম',
      nameEn: 'Fatema Begum',
      category: 'cleaner',
      location: 'গুলশান',
      locationEn: 'Gulshan',
      experience: 3,
      phone: '+880 1234 567891',
      status: 'pending',
      submittedAt: '2024-01-14'
    }
  ]);

  const [userList, setUserList] = useState([
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      email: 'rahim@example.com',
      phone: '+880 1234 567890',
      joinDate: '2024-01-10',
      status: 'active',
      totalBookings: 15
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      email: 'fatema@example.com',
      phone: '+880 1234 567891',
      joinDate: '2024-01-12',
      status: 'active',
      totalBookings: 8
    }
  ]);

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    setPendingProviders(prev => 
      prev.map(provider => 
        provider.id === id 
          ? { ...provider, status: action === 'approve' ? 'approved' : 'rejected' }
          : provider
      )
    );
    
    toast({
      title: action === 'approve' ? 'Provider Approved' : 'Provider Rejected',
      description: `Provider has been ${action === 'approve' ? 'approved' : 'rejected'} successfully.`,
    });
  };

  const handleUserAction = (userId: number, action: 'block' | 'activate') => {
    setUserList(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'block' ? 'blocked' : 'active' }
          : user
      )
    );
    
    toast({
      title: action === 'block' ? 'User Blocked' : 'User Activated',
      description: `User has been ${action === 'block' ? 'blocked' : 'activated'} successfully.`,
    });
  };

  const handleManageUsers = () => {
    toast({
      title: 'User Management',
      description: 'Opening user management interface...',
    });
  };

  const handleViewAllProviders = () => {
    toast({
      title: 'Provider Management',
      description: 'Opening provider management interface...',
    });
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      toast({
        title: 'Report Generated',
        description: 'Analytics report has been generated and downloaded.',
      });
    }, 3000);
  };

  const handleGenerateAnalytics = () => {
    toast({
      title: 'Analytics Dashboard',
      description: 'Loading comprehensive analytics data...',
    });
  };

  const recentActivities = [
    {
      id: 1,
      action: 'নতুন প্রদানকারী নিবন্ধন',
      user: 'আহমেদ আলী',
      time: '২ মিনিট আগে',
      type: 'registration'
    },
    {
      id: 2,
      action: 'বুকিং সম্পন্ন',
      user: 'রহিম উদ্দিন',
      time: '১৫ মিনিট আগে',
      type: 'booking'
    },
    {
      id: 3,
      action: 'নতুন ব্যবহারকারী',
      user: 'সালমা বেগম',
      time: '৩০ মিনিট আগে',
      type: 'user'
    }
  ];

  const stats = [
    {
      title: text[language].totalUsers,
      value: '1,234',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: text[language].totalProviders,
      value: '456',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: text[language].pendingApprovals,
      value: '23',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: text[language].totalBookings,
      value: '2,891',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{text[language].dashboard}</h1>
          <p className="text-gray-600 mt-2">Platform management and control center</p>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{text[language].overview}</TabsTrigger>
            <TabsTrigger value="approvals" className="relative">
              {text[language].approvals}
              <Badge className="ml-2 bg-red-500 text-white">{pendingProviders.filter(p => p.status === 'pending').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="users">{text[language].users}</TabsTrigger>
            <TabsTrigger value="analytics">{text[language].analytics}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    {text[language].recentActivity}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'registration' ? 'bg-blue-500' :
                          activity.type === 'booking' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{text[language].systemHealth}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response</span>
                    <Badge className="bg-green-100 text-green-800">Fast</Badge>
                  </div>
                  <div className="space-y-3 mt-4">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline" 
                      size="sm"
                      onClick={handleManageUsers}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      {text[language].manageUsers}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline" 
                      size="sm"
                      onClick={handleViewAllProviders}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {text[language].viewAllProviders}
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline" 
                      size="sm"
                      onClick={handleGenerateReport}
                      disabled={isGeneratingReport}
                    >
                      {isGeneratingReport ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <TrendingUp className="w-4 h-4 mr-2" />
                      )}
                      {text[language].generateReport}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Provider Approval Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProviders.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">
                          {language === 'bn' ? provider.name : provider.nameEn}
                        </TableCell>
                        <TableCell>{provider.category}</TableCell>
                        <TableCell>
                          {language === 'bn' ? provider.location : provider.locationEn}
                        </TableCell>
                        <TableCell>{provider.experience} years</TableCell>
                        <TableCell>
                          <Badge variant={
                            provider.status === 'pending' ? 'default' :
                            provider.status === 'approved' ? 'secondary' : 'destructive'
                          }>
                            {text[language][provider.status as keyof typeof text.bn]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {provider.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproval(provider.id, 'approve')}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                {text[language].approve}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleApproval(provider.id, 'reject')}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                {text[language].reject}
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>{text[language].userManagement}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userList.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.totalBookings}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'secondary' : 'default'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant={user.status === 'active' ? 'destructive' : 'default'}
                              onClick={() => handleUserAction(user.id, user.status === 'active' ? 'block' : 'activate')}
                            >
                              {user.status === 'active' ? 'Block' : 'Activate'}
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

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{text[language].analytics}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Analytics Dashboard</h3>
                      <p className="text-gray-500 mb-4">Platform performance data and charts will be displayed here</p>
                      <Button onClick={handleGenerateAnalytics}>Generate Analytics</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{text[language].revenue}</span>
                      <span className="text-sm font-bold">৳ 125,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{text[language].activeUsers}</span>
                      <span className="text-sm font-bold">1,234</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{text[language].completedBookings}</span>
                      <span className="text-sm font-bold">2,891</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
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
