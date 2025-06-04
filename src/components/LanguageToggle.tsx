
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  setLanguage
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      {language === 'bn' ? 'English' : 'বাংলা'}
    </Button>
  );
};
