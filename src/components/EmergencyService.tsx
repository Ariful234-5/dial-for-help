
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, MapPin, Clock, Zap, Shield, Siren } from 'lucide-react';

interface EmergencyServiceProps {
  language: string;
}

export const EmergencyService: React.FC<EmergencyServiceProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  const text = {
    bn: {
      emergency: 'জরুরি সাহায্য',
      emergencyServices: 'জরুরি সেবা',
      selectEmergency: 'জরুরি সেবা নির্বাচন করুন',
      electricalEmergency: 'বিদ্যুৎ জরুরি অবস্থা',
      plumbingEmergency: 'পানি সাপ্লাই জরুরি',
      medicalEmergency: 'চিকিৎসা জরুরি',
      securityEmergency: 'নিরাপত্তা জরুরি',
      fireEmergency: 'অগ্নিকাণ্ড জরুরি',
      gasEmergency: 'গ্যাস লিক জরুরি',
      callNow: 'এখনই কল করুন',
      available24x7: '২৪/৭ উপলব্ধ',
      avgResponse: 'গড় সাড়া সময়',
      minutes: 'মিনিট',
      nearestProvider: 'নিকটতম প্রদানকারী'
    },
    en: {
      emergency: 'Emergency Help',
      emergencyServices: 'Emergency Services',
      selectEmergency: 'Select Emergency Service',
      electricalEmergency: 'Electrical Emergency',
      plumbingEmergency: 'Plumbing Emergency',
      medicalEmergency: 'Medical Emergency',
      securityEmergency: 'Security Emergency',
      fireEmergency: 'Fire Emergency',
      gasEmergency: 'Gas Leak Emergency',
      callNow: 'Call Now',
      available24x7: '24/7 Available',
      avgResponse: 'Avg Response',
      minutes: 'mins',
      nearestProvider: 'Nearest Provider'
    }
  };

  const emergencyServices = [
    {
      id: 'electrical',
      title: text[language].electricalEmergency,
      icon: Zap,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      responseTime: '15',
      description: language === 'bn' ? 'শর্ট সার্কিট, পাওয়ার কাট, বিদ্যুৎ সংক্রান্ত জরুরি সমস্যা' : 'Short circuit, power cuts, electrical emergencies',
      phone: '+880-1700-000001'
    },
    {
      id: 'plumbing',
      title: text[language].plumbingEmergency,
      icon: Shield,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      responseTime: '20',
      description: language === 'bn' ? 'পানি লিক, ড্রেনেজ ব্লক, পাইপ বার্স্ট' : 'Water leaks, drainage blocks, pipe bursts',
      phone: '+880-1700-000002'
    },
    {
      id: 'medical',
      title: text[language].medicalEmergency,
      icon: Phone,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      responseTime: '10',
      description: language === 'bn' ? 'হার্ট অ্যাটাক, স্ট্রোক, অজ্ঞান হওয়া, দুর্ঘটনা' : 'Heart attack, stroke, unconsciousness, accidents',
      phone: '+880-1700-000003'
    },
    {
      id: 'security',
      title: text[language].securityEmergency,
      icon: Shield,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      responseTime: '12',
      description: language === 'bn' ? 'চুরি, ডাকাতি, নিরাপত্তা সমস্যা' : 'Theft, robbery, security issues',
      phone: '+880-1700-000004'
    },
    {
      id: 'fire',
      title: text[language].fireEmergency,
      icon: Siren,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      responseTime: '8',
      description: language === 'bn' ? 'আগুন, ধোঁয়া, গ্যাস লিক' : 'Fire, smoke, gas leaks',
      phone: '+880-1700-000005'
    },
    {
      id: 'gas',
      title: text[language].gasEmergency,
      icon: AlertTriangle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      responseTime: '18',
      description: language === 'bn' ? 'গ্যাস লিক, গ্যাস বার্নার সমস্যা' : 'Gas leaks, gas burner issues',
      phone: '+880-1700-000006'
    }
  ];

  const handleEmergencyCall = (service: any) => {
    // In a real app, this would initiate a call
    console.log('Emergency call initiated for:', service);
    alert(`Calling ${service.title}: ${service.phone}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-red-500 hover:bg-red-600 text-white animate-pulse"
          size="lg"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          {text[language].emergency}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <Siren className="w-6 h-6" />
            <span className="text-2xl">{text[language].emergencyServices}</span>
          </DialogTitle>
          <p className="text-gray-600">{text[language].selectEmergency}</p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {emergencyServices.map((service) => (
            <Card key={service.id} className={`hover:shadow-lg transition-all duration-300 border-l-4 ${service.color}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${service.bgColor}`}>
                      <service.icon className={`w-6 h-6 ${service.textColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge className={`mt-1 ${service.color} text-white border-0`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {text[language].avgResponse}: {service.responseTime} {text[language].minutes}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{service.description}</p>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{text[language].nearestProvider}: 2.3 km</span>
                </div>
                
                <Button 
                  onClick={() => handleEmergencyCall(service)}
                  className={`w-full ${service.color} hover:opacity-90 text-white font-semibold`}
                  size="lg"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {text[language].callNow}
                </Button>
                
                <div className="flex justify-center">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    {text[language].available24x7}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">
              {language === 'bn' 
                ? 'জরুরি অবস্থায় ৯৯৯ নম্বরে কল করুন' 
                : 'In extreme emergency, call 999'
              }
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
