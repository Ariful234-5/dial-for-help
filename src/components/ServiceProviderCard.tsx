
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, MessageCircle, Clock, Shield, Award } from 'lucide-react';

interface ServiceProviderCardProps {
  provider: any;
  language: string;
  text: any;
  onChat: (provider: any) => void;
  onBook: (provider: any) => void;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  provider,
  language,
  text,
  onChat,
  onBook
}) => {
  const getStatusColor = (available: boolean) => {
    if (available) return 'bg-green-500';
    return 'bg-yellow-500';
  };

  const getStatusText = (available: boolean) => {
    if (available) return text[language].available;
    return text[language].busy;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getStatusColor(provider.available)} ring-2 ring-white`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {language === 'bn' ? provider.name : provider.nameEn}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{language === 'bn' ? provider.location : provider.locationEn}</span>
                <span>•</span>
                <span>{provider.distance} km</span>
              </div>
            </div>
          </div>
          {provider.verified && (
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              {language === 'bn' ? 'যাচাইকৃত' : 'Verified'}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Rating and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{provider.rating}</span>
              <span className="text-gray-500 text-sm">({provider.reviews} {text[language].reviews})</span>
            </div>
          </div>
          <Badge variant="outline" className={`${getStatusColor(provider.available)} text-white border-0`}>
            <Clock className="w-3 h-3 mr-1" />
            {getStatusText(provider.available)}
          </Badge>
        </div>

        {/* Experience and Price */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <Award className="w-4 h-4" />
            <span>{provider.experience} {text[language].years} {text[language].experience}</span>
          </div>
          <div className="font-semibold text-green-600">
            {language === 'bn' ? provider.price : provider.priceEn}
          </div>
        </div>

        {/* Specialties */}
        <div>
          <div className="flex flex-wrap gap-1">
            {(language === 'bn' ? provider.specialties : provider.specialtiesEn).slice(0, 3).map((specialty: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            onClick={() => onChat(provider)}
            variant="outline"
            className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {text[language].chat}
          </Button>
          <Button
            onClick={() => onBook(provider)}
            className="flex-1 bg-gradient-primary hover:shadow-lg transition-all duration-300"
            disabled={!provider.available}
          >
            <Phone className="w-4 h-4 mr-2" />
            {text[language].book}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
