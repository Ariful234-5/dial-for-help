
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from 'lucide-react';
import { ServiceProvider } from '@/hooks/useServiceProviders';
import { getTranslation, getCategoryTranslation } from '@/utils/adminTranslations';

interface PendingApprovalsProps {
  pendingProviders: ServiceProvider[];
  onProviderAction: (providerId: string, action: string) => void;
}

const PendingApprovals: React.FC<PendingApprovalsProps> = ({ pendingProviders, onProviderAction }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>অনুমোদনের অপেক্ষায়</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingProviders.slice(0, 3).map((provider) => (
          <div key={provider.id} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm">{provider.name}</p>
              <Badge variant="outline">{getCategoryTranslation(provider.category)}</Badge>
            </div>
            <p className="text-xs text-gray-600 mb-3">{provider.location} • {provider.experience} বছর</p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => onProviderAction(provider.id, 'অনুমোদন')}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {getTranslation('approve')}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => onProviderAction(provider.id, 'প্রত্যাখ্যান')}
              >
                <XCircle className="w-3 h-3 mr-1" />
                {getTranslation('reject')}
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full" size="sm">
          সব অনুরোধ দেখুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default PendingApprovals;
