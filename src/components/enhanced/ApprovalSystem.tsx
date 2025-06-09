
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye, Star, MapPin, Phone } from 'lucide-react';
import { useServiceProviders } from '@/hooks/useServiceProviders';
import { useToast } from "@/hooks/use-toast";

const ApprovalSystem = () => {
  const { providers, updateProviderStatus } = useServiceProviders();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const pendingProviders = providers.filter(provider => !provider.verified);

  const handleApproval = async (providerId: string, approved: boolean) => {
    const result = await updateProviderStatus(providerId, approved);
    
    if (result.success) {
      toast({
        title: approved ? 'অনুমোদিত' : 'প্রত্যাখ্যাত',
        description: `প্রদানকারী ${approved ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} হয়েছে।`,
      });
      setShowDetails(false);
    } else {
      toast({
        title: 'ত্রুটি',
        description: 'অপারেশন সম্পন্ন করতে পারা যায়নি।',
        variant: 'destructive',
      });
    }
  };

  const viewDetails = (provider: any) => {
    setSelectedProvider(provider);
    setShowDetails(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            অনুমোদনের অপেক্ষায় প্রদানকারী
            <Badge variant="secondary">{pendingProviders.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingProviders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              কোন অনুমোদনের অপেক্ষায় প্রদানকারী নেই
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProviders.map((provider) => (
                <div key={provider.id} className="p-3 md:p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <img
                        src={provider.image || "/placeholder.svg"}
                        alt={provider.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm md:text-base truncate">{provider.name}</h3>
                        <p className="text-xs md:text-sm text-gray-600">{provider.category}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{provider.location}</span>
                          <span className="mx-2 hidden sm:inline">•</span>
                          <span className="hidden sm:inline">{provider.experience} বছর</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewDetails(provider)}
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        বিস্তারিত
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:bg-green-50 flex-1 sm:flex-none"
                        onClick={() => handleApproval(provider.id, true)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        অনুমোদন
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 flex-1 sm:flex-none"
                        onClick={() => handleApproval(provider.id, false)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        প্রত্যাখ্যান
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Provider Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>প্রদানকারীর বিস্তারিত তথ্য</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <img
                  src={selectedProvider.image || "/placeholder.svg"}
                  alt={selectedProvider.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{selectedProvider.name}</h2>
                  <p className="text-gray-600">{selectedProvider.name_en}</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm">{selectedProvider.rating}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-600">{selectedProvider.experience} বছর</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">যোগাযোগের তথ্য</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedProvider.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {selectedProvider.location}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">সেবার তথ্য</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>ক্যাটেগরি:</strong> {selectedProvider.category}</p>
                    <p><strong>মূল্য:</strong> {selectedProvider.price}</p>
                  </div>
                </div>
              </div>

              {selectedProvider.description && (
                <div>
                  <h3 className="font-medium mb-2">বিবরণ</h3>
                  <p className="text-sm text-gray-600">{selectedProvider.description}</p>
                </div>
              )}

              {selectedProvider.specialties && selectedProvider.specialties.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">বিশেষত্ব</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <Button
                  className="flex-1 text-green-600 hover:bg-green-50"
                  variant="outline"
                  onClick={() => handleApproval(selectedProvider.id, true)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  অনুমোদন করুন
                </Button>
                <Button
                  className="flex-1 text-red-600 hover:bg-red-50"
                  variant="outline"
                  onClick={() => handleApproval(selectedProvider.id, false)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  প্রত্যাখ্যান করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovalSystem;
