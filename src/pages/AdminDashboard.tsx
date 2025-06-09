
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Settings, Shield, Users, BarChart3, FileText, Briefcase, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import { useUsers } from "@/hooks/useUsers";
import { useReports } from "@/hooks/useReports";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useAdminRoles } from "@/hooks/useAdminRoles";
import { getTranslation } from '@/utils/adminTranslations';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import PendingApprovals from '@/components/admin/PendingApprovals';
import QuickActions from '@/components/admin/QuickActions';
import UserManagement from '@/components/admin/UserManagement';
import ProviderManagement from '@/components/admin/ProviderManagement';
import ReportsSection from '@/components/admin/ReportsSection';
import AnalyticsSection from '@/components/admin/AnalyticsSection';
import ApprovalSystem from '@/components/enhanced/ApprovalSystem';
import AdminSetup from '@/components/enhanced/AdminSetup';
import EarningsReport from '@/components/enhanced/EarningsReport';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useAdminRoles();

  // Use the hooks
  const { providers, loading: providersLoading, refetch: refetchProviders } = useServiceProviders();
  const { users, loading: usersLoading, updateUserStatus } = useUsers();
  const { reports, loading: reportsLoading, generateReport, downloadReport } = useReports();
  const { analytics, loading: analyticsLoading, refreshAnalytics } = useAnalytics();

  // Check if user is admin
  if (adminLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">অ্যাক্সেস নিষিদ্ধ</h1>
          <p className="text-gray-600 mb-4">
            এই পেজ দেখার জন্য আপনার অ্যাডমিন অনুমতি প্রয়োজন।
          </p>
          <Button onClick={() => window.history.back()}>
            পিছনে যান
          </Button>
        </div>
      </div>
    );
  }

  const handleUserAction = async (userId: string, action: string) => {
    if (action === 'স্থগিত' || action === 'সক্রিয়') {
      const newStatus = action === 'স্থগিত' ? 'suspended' : 'active';
      const result = await updateUserStatus(userId, newStatus);
      
      if (result.success) {
        toast({
          title: 'সফল',
          description: `ব্যবহারকারীর অবস্থা ${action} করা হয়েছে।`,
        });
      } else {
        toast({
          title: 'ত্রুটি',
          description: 'অপারেশন সম্পন্ন করতে পারা যায়নি।',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'ব্যবহারকারী কার্যক্রম',
        description: `ব্যবহারকারী #${userId} এর জন্য ${action} সম্পাদিত হয়েছে।`,
      });
    }
  };

  const handleProviderAction = (providerId: string, action: string) => {
    toast({
      title: 'প্রদানকারী কার্যক্রম',
      description: `প্রদানকারী #${providerId} এর জন্য ${action} সম্পাদিত হয়েছে।`,
    });
  };

  const handleReportGeneration = async (reportType: string) => {
    const typeMap: Record<string, 'user' | 'provider' | 'financial' | 'booking' | 'performance'> = {
      'ব্যবহারকারী রিপোর্ট': 'user',
      'প্রদানকারী রিপোর্ট': 'provider',
      'আর্থিক রিপোর্ট': 'financial',
      'বুকিং রিপোর্ট': 'booking',
      'কর্মক্ষমতা রিপোর্ট': 'performance'
    };

    const result = await generateReport(typeMap[reportType] || 'user');
    
    if (result.success) {
      toast({
        title: 'রিপোর্ট তৈরি',
        description: `${reportType} তৈরি করা হচ্ছে...`,
      });
    } else {
      toast({
        title: 'ত্রুটি',
        description: 'রিপোর্ট তৈরি করতে সমস্যা হয়েছে।',
        variant: 'destructive',
      });
    }
  };

  const handleSystemAction = async (action: string) => {
    if (action === 'তথ্য রিফ্রেশ') {
      await refreshAnalytics();
      await refetchProviders();
    }
    
    toast({
      title: 'সিস্টেম কার্যক্রম',
      description: `${action} সম্পাদিত হচ্ছে...`,
    });
  };

  const pendingProviders = providers.filter(provider => !provider.verified);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center">
                <Shield className="w-6 h-6 lg:w-8 lg:h-8 mr-2 text-blue-600" />
                অ্যাডমিন ড্যাশবোর্ড
              </h1>
              <p className="text-gray-600 mt-2">সিস্টেম পরিচালনা এবং নিয়ন্ত্রণ কেন্দ্র</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="outline" 
                onClick={() => handleSystemAction('তথ্য রিফ্রেশ')}
                disabled={analyticsLoading}
                className="w-full sm:w-auto"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${analyticsLoading ? 'animate-spin' : ''}`} />
                তথ্য রিফ্রেশ
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Settings className="w-4 h-4 mr-2" />
                সেটিংস
              </Button>
            </div>
          </div>
        </div>

        <DashboardStats analytics={analytics} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <BarChart3 className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">ওভারভিউ</span>
              <span className="sm:hidden">হোম</span>
            </TabsTrigger>
            <TabsTrigger value="approval" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <Shield className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">অনুমোদন</span>
              <span className="sm:hidden">অনুমোদন</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <Users className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">ব্যবহারকারী</span>
              <span className="sm:hidden">ইউজার</span>
            </TabsTrigger>
            <TabsTrigger value="providers" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <Briefcase className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">প্রোভাইডার</span>
              <span className="sm:hidden">প্রোভাইডার</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <DollarSign className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">আয়</span>
              <span className="sm:hidden">আয়</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <FileText className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">রিপোর্ট</span>
              <span className="sm:hidden">রিপোর্ট</span>
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center text-xs lg:text-sm px-2 py-2">
              <Settings className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">সেটআপ</span>
              <span className="sm:hidden">সেটআপ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentActivity users={users} />
              </div>
              <div className="space-y-6">
                <PendingApprovals 
                  pendingProviders={pendingProviders} 
                  onProviderAction={handleProviderAction} 
                />
                <QuickActions 
                  onReportGeneration={handleReportGeneration}
                  onSystemAction={handleSystemAction}
                  reportsLoading={reportsLoading}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="approval">
            <ApprovalSystem />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement
              users={users}
              loading={usersLoading}
              searchTerm={searchTerm}
              userFilter={userFilter}
              onSearchChange={setSearchTerm}
              onFilterChange={setUserFilter}
              onUserAction={handleUserAction}
              onSystemAction={handleSystemAction}
            />
          </TabsContent>

          <TabsContent value="providers">
            <ProviderManagement
              providers={providers}
              loading={providersLoading}
              searchTerm={searchTerm}
              providerFilter={providerFilter}
              onSearchChange={setSearchTerm}
              onFilterChange={setProviderFilter}
              onProviderAction={handleProviderAction}
              onSystemAction={handleSystemAction}
            />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsReport />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection
              reports={reports}
              loading={reportsLoading}
              onReportGeneration={handleReportGeneration}
              onDownloadReport={downloadReport}
            />
          </TabsContent>

          <TabsContent value="setup">
            <AdminSetup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
