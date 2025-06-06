
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceProvider {
  id: string;
  name: string;
  name_en: string;
  category: string;
  rating: number;
  reviews_count: number;
  experience: number;
  location: string;
  location_en: string;
  distance?: number;
  image?: string;
  verified: boolean;
  available: boolean;
  price: string;
  price_en: string;
  specialties: string[];
  specialties_en: string[];
  phone: string;
  description?: string;
  description_en?: string;
}

export const useServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      setProviders(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return {
    providers,
    loading,
    error,
    refetch: fetchProviders,
  };
};
