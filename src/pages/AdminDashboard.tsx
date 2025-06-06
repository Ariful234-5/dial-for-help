
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import { useUsers } from "@/hooks/useUsers";
import { useReports } from "@/hooks/useReports";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getTranslation } from '@/utils/adminTranslations';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import PendingApprovals from '@/components/admin/PendingApprovals';
import QuickActions from '@/components/admin/QuickActions';
import UserManagement from '@/components/admin/UserManagement';
import ProviderManagement from '@/components/admin/ProviderManagement';
import ReportsSection from '@/components/admin/ReportsSection';
import AnalyticsSection from '@/components/admin/AnalyticsSection';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const { toast } = useToast();

  // Use the hooks
  const { providers, loading: providersLoading, refetch: refetchProviders } = useServiceProviders();
  const { users, loading: usersLoading, updateUserStatus } = useUsers();
  const { reports, loading: reportsLoading, generateReport, downloadReport } = useReports();
  const { analytics, loading: analyticsLoading, refreshAnalytics } = useAnalytics();

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{getTranslation('dashboard')}</h1>
              <p className="text-gray-600 mt-2">সিস্টেম পরিচালনা এবং নিয়ন্ত্রণ কেন্দ্র</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => handleSystemAction('তথ্য রিফ্রেশ')}
                disabled={analyticsLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${analyticsLoading ? 'animate-spin' : ''}`} />
                {getTranslation('refreshData')}
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                {getTranslation('settings')}
              </Button>
            </div>
          </div>
        </div>

        <DashboardStats analytics={analytics} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{getTranslation('overview')}</TabsTrigger>
            <TabsTrigger value="users">{getTranslation('users')}</TabsTrigger>
            <TabsTrigger value="providers">{getTranslation('providers')}</TabsTrigger>
            <TabsTrigger value="reports">{getTranslation('reports')}</TabsTrigger>
            <TabsTrigger value="analytics">{getTranslation('analytics')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RecentActivity users={users} />
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

          <TabsContent value="reports">
            <ReportsSection
              reports={reports}
              loading={reportsLoading}
              onReportGeneration={handleReportGeneration}
              onDownloadReport={downloadReport}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsSection
              analytics={analytics}
              onSystemAction={handleSystemAction}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
