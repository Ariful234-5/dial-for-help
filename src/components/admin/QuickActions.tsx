
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Shield, Settings } from 'lucide-react';
import { getTranslation } from '@/utils/adminTranslations';

interface QuickActionsProps {
  onReportGeneration: (reportType: string) => void;
  onSystemAction: (action: string) => void;
  reportsLoading: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onReportGeneration, onSystemAction, reportsLoading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>দ্রুত কার্যক্রম</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          size="sm"
          onClick={() => onReportGeneration('ব্যবহারকারী রিপোর্ট')}
          disabled={reportsLoading}
        >
          <FileText className="w-4 h-4 mr-2" />
          {getTranslation('generateReport')}
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          size="sm"
          onClick={() => onSystemAction('তথ্য রপ্তানি')}
        >
          <Download className="w-4 h-4 mr-2" />
          {getTranslation('exportData')}
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          size="sm"
          onClick={() => onSystemAction('ব্যাকআপ তৈরি')}
        >
          <Shield className="w-4 h-4 mr-2" />
          ব্যাকআপ তৈরি
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          size="sm"
          onClick={() => onSystemAction('সিস্টেম সেটিংস')}
        >
          <Settings className="w-4 h-4 mr-2" />
          সিস্টেম সেটিংস
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
