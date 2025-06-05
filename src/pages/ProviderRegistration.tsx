
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, User, Phone, MapPin, Briefcase } from 'lucide-react';
import { Link } from "react-router-dom";

const ProviderRegistration = () => {
  const [language] = useState('bn');
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    phone: '',
    email: '',
    category: '',
    location: '',
    locationEn: '',
    experience: '',
    price: '',
    priceEn: '',
    description: '',
    descriptionEn: '',
    specialties: '',
    specialtiesEn: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const text = {
    bn: {
      title: 'সেবা প্রদানকারী নিবন্ধন',
      subtitle: 'আমাদের প্ল্যাটফর্মে যোগ দিন এবং আপনার সেবা প্রদান করুন',
      personalInfo: 'ব্যক্তিগত তথ্য',
      professionalInfo: 'পেশাগত তথ্য',
      name: 'নাম (বাংলা)',
      nameEn: 'নাম (ইংরেজি)',
      phone: 'ফোন নম্বর',
      email: 'ইমেইল',
      category: 'সেবার ধরন',
      location: 'এলাকা (বাংলা)',
      locationEn: 'এলাকা (ইংরেজি)',
      experience: 'অভিজ্ঞতা (বছর)',
      price: 'মূল্য পরিসীমা (বাংলা)',
      priceEn: 'মূল্য পরিসীমা (ইংরেজি)',
      description: 'নিজের সম্পর্কে (বাংলা)',
      descriptionEn: 'নিজের সম্পর্কে (ইংরেজি)',
      specialties: 'বিশেষত্ব (বাংলা)',
      specialtiesEn: 'বিশেষত্ব (ইংরেজি)',
      submit: 'আবেদন জমা দিন',
      backToHome: 'হোমে ফিরুন',
      success: 'সফলভাবে আবেদন জমা হয়েছে!',
      successMessage: 'আপনার আবেদন পর্যালোচনার জন্য পাঠানো হয়েছে। অনুমোদনের পর আপনি ইমেইলে জানানো হবে।'
    },
    en: {
      title: 'Service Provider Registration',
      subtitle: 'Join our platform and provide your services',
      personalInfo: 'Personal Information',
      professionalInfo: 'Professional Information',
      name: 'Name (Bengali)',
      nameEn: 'Name (English)',
      phone: 'Phone Number',
      email: 'Email',
      category: 'Service Category',
      location: 'Location (Bengali)',
      locationEn: 'Location (English)',
      experience: 'Experience (Years)',
      price: 'Price Range (Bengali)',
      priceEn: 'Price Range (English)',
      description: 'About Yourself (Bengali)',
      descriptionEn: 'About Yourself (English)',
      specialties: 'Specialties (Bengali)',
      specialtiesEn: 'Specialties (English)',
      submit: 'Submit Application',
      backToHome: 'Back to Home',
      success: 'Application Submitted Successfully!',
      successMessage: 'Your application has been sent for review. You will be notified via email once approved.'
    }
  };

  const categories = [
    { id: 'electrician', name: { bn: 'ইলেকট্রিশিয়ান', en: 'Electrician' } },
    { id: 'plumber', name: { bn: 'প্লাম্বার', en: 'Plumber' } },
    { id: 'ac-repair', name: { bn: 'AC মিস্ত্রি', en: 'AC Repair' } },
    { id: 'doctor', name: { bn: 'ডাক্তার', en: 'Doctor' } },
    { id: 'mechanic', name: { bn: 'মেকানিক', en: 'Mechanic' } },
    { id: 'cleaner', name: { bn: 'পরিচ্ছন্নতাকারী', en: 'Cleaner' } },
    { id: 'painter', name: { bn: 'রং মিস্ত্রি', en: 'Painter' } }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send data to backend
    console.log('Provider registration data:', formData);
    
    // Simulate submission
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {text[language].success}
            </h2>
            <p className="text-gray-600 mb-6">
              {text[language].successMessage}
            </p>
            <Link to="/">
              <Button className="w-full">
                {text[language].backToHome}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {text[language].title}
          </h1>
          <p className="text-gray-600">
            {text[language].subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {text[language].personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{text[language].name}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nameEn">{text[language].nameEn}</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange('nameEn', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">{text[language].phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{text[language].email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {text[language].professionalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">{text[language].category}</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="সেবার ধরন নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">{text[language].experience}</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">{text[language].location}</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="locationEn">{text[language].locationEn}</Label>
                  <Input
                    id="locationEn"
                    value={formData.locationEn}
                    onChange={(e) => handleInputChange('locationEn', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">{text[language].price}</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="৳৫০০-১৫০০"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priceEn">{text[language].priceEn}</Label>
                  <Input
                    id="priceEn"
                    value={formData.priceEn}
                    onChange={(e) => handleInputChange('priceEn', e.target.value)}
                    placeholder="৳500-1500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="description">{text[language].description}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="descriptionEn">{text[language].descriptionEn}</Label>
                  <Textarea
                    id="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialties">{text[language].specialties}</Label>
                  <Input
                    id="specialties"
                    value={formData.specialties}
                    onChange={(e) => handleInputChange('specialties', e.target.value)}
                    placeholder="কমা দিয়ে আলাদা করুন"
                  />
                </div>
                <div>
                  <Label htmlFor="specialtiesEn">{text[language].specialtiesEn}</Label>
                  <Input
                    id="specialtiesEn"
                    value={formData.specialtiesEn}
                    onChange={(e) => handleInputChange('specialtiesEn', e.target.value)}
                    placeholder="Separate with commas"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Link to="/" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1">
              {text[language].submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegistration;
