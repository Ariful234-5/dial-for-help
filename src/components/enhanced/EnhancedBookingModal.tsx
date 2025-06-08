
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, DollarSign, User, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useBookings } from "@/hooks/useBookings";
import { useAuth } from "@/hooks/useAuth";

interface EnhancedBookingModalProps {
  provider: any;
  language: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EnhancedBookingModal: React.FC<EnhancedBookingModalProps> = ({
  provider,
  language,
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const { createBooking } = useBookings();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const text = {
    bn: {
      bookingTitle: 'সার্ভিস বুক করুন',
      selectDate: 'তারিখ নির্বাচন করুন',
      selectTime: 'সময় নির্বাচন করুন',
      customerInfo: 'গ্রাহকের তথ্য',
      name: 'নাম',
      phone: 'ফোন নম্বর',
      address: 'ঠিকানা',
      description: 'কাজের বিবরণ',
      estimatedCost: 'আনুমানিক খরচ',
      bookNow: 'বুক করুন',
      cancel: 'বাতিল',
      bookingSuccess: 'সফলভাবে বুক হয়েছে!',
      bookingMessage: 'আপনার বুকিং নিশ্চিত করা হয়েছে।',
      loginRequired: 'বুকিং করতে লগইন করুন'
    },
    en: {
      bookingTitle: 'Book Service',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      customerInfo: 'Customer Information',
      name: 'Name',
      phone: 'Phone Number',
      address: 'Address',
      description: 'Work Description',
      estimatedCost: 'Estimated Cost',
      bookNow: 'Book Now',
      cancel: 'Cancel',
      bookingSuccess: 'Booking Successful!',
      bookingMessage: 'Your booking has been confirmed.',
      loginRequired: 'Please login to make a booking'
    }
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: text[language].loginRequired,
        description: 'বুকিং করতে প্রথমে লগইন করুন।',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedDate || !selectedTime || !customerName || !customerPhone || !address) {
      toast({
        title: language === 'bn' ? 'তথ্য অসম্পূর্ণ' : 'Incomplete Information',
        description: language === 'bn' ? 
          'দয়া করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।' : 
          'Please fill in all required fields.',
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createBooking({
        provider_id: provider.id,
        customer_name: customerName,
        customer_phone: parseInt(customerPhone),
        address,
        selected_date: selectedDate.toLocaleDateString('bn-BD'),
        selected_time: selectedTime,
        description,
        status: 'pending',
        total_price: parseFloat(provider.price.replace(/[^0-9.-]/g, '')) || 0
      });

      if (result.success) {
        toast({
          title: text[language].bookingSuccess,
          description: text[language].bookingMessage,
        });
        onClose();
        // Reset form
        setSelectedDate(undefined);
        setSelectedTime('');
        setCustomerName('');
        setCustomerPhone('');
        setAddress('');
        setDescription('');
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: 'ত্রুটি',
        description: 'বুকিং করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            {text[language].bookingTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Provider Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={provider.image || "/placeholder.svg"}
                  alt={provider.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {language === 'bn' ? provider.name : provider.name_en}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {language === 'bn' ? provider.location : provider.location_en}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {language === 'bn' ? provider.price : provider.price_en}
                  </p>
                  <p className="text-xs text-gray-500">{text[language].estimatedCost}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {text[language].selectDate}
              </label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>

            {/* Time & Details */}
            <div className="space-y-4">
              {/* Time Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {text[language].selectTime}
                </label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder={text[language].selectTime} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Information */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {text[language].customerInfo}
                </h4>
                <div className="space-y-3">
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder={text[language].name}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder={text[language].phone}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      type="tel"
                      className="pl-10"
                      required
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder={text[language].address}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <Textarea
                    placeholder={text[language].description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              {text[language].cancel}
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1 bg-gradient-primary hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'বুক করা হচ্ছে...' : text[language].bookNow}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
