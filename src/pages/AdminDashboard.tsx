import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserCheck, Clock, TrendingUp, AlertTriangle, Shield, CheckCircle, XCircle, Download, RefreshCw, FileText, Eye, Edit, Trash2, Search, Filter, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminDashboard = () => {
  const [language] = useState('bn');
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

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
      completedBookings: 'সম্পন্ন বুকিং',
      allStatus: 'সব স্ট্যাটাস',
      pendingStatus: 'অপেক্ষমান',
      approvedStatus: 'অনুমোদিত',
      rejectedStatus: 'প্রত্যাখ্যাত',
      activeStatus: 'সক্রিয়',
      blockedStatus: 'ব্লকড',
      newUser: 'নতুন ব্যবহারকারী',
      allActivities: 'সব কার্যকলাপ দেখুন',
      quickActions: 'দ্রুত কার্যক্রম',
      backup: 'ব্যাকআপ',
      maintenance: 'রক্ষণাবেক্ষণ',
      suspend: 'স্থগিত',
      exportData: 'ডেটা এক্সপোর্ট',
      approveAll: 'সব অনুমোদন',
      rejectAll: 'সব প্রত্যাখ্যান',
      userDeleted: 'ব্যবহারকারী মুছে ফেলা হয়েছে',
      userBlocked: 'ব্যবহারকারী ব্লক করা হয়েছে',
      userActivated: 'ব্যবহারকারী সক্রিয় করা হয়েছে',
      userEdit: 'ব্যবহারকারী সম্পাদনা',
      providerManagementTitle: 'প্রদানকারী পরিচালনা',
      providerView: 'বিস্তারিত দেখুন',
      providerEdit: 'সম্পাদনা',
      providerSuspend: 'স্থগিত',
      reportUsers: 'ব্যবহারকারী রিপোর্ট',
      reportProviders: 'প্রদানকারী রিপোর্ট',
      reportRevenue: 'আয় রিপোর্ট',
      reportAnalytics: 'বিশ্লেষণ রিপোর্ট',
      reportGenerated: 'রিপোর্ট তৈরি হয়েছে',
      dataExporting: 'সকল ডেটা CSV ফরম্যাটে এক্সপোর্ট হচ্ছে...',
      systemManagement: 'সিস্টেম পরিচালনা',
      systemBackup: 'সিস্টেম ব্যাকআপ শুরু হয়েছে...',
      systemMaintenance: 'রক্ষণাবেক্ষণ মোড সক্রিয় করা হয়েছে...',
      systemUpdate: 'সিস্টেম আপডেট প্রক্রিয়া শুরু হয়েছে...',
      systemUpdateBtn: 'সিস্টেম আপডেট',
      maintenanceModeBtn: 'রক্ষণাবেক্ষণ মোড',
      metricsTitle: 'মূল মেট্রিক্স',
      totalRevenue: 'মোট আয়',
      activeProviders: 'সক্রিয় প্রদানকারী',
      customerSatisfaction: 'গ্রাহক সন্তুষ্টি',
      avgRating: 'গড় রেটিং',
      lastWeekGrowth: '+5.2% গত সপ্তাহ থেকে',
      monthlyGrowth: 'এই মাসে',
      export: 'এক্সপোর্ট',
      reportCreate: 'রিপোর্ট তৈরি',
      systemHealthTitle: 'সিস্টেম স্বাস্থ্য',
      serverStatus: 'সার্ভার স্ট্যাটাস',
      databaseStatus: 'ডাটাবেস',
      apiResponse: 'API রেসপন্স',
      online: 'অনলাইন',
      connected: 'সংযুক্ত',
      fast: 'দ্রুত',
      manageUsersBtn: 'ব্যবহারকারী পরিচালনা',
      viewAllProvidersBtn: 'সব প্রদানকারী দেখুন',
      generateReportBtn: 'রিপোর্ট তৈরি করুন',
      pendingApprovalsCount: 'অনুমোদনের অপেক্ষায়',
      totalUsersCount: 'মোট ব্যবহারকারী',
      totalProvidersCount: 'মোট প্রদানকারী',
      totalBookingsCount: 'মোট বুকিং',
      recentActivityTitle: 'সাম্প্রতিক কার্যকলাপ',
      systemHealthTitleShort: 'সিস্টেম স্বাস্থ্য',
      manageUsersTitle: 'ব্যবহারকারী পরিচালনা',
      viewAllProvidersTitle: 'সব প্রদানকারী দেখুন',
      generateReportTitle: 'রিপোর্ট তৈরি করুন',
      approve: 'অনুমোদন',
      reject: 'প্রত্যাখ্যান',
      pending: 'অপেক্ষমান',
      approved: 'অনুমোদিত',
      rejected: 'প্রত্যাখ্যাত',
      block: 'ব্লক',
      activate: 'সক্রিয়',
      edit: 'সম্পাদনা',
      delete: 'মুছে ফেলা',
      suspend: 'স্থগিত',
      view: 'দেখুন',
      actions: 'কার্যক্রম',
      name: 'নাম',
      category: 'ক্যাটেগরি',
      location: 'এলাকা',
      experience: 'অভিজ্ঞতা',
      phone: 'ফোন',
      status: 'স্ট্যাটাস',
      submittedAt: 'জমা দেওয়ার তারিখ',
      email: 'ইমেইল',
      joinDate: 'যোগদানের তারিখ',
      bookings: 'বুকিং',
      totalSpent: 'মোট খরচ',
      rating: 'রেটিং',
      completedJobs: 'সম্পন্ন কাজ',
      lastActive: 'সর্বশেষ সক্রিয়',
      searchPlaceholderProviders: 'নাম বা ক্যাটেগরি অনুসন্ধান করুন...',
      searchPlaceholderUsers: 'নাম বা ইমেইল অনুসন্ধান করুন...',
      filterStatusPlaceholder: 'স্ট্যাটাস ফিল্টার',
      all: 'সব',
      pendingStatusLabel: 'অপেক্ষমান',
      approvedStatusLabel: 'অনুমোদিত',
      rejectedStatusLabel: 'প্রত্যাখ্যাত',
      activeStatusLabel: 'সক্রিয়',
      blockedStatusLabel: 'ব্লকড',
      noData: 'কোন তথ্য পাওয়া যায়নি',
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
      completedBookings: 'Completed Bookings',
      allStatus: 'All Status',
      pendingStatus: 'Pending',
      approvedStatus: 'Approved',
      rejectedStatus: 'Rejected',
      activeStatus: 'Active',
      blockedStatus: 'Blocked',
      newUser: 'New User',
      allActivities: 'View All Activities',
      quickActions: 'Quick Actions',
      backup: 'Backup',
      maintenance: 'Maintenance',
      suspend: 'Suspend',
      exportData: 'Export Data',
      approveAll: 'Approve All',
      rejectAll: 'Reject All',
      userDeleted: 'User Deleted',
      userBlocked: 'User Blocked',
      userActivated: 'User Activated',
      userEdit: 'Edit User',
      providerManagementTitle: 'Provider Management',
      providerView: 'View Details',
      providerEdit: 'Edit',
      providerSuspend: 'Suspend',
      reportUsers: 'User Report',
      reportProviders: 'Provider Report',
      reportRevenue: 'Revenue Report',
      reportAnalytics: 'Analytics Report',
      reportGenerated: 'Report Generated',
      dataExporting: 'Exporting all data in CSV format...',
      systemManagement: 'System Management',
      systemBackup: 'System backup started...',
      systemMaintenance: 'Maintenance mode activated...',
      systemUpdate: 'System update process started...',
      systemUpdateBtn: 'System Update',
      maintenanceModeBtn: 'Maintenance Mode',
      metricsTitle: 'Key Metrics',
      totalRevenue: 'Total Revenue',
      activeProviders: 'Active Providers',
      customerSatisfaction: 'Customer Satisfaction',
      avgRating: 'Average Rating',
      lastWeekGrowth: '+5.2% from last week',
      monthlyGrowth: 'This month',
      export: 'Export',
      reportCreate: 'Create Report',
      systemHealthTitle: 'System Health',
      serverStatus: 'Server Status',
      databaseStatus: 'Database',
      apiResponse: 'API Response',
      online: 'Online',
      connected: 'Connected',
      fast: 'Fast',
      manageUsersBtn: 'Manage Users',
      viewAllProvidersBtn: 'View All Providers',
      generateReportBtn: 'Generate Report',
      pendingApprovalsCount: 'Pending Approvals',
      totalUsersCount: 'Total Users',
      totalProvidersCount: 'Total Providers',
      totalBookingsCount: 'Total Bookings',
      recentActivityTitle: 'Recent Activity',
      systemHealthTitleShort: 'System Health',
      manageUsersTitle: 'Manage Users',
      viewAllProvidersTitle: 'View All Providers',
      generateReportTitle: 'Generate Report',
      approve: 'Approve',
      reject: 'Reject',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      block: 'Block',
      activate: 'Activate',
      edit: 'Edit',
      delete: 'Delete',
      suspend: 'Suspend',
      view: 'View',
      actions: 'Actions',
      name: 'Name',
      category: 'Category',
      location: 'Location',
      experience: 'Experience',
      phone: 'Phone',
      status: 'Status',
      submittedAt: 'Submitted At',
      email: 'Email',
      joinDate: 'Join Date',
      bookings: 'Bookings',
      totalSpent: 'Total Spent',
      rating: 'Rating',
      completedJobs: 'Completed Jobs',
      lastActive: 'Last Active',
      searchPlaceholderProviders: 'Search by name or category...',
      searchPlaceholderUsers: 'Search by name or email...',
      filterStatusPlaceholder: 'Filter Status',
      all: 'All',
      pendingStatusLabel: 'Pending',
      approvedStatusLabel: 'Approved',
      rejectedStatusLabel: 'Rejected',
      activeStatusLabel: 'Active',
      blockedStatusLabel: 'Blocked',
      noData: 'No data found',
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
      submittedAt: '2024-01-15',
      rating: 0,
      completedJobs: 0
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
      submittedAt: '2024-01-14',
      rating: 0,
      completedJobs: 0
    },
    {
      id: 3,
      name: 'করিম উদ্দিন',
      nameEn: 'Karim Uddin',
      category: 'plumber',
      location: 'উত্তরা',
      locationEn: 'Uttara',
      experience: 7,
      phone: '+880 1234 567892',
      status: 'approved',
      submittedAt: '2024-01-10',
      rating: 4.8,
      completedJobs: 45
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
      totalBookings: 15,
      totalSpent: '৳25,000',
      lastActive: '2024-01-15'
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      email: 'fatema@example.com',
      phone: '+880 1234 567891',
      joinDate: '2024-01-12',
      status: 'active',
      totalBookings: 8,
      totalSpent: '৳12,000',
      lastActive: '2024-01-14'
    },
    {
      id: 3,
      name: 'সালমা বেগম',
      email: 'salma@example.com',
      phone: '+880 1234 567893',
      joinDate: '2024-01-08',
      status: 'blocked',
      totalBookings: 3,
      totalSpent: '৳4,500',
      lastActive: '2024-01-13'
    }
  ]);

  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: '৳1,25,000',
    monthlyGrowth: '+12.5%',
    activeProviders: 145,
    completedBookings: 2891,
    avgRating: 4.7,
    customerSatisfaction: '94%'
  });

  // Enhanced handler functions
  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    setPendingProviders(prev => 
      prev.map(provider => 
        provider.id === id 
          ? { ...provider, status: action === 'approve' ? 'approved' : 'rejected' }
          : provider
      )
    );
    
    toast({
      title: action === 'approve' ? 'প্রদানকারী অনুমোদিত' : 'প্রদানকারী প্রত্যাখ্যাত',
      description: `প্রদানকারী সফলভাবে ${action === 'approve' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} হয়েছে।`,
    });
  };

  const handleUserAction = (userId: number, action: 'block' | 'activate' | 'edit' | 'delete') => {
    if (action === 'delete') {
      setUserList(prev => prev.filter(user => user.id !== userId));
      toast({
        title: 'ব্যবহারকারী মুছে ফেলা হয়েছে',
        description: 'ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে।',
      });
    } else if (action === 'edit') {
      toast({
        title: 'ব্যবহারকারী সম্পাদনা',
        description: 'ব্যবহারকারীর তথ্য সম্পাদনা পৃষ্ঠা খোলা হচ্ছে...',
      });
    } else {
      setUserList(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, status: action === 'block' ? 'blocked' : 'active' }
            : user
        )
      );
      
      toast({
        title: action === 'block' ? 'ব্যবহারকারী ব্লক করা হয়েছে' : 'ব্যবহারকারী সক্রিয় করা হয়েছে',
        description: `ব্যবহারকারী সফলভাবে ${action === 'block' ? 'ব্লক' : 'সক্রিয়'} করা হয়েছে।`,
      });
    }
  };

  const handleProviderAction = (providerId: number, action: 'view' | 'edit' | 'suspend') => {
    const actionMessages = {
      view: 'প্রদানকারীর বিস্তারিত তথ্য দেখানো হচ্ছে...',
      edit: 'প্রদানকারীর তথ্য সম্পাদনা পৃষ্ঠা খোলা হচ্ছে...',
      suspend: 'প্রদানকারী সাময়িকভাবে স্থগিত করা হয়েছে।'
    };

    toast({
      title: 'প্রদানকারী পরিচালনা',
      description: actionMessages[action],
    });

    if (action === 'suspend') {
      setPendingProviders(prev => 
        prev.map(provider => 
          provider.id === providerId 
            ? { ...provider, status: 'suspended' }
            : provider
        )
      );
    }
  };

  const handleGenerateReport = async (reportType: 'users' | 'providers' | 'revenue' | 'analytics') => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      
      const reportTitles = {
        users: 'ব্যবহারকারী রিপোর্ট',
        providers: 'প্রদানকারী রিপোর্ট',
        revenue: 'আয় রিপোর্ট',
        analytics: 'বিশ্লেষণ রিপোর্ট'
      };

      toast({
        title: `${reportTitles[reportType]} তৈরি হয়েছে`,
        description: 'রিপোর্ট সফলভাবে তৈরি এবং ডাউনলোড হয়েছে।',
      });
    }, 2000);
  };

  const handleBulkAction = (action: 'approve' | 'reject' | 'export') => {
    const pendingCount = pendingProviders.filter(p => p.status === 'pending').length;
    
    if (action === 'export') {
      toast({
        title: 'ডেটা এক্সপোর্ট',
        description: 'সকল ডেটা CSV ফরম্যাটে এক্সপোর্ট হচ্ছে...',
      });
    } else {
      setPendingProviders(prev => 
        prev.map(provider => 
          provider.status === 'pending' 
            ? { ...provider, status: action === 'approve' ? 'approved' : 'rejected' }
            : provider
        )
      );

      toast({
        title: `সকল অনুরোধ ${action === 'approve' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}`,
        description: `${pendingCount}টি অনুরোধ সফলভাবে ${action === 'approve' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} হয়েছে।`,
      });
    }
  };

  const handleSystemAction = (action: 'backup' | 'maintenance' | 'update') => {
    const actionMessages = {
      backup: 'সিস্টেম ব্যাকআপ শুরু হয়েছে...',
      maintenance: 'রক্ষণাবেক্ষণ মোড সক্রিয় করা হয়েছে...',
      update: 'সিস্টেম আপডেট প্রক্রিয়া শুরু হয়েছে...'
    };

    toast({
      title: 'সিস্টেম পরিচালনা',
      description: actionMessages[action],
    });
  };

  // Filter functions
  const filteredUsers = userList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredProviders = pendingProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || provider.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{text[language].dashboard}</h1>
              <p className="text-gray-600 mt-2">Platform management and control center</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => handleSystemAction('backup')}
              >
                <Download className="w-4 h-4 mr-2" />
                {text[language].backup}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSystemAction('maintenance')}
              >
                <Shield className="w-4 h-4 mr-2" />
                {text[language].maintenance}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid with more interactive elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{text[language].lastWeekGrowth}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs with enhanced functionality */}
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
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'registration' ? 'bg-blue-500' :
                          activity.type === 'booking' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      {text[language].allActivities}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{text[language].quickActions}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline" 
                    onClick={() => handleGenerateReport('users')}
                    disabled={isGeneratingReport}
                  >
                    {isGeneratingReport ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Users className="w-4 h-4 mr-2" />
                    )}
                    {text[language].reportUsers}
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleGenerateReport('providers')}
                    disabled={isGeneratingReport}
                  >
                    {isGeneratingReport ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Shield className="w-4 h-4 mr-2" />
                    )}
                    {text[language].reportProviders}
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleGenerateReport('revenue')}
                    disabled={isGeneratingReport}
                  >
                    {isGeneratingReport ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-2" />
                    )}
                    {text[language].reportRevenue}
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => handleBulkAction('export')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {text[language].exportData}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{text[language].providerManagementTitle}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('approve')}
                      disabled={pendingProviders.filter(p => p.status === 'pending').length === 0}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {text[language].approveAll}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('reject')}
                      disabled={pendingProviders.filter(p => p.status === 'pending').length === 0}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      {text[language].rejectAll}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder={text[language].searchPlaceholderProviders}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={text[language].filterStatusPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{text[language].allStatus}</SelectItem>
                      <SelectItem value="pending">{text[language].pendingStatus}</SelectItem>
                      <SelectItem value="approved">{text[language].approvedStatus}</SelectItem>
                      <SelectItem value="rejected">{text[language].rejectedStatus}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{text[language].name}</TableHead>
                      <TableHead>{text[language].category}</TableHead>
                      <TableHead>{text[language].location}</TableHead>
                      <TableHead>{text[language].experience}</TableHead>
                      <TableHead>{text[language].phone}</TableHead>
                      <TableHead>{text[language].status}</TableHead>
                      <TableHead>{text[language].actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProviders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">{text[language].noData}</TableCell>
                      </TableRow>
                    ) : filteredProviders.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">
                          {language === 'bn' ? provider.name : provider.nameEn}
                        </TableCell>
                        <TableCell>{provider.category}</TableCell>
                        <TableCell>
                          {language === 'bn' ? provider.location : provider.locationEn}
                        </TableCell>
                        <TableCell>{provider.experience} বছর</TableCell>
                        <TableCell>{provider.phone}</TableCell>
                        <TableCell>
                          <Badge variant={
                            provider.status === 'pending' ? 'default' :
                            provider.status === 'approved' ? 'secondary' : 'destructive'
                          }>
                            {provider.status === 'pending' ? text[language].pendingStatusLabel :
                             provider.status === 'approved' ? text[language].approvedStatusLabel : text[language].rejectedStatusLabel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleProviderAction(provider.id, 'view')}
                              title={text[language].providerView}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {provider.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproval(provider.id, 'approve')}
                                  className="bg-green-500 hover:bg-green-600"
                                  title={text[language].approve}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleApproval(provider.id, 'reject')}
                                  title={text[language].reject}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {provider.status === 'approved' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleProviderAction(provider.id, 'suspend')}
                                title={text[language].suspend}
                              >
                                {text[language].suspend}
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

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{text[language].userManagement}</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    {text[language].newUser}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder={text[language].searchPlaceholderUsers}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={text[language].filterStatusPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{text[language].allStatus}</SelectItem>
                      <SelectItem value="active">{text[language].activeStatus}</SelectItem>
                      <SelectItem value="blocked">{text[language].blockedStatus}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{text[language].name}</TableHead>
                      <TableHead>{text[language].email}</TableHead>
                      <TableHead>{text[language].phone}</TableHead>
                      <TableHead>{text[language].joinDate}</TableHead>
                      <TableHead>{text[language].bookings}</TableHead>
                      <TableHead>{text[language].totalSpent}</TableHead>
                      <TableHead>{text[language].status}</TableHead>
                      <TableHead>{text[language].actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-gray-500">{text[language].noData}</TableCell>
                      </TableRow>
                    ) : filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.totalBookings}</TableCell>
                        <TableCell className="text-green-600 font-semibold">{user.totalSpent}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'}>
                            {user.status === 'active' ? text[language].activeStatusLabel : text[language].blockedStatusLabel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleUserAction(user.id, 'edit')}
                              title={text[language].edit}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant={user.status === 'active' ? 'destructive' : 'default'}
                              onClick={() => handleUserAction(user.id, user.status === 'active' ? 'block' : 'activate')}
                              title={user.status === 'active' ? text[language].block : text[language].activate}
                            >
                              {user.status === 'active' ? text[language].block : text[language].activate}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleUserAction(user.id, 'delete')}
                              title={text[language].delete}
                            >
                              <Trash2 className="w-4 h-4" />
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
                  <div className="flex items-center justify-between">
                    <CardTitle>{text[language].analytics}</CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGenerateReport('analytics')}
                        disabled={isGeneratingReport}
                      >
                        {isGeneratingReport ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <FileText className="w-4 h-4 mr-2" />
                        )}
                        {text[language].reportCreate}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleBulkAction('export')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {text[language].export}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                    <div className="text-center p-6">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">বিশ্লেষণ ড্যাশবোর্ড</h3>
                      <p className="text-gray-500 mb-4">প্ল্যাটফর্ম পারফরম্যান্স ডেটা এবং চার্ট এখানে প্রদর্শিত হবে</p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">দৈনিক ব্যবহারকারী</p>
                          <p className="text-xl font-bold text-blue-600">2,543</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">রূপান্তর হার</p>
                          <p className="text-xl font-bold text-green-600">23.4%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{text[language].metricsTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{text[language].totalRevenue}</span>
                      <span className="text-sm font-bold text-green-600">{analyticsData.totalRevenue}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">{analyticsData.monthlyGrowth} {text[language].monthlyGrowth}</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{text[language].activeProviders}</span>
                      <span className="text-sm font-bold text-blue-600">{analyticsData.activeProviders}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{text[language].customerSatisfaction}</span>
                      <span className="text-sm font-bold text-purple-600">{analyticsData.customerSatisfaction}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{text[language].avgRating}</span>
                      <span className="text-sm font-bold text-yellow-600">{analyticsData.avgRating}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSystemAction('update')}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {text[language].systemUpdateBtn}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSystemAction('maintenance')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {text[language].maintenanceModeBtn}
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
