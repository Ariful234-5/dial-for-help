
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceProvider {
  id: string;
  name: string;
  name_en: string;
  category: string;
  location: string;
  location_en: string;
  experience: number;
  rating: number;
  reviews_count?: number;
  phone: string;
  price: string;
  price_en: string;
  image?: string;
  description?: string;
  description_en?: string;
  specialties?: string[];
  specialties_en?: string[];
  available: boolean;
  verified: boolean;
  distance?: number;
  status?: string;
  created_at: string;
  updated_at: string;
}

export const useServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('service_providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const transformedProviders: ServiceProvider[] = data?.map(provider => ({
        id: provider.id,
        name: provider.name,
        name_en: provider.name_en,
        category: provider.category,
        location: provider.location,
        location_en: provider.location_en,
        experience: provider.experience,
        rating: provider.rating || 0,
        reviews_count: provider.reviews_count || 0,
        phone: provider.phone,
        price: provider.price,
        price_en: provider.price_en,
        image: provider.image,
        description: provider.description,
        description_en: provider.description_en,
        specialties: provider.specialties || [],
        specialties_en: provider.specialties_en || [],
        available: provider.available ?? true,
        verified: provider.verified ?? false,
        distance: provider.distance,
        status: provider.status || 'pending',
        created_at: provider.created_at,
        updated_at: provider.updated_at,
      })) || [];

      setProviders(transformedProviders);
    } catch (err: any) {
      console.error('Error fetching service providers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProviderStatus = async (providerId: string, verified: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('service_providers')
        .update({ verified })
        .eq('id', providerId);

      if (updateError) throw updateError;

      setProviders(prev => prev.map(provider => 
        provider.id === providerId ? { ...provider, verified } : provider
      ));

      return { success: true };
    } catch (err: any) {
      console.error('Error updating provider status:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return {
    providers,
    loading,
    error,
    updateProviderStatus,
    refetch: fetchProviders,
  };
};
