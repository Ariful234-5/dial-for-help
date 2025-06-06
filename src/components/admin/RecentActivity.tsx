
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye } from 'lucide-react';
import { User } from '@/hooks/useUsers';
import { getTranslation, getStatusTranslation } from '@/utils/adminTranslations';

interface RecentActivityProps {
  users: User[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ users }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            {getTranslation('viewAll')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{user.full_name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.created_at} এ যোগদান</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                  {getStatusTranslation(user.status)}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">{user.total_bookings} বুকিং</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
