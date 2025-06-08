
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Report {
  id: string;
  name: string;
  type: 'user' | 'provider' | 'financial' | 'booking' | 'performance';
  date: string;
  size: string;
  status: 'completed' | 'generating' | 'failed';
  file_url?: string;
  generated_by?: string;
  created_at: string;
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const transformedReports: Report[] = data?.map(report => ({
        id: report.id,
        name: report.name,
        type: report.type as Report['type'],
        date: new Date(report.created_at).toLocaleDateString('bn-BD'),
        size: report.file_size || 'N/A',
        status: report.status as Report['status'],
        file_url: report.file_url,
        generated_by: report.generated_by,
        created_at: report.created_at,
      })) || [];

      setReports(transformedReports);
    } catch (err: any) {
      console.error('Error fetching reports:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: Report['type']) => {
    try {
      setLoading(true);
      
      const reportNames = {
        user: 'ব্যবহারকারী রিপোর্ট',
        provider: 'প্রদানকারী রিপোর্ট',
        financial: 'আর্থিক রিপোর্ট',
        booking: 'বুকিং রিপোর্ট',
        performance: 'কর্মক্ষমতা রিপোর্ট'
      };

      const { data, error: insertError } = await supabase
        .from('reports')
        .insert({
          name: reportNames[type],
          type,
          status: 'generating',
          file_size: 'তৈরি হচ্ছে...'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Simulate completion after 2 seconds
      setTimeout(async () => {
        await supabase
          .from('reports')
          .update({ 
            status: 'completed', 
            file_size: '১.২ MB',
            file_url: `/${type}-report-${Date.now()}.pdf`
          })
          .eq('id', data.id);
        
        fetchReports(); // Refresh the list
      }, 2000);

      await fetchReports(); // Refresh immediately to show generating status
      
      return { success: true };
    } catch (err: any) {
      console.error('Error generating report:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (reportId: string) => {
    try {
      // Simulate download functionality
      console.log('Downloading report:', reportId);
      return { success: true };
    } catch (err: any) {
      console.error('Error downloading report:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    generateReport,
    downloadReport,
    refetch: fetchReports,
  };
};
