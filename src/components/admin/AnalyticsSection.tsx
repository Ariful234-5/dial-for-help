
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, FileText } from 'lucide-react';
import { AnalyticsData } from '@/hooks/useAnalytics';
import { getTranslation } from '@/utils/adminTranslations';

interface AnalyticsSectionProps {
  analytics: AnalyticsData;
  onSystemAction: (action: string) => void;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ analytics, onSystemAction }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation('performanceAnalytics')}</CardTitle>
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
              <p className="text-xl font-bold text-blue-600">{analytics.responseTime} মিনিট</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">সম্পূর্ণতার হার</p>
              <p className="text-xl font-bold text-green-600">{analytics.completionRate}%</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">গড় রেটিং</p>
              <p className="text-xl font-bold text-yellow-600">{analytics.avgRating}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">মোট বুকিং</p>
              <p className="text-xl font-bold text-purple-600">{analytics.totalBookings.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSystemAction('বিস্তারিত অ্যানালিটিক্স')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              বিস্তারিত অ্যানালিটিক্স দেখুন
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSystemAction('কাস্টম রিপোর্ট')}
            >
              <FileText className="w-4 h-4 mr-2" />
              কাস্টম রিপোর্ট তৈরি করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
