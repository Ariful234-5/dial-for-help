
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { useEarnings } from '@/hooks/useEarnings';

interface EarningsReportProps {
  providerId?: string;
}

const EarningsReport: React.FC<EarningsReportProps> = ({ providerId }) => {
  const { earnings, totalEarnings, loading } = useEarnings(providerId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'পরিশোধিত';
      case 'pending': return 'অপেক্ষমাণ';
      case 'cancelled': return 'বাতিল';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">লোড হচ্ছে...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">মোট আয়</p>
                <p className="text-lg font-semibold">৳{totalEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">মোট লেনদেন</p>
                <p className="text-lg font-semibold">{earnings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">এই মাসে</p>
                <p className="text-lg font-semibold">
                  ৳{earnings
                    .filter(e => new Date(e.created_at).getMonth() === new Date().getMonth())
                    .reduce((sum, e) => sum + e.net_amount, 0)
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <CardTitle>আয়ের বিস্তারিত</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              রিপোর্ট ডাউনলোড
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {earnings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              কোন আয়ের তথ্য পাওয়া যায়নি
            </div>
          ) : (
            <div className="space-y-4">
              {earnings.map((earning) => (
                <div key={earning.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <p className="font-medium">বুকিং #{earning.booking_id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(earning.created_at).toLocaleDateString('bn-BD')}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="text-right sm:text-left">
                        <p className="font-semibold">৳{earning.net_amount}</p>
                        <p className="text-xs text-gray-500">
                          কমিশন: ৳{earning.commission}
                        </p>
                      </div>
                      <Badge className={getStatusColor(earning.payment_status)}>
                        {getStatusText(earning.payment_status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsReport;
