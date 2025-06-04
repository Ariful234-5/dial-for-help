
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Search } from 'lucide-react';

interface LocationPickerProps {
  location: { lat: number; lng: number; address: string };
  setLocation: (location: { lat: number; lng: number; address: string }) => void;
  language: string;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  setLocation,
  language
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const text = {
    bn: {
      currentLocation: "বর্তমান অবস্থান",
      detectLocation: "অবস্থান খুঁজুন",
      manualLocation: "ঠিকানা লিখুন",
      detecting: "খুঁজছি..."
    },
    en: {
      currentLocation: "Current Location",
      detectLocation: "Detect Location",
      manualLocation: "Enter Address",
      detecting: "Detecting..."
    }
  };

  const detectCurrentLocation = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: language === 'bn' ? "আপনার বর্তমান অবস্থান" : "Your Current Location"
          };
          setLocation(newLocation);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Location detection failed:", error);
          setIsDetecting(false);
        }
      );
    } else {
      console.error("Geolocation is not supported");
      setIsDetecting(false);
    }
  };

  const handleManualLocation = () => {
    if (manualAddress.trim()) {
      // In a real app, you would geocode the address
      const newLocation = {
        lat: 23.8103 + (Math.random() - 0.5) * 0.1,
        lng: 90.4125 + (Math.random() - 0.5) * 0.1,
        address: manualAddress
      };
      setLocation(newLocation);
      setManualAddress('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {text[language].currentLocation}
        </h4>
        <div className="text-sm text-gray-600 mb-3 p-2 bg-gray-50 rounded">
          {location.address}
        </div>
      </div>

      <Button
        onClick={detectCurrentLocation}
        disabled={isDetecting}
        variant="outline"
        className="w-full"
      >
        <Navigation className="w-4 h-4 mr-2" />
        {isDetecting ? text[language].detecting : text[language].detectLocation}
      </Button>

      <div className="space-y-2">
        <Input
          placeholder={text[language].manualLocation}
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleManualLocation()}
        />
        <Button
          onClick={handleManualLocation}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Search className="w-4 h-4 mr-2" />
          {language === 'bn' ? 'সেট করুন' : 'Set Location'}
        </Button>
      </div>
    </div>
  );
};
