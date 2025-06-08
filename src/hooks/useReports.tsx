
import { useState, useEffect } from 'react';

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
      
      // Since reports table doesn't exist, create mock reports
      const mockReports: Report[] = [
        {
          id: '1',
          name: 'ব্যবহারকারী রিপোর্ট',
          type: 'user',
          date: new Date().toLocaleDateString('bn-BD'),
          size: '১.৫ MB',
          status: 'completed',
          file_url: '/user-report.pdf',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'প্রদানকারী রিপোর্ট',
          type: 'provider',
          date: new Date(Date.now() - 86400000).toLocaleDateString('bn-BD'),
          size: '২.১ MB',
          status: 'completed',
          file_url: '/provider-report.pdf',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          name: 'আর্থিক রিপোর্ট',
          type: 'financial',
          date: new Date(Date.now() - 172800000).toLocaleDateString('bn-BD'),
          size: '৮৫০ KB',
          status: 'completed',
          file_url: '/financial-report.pdf',
          created_at: new Date(Date.now() - 172800000).toISOString(),
        }
      ];

      setReports(mockReports);
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

      const newReport: Report = {
        id: Date.now().toString(),
        name: reportNames[type],
        type,
        date: new Date().toLocaleDateString('bn-BD'),
        size: 'তৈরি হচ্ছে...',
        status: 'generating',
        created_at: new Date().toISOString(),
      };

      setReports(prev => [newReport, ...prev]);

      // Simulate completion after 2 seconds
      setTimeout(() => {
        setReports(prev => prev.map(report => 
          report.id === newReport.id 
            ? { 
                ...report, 
                status: 'completed' as const, 
                size: '১.২ MB',
                file_url: `/${type}-report-${Date.now()}.pdf`
              }
            : report
        ));
      }, 2000);
      
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
