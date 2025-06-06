
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye } from 'lucide-react';
import { User } from '@/hooks/useUsers';
import { getTranslation, getStatusTranslation } from '@/utils/adminTranslations';

interface UserManagementProps {
  users: User[];
  loading: boolean;
  searchTerm: string;
  userFilter: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onUserAction: (userId: string, action: string) => void;
  onSystemAction: (action: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  loading,
  searchTerm,
  userFilter,
  onSearchChange,
  onFilterChange,
  onUserAction,
  onSystemAction
}) => {
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{getTranslation('userManagement')}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onSystemAction('ব্যবহারকারী রপ্তানি')}>
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
              placeholder="ব্যবহারকারী অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Select value={userFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব ব্যবহারকারী</SelectItem>
              <SelectItem value="active">{getTranslation('active')}</SelectItem>
              <SelectItem value="inactive">{getTranslation('inactive')}</SelectItem>
              <SelectItem value="suspended">{getTranslation('suspended')}</SelectItem>
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
                <TableHead>{getTranslation('email')}</TableHead>
                <TableHead>{getTranslation('phone')}</TableHead>
                <TableHead>{getTranslation('location')}</TableHead>
                <TableHead>{getTranslation('status')}</TableHead>
                <TableHead>বুকিং</TableHead>
                <TableHead>{getTranslation('joinDate')}</TableHead>
                <TableHead>{getTranslation('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                      {getStatusTranslation(user.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.total_bookings}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => onUserAction(user.id, 'দেখুন')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onUserAction(user.id, user.status === 'active' ? 'স্থগিত' : 'সক্রিয়')}
                      >
                        {user.status === 'active' ? getTranslation('suspend') : getTranslation('activate')}
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

export default UserManagement;
