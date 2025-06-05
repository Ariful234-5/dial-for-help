import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, MapPin, Phone, MessageCircle, Filter, Search, Clock, Shield, Zap, Users, Award, Globe, Settings, User } from 'lucide-react';
import { ServiceProviderCard } from "@/components/ServiceProviderCard";
import { ServiceProviderProfile } from "@/components/ServiceProviderProfile";
import { LocationPicker } from "@/components/LocationPicker";
import { ChatWindow } from "@/components/ChatWindow";
import { AdvancedBookingModal } from "@/components/AdvancedBookingModal";
import { EmergencyService } from "@/components/EmergencyService";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ServiceHistory } from "@/components/ServiceHistory";
import { Link } from "react-router-dom";

const Index = () => {
  // ... keep existing code (state variables, text object, categories, serviceProviders)
  
  const [language, setLanguage] = useState('bn');
  const [location, setLocation] = useState({ lat: 23.8103, lng: 90.4125, address: "ঢাকা, বাংলাদেশ" });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxDistance, setMaxDistance] = useState([10]);
  const [minRating, setMinRating] = useState([4]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const text = {
    bn: {
      title: "Pro Local Connect",
      subtitle: "আপনার এলাকার সেরা সেবা প্রদানকারীদের খুঁজে নিন",
      search: "সেবা খুঁজুন...",
      categories: "বিভাগসমূহ",
      filters: "ফিল্টার",
      distance: "দূরত্ব",
      rating: "রেটিং",
      verifiedOnly: "শুধু যাচাইকৃত",
      available: "উপলব্ধ",
      busy: "ব্যস্ত",
      offline: "অফলাইন",
      emergency: "জরুরি সাহায্য",
      chat: "চ্যাট",
      book: "বুক করুন",
      reviews: "রিভিউ",
      experience: "অভিজ্ঞতা",
      years: "বছর",
      admin: "অ্যাডমিন",
      provider: "প্রদানকারী",
      profile: "প্রোফাইল"
    },
    en: {
      title: "Pro Local Connect",
      subtitle: "Find the best service providers in your area",
      search: "Search services...",
      categories: "Categories",
      filters: "Filters",
      distance: "Distance",
      rating: "Rating",
      verifiedOnly: "Verified Only",
      available: "Available",
      busy: "Busy",
      offline: "Offline",
      emergency: "Emergency Help",
      chat: "Chat",
      book: "Book Now",
      reviews: "Reviews",
      experience: "Experience",
      years: "years",
      admin: "Admin",
      provider: "Provider",
      profile: "Profile"
    }
  };

  const categories = [
    { id: 'all', name: { bn: 'সব', en: 'All' }, icon: '🔧' },
    { id: 'electrician', name: { bn: 'ইলেকট্রিশিয়ান', en: 'Electrician' }, icon: '⚡' },
    { id: 'plumber', name: { bn: 'প্লাম্বার', en: 'Plumber' }, icon: '🔧' },
    { id: 'ac-repair', name: { bn: 'AC মিস্ত্রি', en: 'AC Repair' }, icon: '❄️' },
    { id: 'doctor', name: { bn: 'ডাক্তার', en: 'Doctor' }, icon: '👨‍⚕️' },
    { id: 'mechanic', name: { bn: 'মেকানিক', en: 'Mechanic' }, icon: '🔩' },
    { id: 'cleaner', name: { bn: 'পরিচ্ছন্নতাকারী', en: 'Cleaner' }, icon: '🧹' },
    { id: 'painter', name: { bn: 'রং মিস্ত্রি', en: 'Painter' }, icon: '🎨' }
  ];

  const serviceProviders = [
    {
      id: 1,
      name: "রহিম উদ্দিন",
      nameEn: "Rahim Uddin",
      category: "electrician",
      rating: 4.8,
      reviews: 127,
      experience: 8,
      location: "ধানমন্ডি",
      locationEn: "Dhanmondi",
      distance: 2.3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
      available: true,
      price: "৳৫০০-১৫০০",
      priceEn: "৳500-1500",
      specialties: ["ঘরোয়া ওয়্যারিং", "ফ্যান ইনস্টল", "সুইচবোর্ড"],
      specialtiesEn: ["Home Wiring", "Fan Installation", "Switchboard"]
    },
    {
      id: 2,
      name: "ডা. ফাতেমা খাতুন",
      nameEn: "Dr. Fatema Khatun",
      category: "doctor",
      rating: 4.9,
      reviews: 89,
      experience: 12,
      location: "গুলশান",
      locationEn: "Gulshan",
      distance: 4.1,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      verified: true,
      available: false,
      price: "৳৮০০-২০০০",
      priceEn: "৳800-2000",
      specialties: ["সাধারণ চিকিৎসা", "শিশু রোগ", "জ্বর কাশি"],
      specialtiesEn: ["General Medicine", "Pediatrics", "Fever & Cough"]
    },
    {
      id: 3,
      name: "করিম মিয়া",
      nameEn: "Karim Mia",
      category: "plumber",
      rating: 4.6,
      reviews: 156,
      experience: 6,
      location: "মিরপুর",
      locationEn: "Mirpur",
      distance: 3.7,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      available: true,
      price: "৳৩০০-১২০০",
      priceEn: "৳300-1200",
      specialties: ["পানির লাইন", "বাথরুম ফিক্স", "ড্রেনেজ"],
      specialtiesEn: ["Water Line", "Bathroom Fix", "Drainage"]
    },
    {
      id: 4,
      name: "হাসান আলী",
      nameEn: "Hasan Ali",
      category: "ac-repair",
      rating: 4.7,
      reviews: 93,
      experience: 5,
      location: "উত্তরা",
      locationEn: "Uttara",
      distance: 6.2,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      verified: false,
      available: true,
      price: "৳৬০০-২৫০০",
      priceEn: "৳600-2500",
      specialties: ["AC সার্ভিসিং", "রেফ্রিজারেটর", "কুলার"],
      specialtiesEn: ["AC Servicing", "Refrigerator", "Cooler"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProviders = serviceProviders.filter(provider => {
    const categoryMatch = selectedCategory === 'all' || provider.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    const distanceMatch = provider.distance <= maxDistance[0];
    const ratingMatch = provider.rating >= minRating[0];
    const verifiedMatch = !showVerifiedOnly || provider.verified;
    
    return categoryMatch && searchMatch && distanceMatch && ratingMatch && verifiedMatch;
  });

  const handleChat = (provider) => {
    setSelectedProvider(provider);
    setShowChatModal(true);
  };

  const handleBooking = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleProfileView = (provider) => {
    setSelectedProvider(provider);
    setShowProfileModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{text[language].title}</h1>
                <p className="text-sm text-gray-600">{text[language].subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString('bn-BD')}
              </div>
              
              {/* Navigation Links */}
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  {text[language].admin}
                </Button>
              </Link>
              
              <Link to="/provider-dashboard">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {text[language].provider}
                </Button>
              </Link>
              
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <EmergencyService language={language} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {text[language].filters}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Picker */}
                <LocationPicker 
                  location={location} 
                  setLocation={setLocation}
                  language={language}
                />

                {/* Distance Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {text[language].distance}: {maxDistance[0]} km
                  </label>
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {text[language].rating}: {minRating[0]}+ ⭐
                  </label>
                  <Slider
                    value={minRating}
                    onValueChange={setMinRating}
                    max={5}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Verified Only Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={showVerifiedOnly}
                    onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="verified" className="text-sm font-medium">
                    {text[language].verifiedOnly}
                  </label>
                </div>

                {/* Service History */}
                <ServiceHistory language={language} />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={text[language].search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">{text[language].categories}</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <span>{category.icon}</span>
                    {category.name[language]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Service Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <div key={provider.id} onClick={() => handleProfileView(provider)} className="cursor-pointer">
                  <ServiceProviderCard
                    provider={provider}
                    language={language}
                    text={text}
                    onChat={handleChat}
                    onBook={handleBooking}
                  />
                </div>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  {language === 'bn' ? 'কোনো সেবা প্রদানকারী পাওয়া যায়নি' : 'No service providers found'}
                </h3>
                <p className="text-gray-400">
                  {language === 'bn' ? 'ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন' : 'Try adjusting your filters'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Provider Profile Modal */}
      {showProfileModal && selectedProvider && (
        <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
            <ServiceProviderProfile
              provider={selectedProvider}
              language={language}
              onChat={() => {
                setShowProfileModal(false);
                handleChat(selectedProvider);
              }}
              onBook={() => {
                setShowProfileModal(false);
                handleBooking(selectedProvider);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedProvider && (
        <ChatWindow
          provider={selectedProvider}
          language={language}
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
        />
      )}

      {/* Advanced Booking Modal */}
      {showBookingModal && selectedProvider && (
        <AdvancedBookingModal
          provider={selectedProvider}
          language={language}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
