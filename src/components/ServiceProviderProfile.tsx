
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, MessageCircle, Calendar, Award, Shield, Clock, Users, Zap } from 'lucide-react';

interface ServiceProviderProfileProps {
  provider: any;
  language: string;
  onChat: () => void;
  onBook: () => void;
}

export const ServiceProviderProfile: React.FC<ServiceProviderProfileProps> = ({
  provider,
  language,
  onChat,
  onBook
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const text = {
    bn: {
      overview: 'সংক্ষিপ্ত বিবরণ',
      services: 'সেবাসমূহ',
      reviews: 'রিভিউ',
      contact: 'যোগাযোগ',
      experience: 'অভিজ্ঞতা',
      specialties: 'বিশেষত্ব',
      availability: 'উপলব্ধতা',
      pricing: 'মূল্য তালিকা',
      chat: 'চ্যাট করুন',
      book: 'বুক করুন',
      verified: 'যাচাইকৃত',
      available: 'উপলব্ধ',
      busy: 'ব্যস্ত'
    },
    en: {
      overview: 'Overview',
      services: 'Services',
      reviews: 'Reviews',
      contact: 'Contact',
      experience: 'Experience',
      specialties: 'Specialties',
      availability: 'Availability',
      pricing: 'Pricing',
      chat: 'Chat Now',
      book: 'Book Service',
      verified: 'Verified',
      available: 'Available',
      busy: 'Busy'
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-100"
              />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${
                provider.available ? 'bg-green-500' : 'bg-yellow-500'
              } ring-4 ring-white flex items-center justify-center`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {language === 'bn' ? provider.name : provider.nameEn}
                  </h1>
                  <div className="flex items-center space-x-2 text-gray-600 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{language === 'bn' ? provider.location : provider.locationEn}</span>
                    <span>•</span>
                    <span>{provider.distance} km away</span>
                  </div>
                </div>
                
                {provider.verified && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    <Shield className="w-3 h-3 mr-1" />
                    {text[language].verified}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{provider.rating}</span>
                  <span className="text-gray-500">({provider.reviews} {text[language].reviews})</span>
                </div>
                <Badge variant="outline" className={`${
                  provider.available ? 'bg-green-500' : 'bg-yellow-500'
                } text-white border-0`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {provider.available ? text[language].available : text[language].busy}
                </Badge>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={onChat} variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {text[language].chat}
                </Button>
                <Button onClick={onBook} className="flex-1 bg-gradient-primary">
                  <Calendar className="w-4 h-4 mr-2" />
                  {text[language].book}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{text[language].overview}</TabsTrigger>
          <TabsTrigger value="services">{text[language].services}</TabsTrigger>
          <TabsTrigger value="reviews">{text[language].reviews}</TabsTrigger>
          <TabsTrigger value="contact">{text[language].contact}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  {text[language].experience}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{provider.experience} {language === 'bn' ? 'বছর' : 'years'}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {text[language].reviews}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{provider.reviews}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {text[language].pricing}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-600">
                  {language === 'bn' ? provider.price : provider.priceEn}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>{text[language].specialties}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(language === 'bn' ? provider.specialties : provider.specialtiesEn).map((specialty: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">Customer {index + 1}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {language === 'bn' 
                          ? 'খুবই ভালো সেবা পেয়েছি। দ্রুত এবং কার্যকর কাজ।'
                          : 'Excellent service! Quick and efficient work.'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>{text[language].contact}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>+880 1234 567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{language === 'bn' ? provider.location : provider.locationEn}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{language === 'bn' ? 'সকাল ৮টা - রাত ১০টা' : '8 AM - 10 PM'}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
