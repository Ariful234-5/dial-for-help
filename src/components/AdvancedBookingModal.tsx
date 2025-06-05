
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, DollarSign, Phone, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AdvancedBookingModalProps {
  provider: any;
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AdvancedBookingModal: React.FC<AdvancedBookingModalProps> = ({
  provider,
  language,
  isOpen,
  onClose
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [contactMethod, setContactMethod] = useState('phone');
  const [urgency, setUrgency] = useState('normal');

  const text = {
    bn: {
      bookService: 'সেবা বুক করুন',
      selectDate: 'তারিখ নির্বাচন করুন',
      selectTime: 'সময় নির্বাচন করুন',
      serviceType: 'সেবার ধরন',
      description: 'বিস্তারিত বিবরণ',
      contactMethod: 'যোগাযোগের মাধ্যম',
      urgency: 'জরুরি অবস্থা',
      phone: 'ফোন',
      message: 'মেসেজ',
      whatsapp: 'হোয়াটসঅ্যাপ',
      normal: 'সাধারণ',
      urgent: 'জরুরি',
      emergency: 'জরুরি জরুরি',
      estimatedCost: 'আনুমানিক খরচ',
      bookNow: 'এখনই বুক করুন',
      cancel: 'বাতিল'
    },
    en: {
      bookService: 'Book Service',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      serviceType: 'Service Type',
      description: 'Description',
      contactMethod: 'Contact Method',
      urgency: 'Urgency',
      phone: 'Phone',
      message: 'Message',
      whatsapp: 'WhatsApp',
      normal: 'Normal',
      urgent: 'Urgent',
      emergency: 'Emergency',
      estimatedCost: 'Estimated Cost',
      bookNow: 'Book Now',
      cancel: 'Cancel'
    }
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const serviceTypes = language === 'bn' ? provider?.specialties : provider?.specialtiesEn;

  const getEstimatedCost = () => {
    const basePrice = 500;
    const urgencyMultiplier = urgency === 'emergency' ? 2 : urgency === 'urgent' ? 1.5 : 1;
    return Math.round(basePrice * urgencyMultiplier);
  };

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking submitted:', {
      provider: provider.id,
      date: selectedDate,
      time: selectedTime,
      serviceType,
      description,
      contactMethod,
      urgency,
      estimatedCost: getEstimatedCost()
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <img
              src={provider?.image}
              alt={provider?.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <span className="text-xl">{text[language].bookService}</span>
              <p className="text-sm text-gray-600 font-normal">
                {language === 'bn' ? provider?.name : provider?.nameEn}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>{text[language].selectDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label>{text[language].selectTime}</Label>
            <div className="grid grid-cols-5 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className="text-xs"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label>{text[language].serviceType}</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes?.map((service: string, index: number) => (
                  <SelectItem key={index} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <Label>{text[language].urgency}</Label>
            <div className="flex space-x-2">
              {['normal', 'urgent', 'emergency'].map((level) => (
                <Button
                  key={level}
                  variant={urgency === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUrgency(level)}
                  className={`flex-1 ${
                    level === 'emergency' ? 'bg-red-500 hover:bg-red-600' :
                    level === 'urgent' ? 'bg-yellow-500 hover:bg-yellow-600' : ''
                  }`}
                >
                  {text[language][level as keyof typeof text.bn]}
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>{text[language].description}</Label>
            <Textarea
              placeholder={language === 'bn' ? 'আপনার সমস্যার বিস্তারিত লিখুন...' : 'Describe your problem in detail...'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Contact Method */}
          <div className="space-y-2">
            <Label>{text[language].contactMethod}</Label>
            <div className="flex space-x-2">
              {['phone', 'message', 'whatsapp'].map((method) => (
                <Button
                  key={method}
                  variant={contactMethod === method ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContactMethod(method)}
                  className="flex-1"
                >
                  {method === 'phone' && <Phone className="w-4 h-4 mr-1" />}
                  {method === 'message' && <MessageCircle className="w-4 h-4 mr-1" />}
                  {method === 'whatsapp' && <MessageCircle className="w-4 h-4 mr-1" />}
                  {text[language][method as keyof typeof text.bn]}
                </Button>
              ))}
            </div>
          </div>

          {/* Estimated Cost */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">{text[language].estimatedCost}:</span>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-xl font-bold text-green-600">৳{getEstimatedCost()}</span>
              </div>
            </div>
            {urgency !== 'normal' && (
              <p className="text-sm text-gray-600 mt-1">
                {urgency === 'urgent' ? '50%' : '100%'} extra for {urgency} service
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {text[language].cancel}
            </Button>
            <Button 
              onClick={handleBooking} 
              className="flex-1 bg-gradient-primary"
              disabled={!selectedDate || !selectedTime || !serviceType}
            >
              {text[language].bookNow}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
