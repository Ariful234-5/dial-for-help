
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';

interface EmergencyButtonProps {
  language: string;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ language }) => {
  const [showEmergency, setShowEmergency] = useState(false);

  const text = {
    bn: {
      emergency: 'জরুরি সাহায্য',
      emergencyServices: 'জরুরি সেবাসমূহ',
      ambulance: 'অ্যাম্বুলেন্স',
      police: 'পুলিশ',
      fireService: 'ফায়ার সার্ভিস',
      call: 'কল করুন',
      available24: '২৪/৭ উপলব্ধ'
    },
    en: {
      emergency: 'Emergency Help',
      emergencyServices: 'Emergency Services',
      ambulance: 'Ambulance',
      police: 'Police',
      fireService: 'Fire Service',
      call: 'Call Now',
      available24: '24/7 Available'
    }
  };

  const emergencyServices = [
    {
      name: { bn: 'অ্যাম্বুলেন্স', en: 'Ambulance' },
      number: '999',
      icon: '🚑',
      color: 'bg-red-500'
    },
    {
      name: { bn: 'পুলিশ', en: 'Police' },
      number: '999',
      icon: '👮‍♂️',
      color: 'bg-blue-500'
    },
    {
      name: { bn: 'ফায়ার সার্ভিস', en: 'Fire Service' },
      number: '999',
      icon: '🚒',
      color: 'bg-orange-500'
    }
  ];

  const handleEmergencyCall = (number: string) => {
    if (confirm(`${text[language].call} ${number}?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowEmergency(true)}
        className="bg-red-500 hover:bg-red-600 text-white animate-bounce-gentle"
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        {text[language].emergency}
      </Button>

      <Dialog open={showEmergency} onOpenChange={setShowEmergency}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {text[language].emergencyServices}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {emergencyServices.map((service, index) => (
              <Card key={index} className="border-2 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${service.color} rounded-full flex items-center justify-center text-white text-lg`}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.name[language]}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {text[language].available24}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleEmergencyCall(service.number)}
                      className={`${service.color} hover:opacity-90 text-white`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {service.number}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center text-sm text-gray-600 mt-4 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-4 h-4 inline mr-1 text-yellow-600" />
            {language === 'bn' ? 
              'শুধুমাত্র প্রকৃত জরুরি অবস্থায় ব্যবহার করুন' : 
              'Use only for genuine emergencies'
            }
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
