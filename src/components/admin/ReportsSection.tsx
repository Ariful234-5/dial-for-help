
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, DollarSign, Calendar, TrendingUp, Download } from 'lucide-react';
import { Report } from '@/hooks/useReports';
import { getTranslation } from '@/utils/adminTranslations';

interface ReportsSectionProps {
  reports: Report[];
  loading: boolean;
  onReportGeneration: (reportType: string) => void;
  onDownloadReport: (reportId: string) => void;
}

const ReportsSection: React.FC<ReportsSectionProps> = ({
  reports,
  loading,
  onReportGeneration,
  onDownloadReport
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation('systemReports')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onReportGeneration('ব্যবহারকারী রিপোর্ট')}
            disabled={loading}
          >
            <FileText className="w-4 h-4 mr-2" />
            ব্যবহারকারী রিপোর্ট তৈরি করুন
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onReportGeneration('প্রদানকারী রিপোর্ট')}
            disabled={loading}
          >
            <FileText className="w-4 h-4 mr-2" />
            প্রদানকারী রিপোর্ট তৈরি করুন
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onReportGeneration('আর্থিক রিপোর্ট')}
            disabled={loading}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            আর্থিক রিপোর্ট তৈরি করুন
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onReportGeneration('বুকিং রিপোর্ট')}
            disabled={loading}
          >
            <Calendar className="w-4 h-4 mr-2" />
            বুকিং রিপোর্ট তৈরি করুন
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onReportGeneration('কর্মক্ষমতা রিপোর্ট')}
            disabled={loading}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            কর্মক্ষমতা রিপোর্ট তৈরি করুন
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>রিপোর্ট ইতিহাস</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-gray-600">{report.date} • {report.size}</p>
                  <Badge 
                    variant={report.status === 'completed' ? 'secondary' : 'outline'}
                    className="mt-1"
                  >
                    {report.status === 'completed' ? 'সম্পন্ন' : 
                     report.status === 'generating' ? 'তৈরি হচ্ছে' : 'ব্যর্থ'}
                  </Badge>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onDownloadReport(report.id)}
                  disabled={report.status !== 'completed'}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
