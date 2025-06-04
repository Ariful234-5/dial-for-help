
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, User } from 'lucide-react';

interface ServiceHistoryProps {
  language: string;
}

export const ServiceHistory: React.FC<ServiceHistoryProps> = ({ language }) => {
  const text = {
    bn: {
      history: 'সেবার ইতিহাস',
      recent: 'সাম্প্রতিক সেবা',
      viewAll: 'সব দেখুন',
      completed: 'সম্পন্ন',
      noHistory: 'কোনো ইতিহাস নেই'
    },
    en: {
      history: 'Service History',
      recent: 'Recent Services',
      viewAll: 'View All',
      completed: 'Completed',
      noHistory: 'No History'
    }
  };

  const recentServices = [
    {
      id: 1,
      provider: language === 'bn' ? 'রহিম উদ্দিন' : 'Rahim Uddin',
      service: language === 'bn' ? 'ইলেকট্রিক্যাল' : 'Electrical',
      date: '২০ ডিসেম্বর',
      rating: 5,
      status: 'completed'
    },
    {
      id: 2,
      provider: language === 'bn' ? 'করিম মিয়া' : 'Karim Mia', 
      service: language === 'bn' ? 'প্লাম্বিং' : 'Plumbing',
      date: '১৫ ডিসেম্বর',
      rating: 4,
      status: 'completed'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {text[language].history}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentServices.length > 0 ? (
          <>
            {recentServices.map((service) => (
              <div key={service.id} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-gray-500" />
                    <span className="text-sm font-medium">{service.provider}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {text[language].completed}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-1">{service.service}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{service.date}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < service.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              {text[language].viewAll}
            </Button>
          </>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            {text[language].noHistory}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
