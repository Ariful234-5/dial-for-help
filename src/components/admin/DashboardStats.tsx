
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, AlertTriangle, DollarSign } from 'lucide-react';
import { AnalyticsData } from '@/hooks/useAnalytics';
import { getTranslation } from '@/utils/adminTranslations';

interface DashboardStatsProps {
  analytics: AnalyticsData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ analytics }) => {
  const stats = [
    {
      title: getTranslation('totalUsers'),
      value: analytics.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: `+${analytics.monthlyGrowth}% এই মাসে`
    },
    {
      title: getTranslation('activeProviders'),
      value: analytics.activeProviders.toString(),
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12 নতুন এই মাসে'
    },
    {
      title: getTranslation('pendingApprovals'),
      value: analytics.pendingApprovals.toString(),
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: 'পর্যালোচনার প্রয়োজন'
    },
    {
      title: getTranslation('totalRevenue'),
      value: `৳${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+18% গত মাস থেকে'
    }
  ];

  return (
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
  );
};

export default DashboardStats;
