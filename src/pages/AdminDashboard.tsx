
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserCheck, Clock, TrendingUp, AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [language] = useState('bn');

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
      rejected: 'প্রত্যাখ্যাত'
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
      rejected: 'Rejected'
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

  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    setPendingProviders(prev => 
      prev.map(provider => 
        provider.id === id 
          ? { ...provider, status: action === 'approve' ? 'approved' : 'rejected' }
          : provider
      )
    );
  };

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
              <Badge className="ml-2 bg-red-500 text-white">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="users">{text[language].users}</TabsTrigger>
            <TabsTrigger value="analytics">{text[language].analytics}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">2 new provider applications pending</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">15 new user registrations today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Review Provider Applications
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    System Security Check
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Generate Reports
                  </Button>
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
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics and reporting features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
