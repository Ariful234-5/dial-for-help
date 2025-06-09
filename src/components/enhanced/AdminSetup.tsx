
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, UserPlus, Mail } from 'lucide-react';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import { useToast } from "@/hooks/use-toast";

const AdminSetup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { makeUserAdmin } = useAdminRoles();
  const { toast } = useToast();

  const handleMakeAdmin = async () => {
    if (!email) {
      toast({
        title: 'ত্রুটি',
        description: 'ইমেইল এড্রেস প্রয়োজন',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // In a real app, you'd first fetch the user by email
      // For now, we'll simulate this
      const result = await makeUserAdmin('dummy-user-id');
      
      if (result.success) {
        toast({
          title: 'সফল',
          description: 'নতুন অ্যাডমিন যোগ করা হয়েছে',
        });
        setEmail('');
      } else {
        toast({
          title: 'ত্রুটি',
          description: 'অ্যাডমিন যোগ করতে সমস্যা হয়েছে',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'অপ্রত্যাশিত সমস্যা হয়েছে',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            অ্যাডমিন সেটআপ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>
              এই সেকশনে আপনি নতুন অ্যাডমিন যোগ করতে পারবেন। অ্যাডমিনরা সিস্টেমের সব ফিচার নিয়ন্ত্রণ করতে পারবেন।
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">নতুন অ্যাডমিনের ইমেইল</Label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              onClick={handleMakeAdmin}
              disabled={loading || !email}
              className="w-full"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {loading ? 'যোগ করা হচ্ছে...' : 'অ্যাডমিন যোগ করুন'}
            </Button>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">অ্যাডমিন অনুমতিসমূহ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>সার্ভিস প্রোভাইডার অনুমোদন</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>ব্যবহারকারী ব্যবস্থাপনা</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>রিপোর্ট দেখা</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>সিস্টেম সেটিংস</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
