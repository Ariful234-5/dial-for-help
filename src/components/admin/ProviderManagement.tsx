
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye, Star } from 'lucide-react';
import { ServiceProvider } from '@/hooks/useServiceProviders';
import { getTranslation, getCategoryTranslation } from '@/utils/adminTranslations';

interface ProviderManagementProps {
  providers: ServiceProvider[];
  loading: boolean;
  searchTerm: string;
  providerFilter: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onProviderAction: (providerId: string, action: string) => void;
  onSystemAction: (action: string) => void;
}

const ProviderManagement: React.FC<ProviderManagementProps> = ({
  providers,
  loading,
  searchTerm,
  providerFilter,
  onSearchChange,
  onFilterChange,
  onProviderAction,
  onSystemAction
}) => {
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.name_en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = providerFilter === 'all' || 
                         (providerFilter === 'active' && provider.available) ||
                         (providerFilter === 'inactive' && !provider.available);
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{getTranslation('providerManagement')}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onSystemAction('প্রদানকারী রপ্তানি')}>
              <Download className="w-4 h-4 mr-2" />
              {getTranslation('exportData')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="প্রদানকারী অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Select value={providerFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব প্রদানকারী</SelectItem>
              <SelectItem value="active">{getTranslation('active')}</SelectItem>
              <SelectItem value="inactive">{getTranslation('inactive')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-8">লোড হচ্ছে...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{getTranslation('name')}</TableHead>
                <TableHead>{getTranslation('category')}</TableHead>
                <TableHead>{getTranslation('location')}</TableHead>
                <TableHead>{getTranslation('rating')}</TableHead>
                <TableHead>অভিজ্ঞতা</TableHead>
                <TableHead>{getTranslation('status')}</TableHead>
                <TableHead>{getTranslation('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getCategoryTranslation(provider.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>{provider.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{provider.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{provider.experience} বছর</TableCell>
                  <TableCell>
                    <Badge variant={provider.available ? 'secondary' : 'outline'}>
                      {provider.available ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => onProviderAction(provider.id, 'দেখুন')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onProviderAction(provider.id, provider.verified ? 'স্থগিত' : 'অনুমোদন')}
                      >
                        {provider.verified ? getTranslation('suspend') : getTranslation('approve')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderManagement;
