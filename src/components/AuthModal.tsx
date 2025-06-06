
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Phone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, language }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', fullName: '', phone: '' });
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const text = {
    bn: {
      signIn: 'সাইন ইন',
      signUp: 'নিবন্ধন',
      email: 'ইমেইল',
      password: 'পাসওয়ার্ড',
      fullName: 'পূর্ণ নাম',
      phone: 'ফোন নম্বর',
      signInBtn: 'প্রবেশ করুন',
      signUpBtn: 'নিবন্ধন করুন',
      signInSuccess: 'সফলভাবে প্রবেশ করেছেন',
      signUpSuccess: 'সফলভাবে নিবন্ধন হয়েছে',
      error: 'ত্রুটি',
      emailPlaceholder: 'আপনার ইমেইল',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড',
      namePlaceholder: 'আপনার পূর্ণ নাম',
      phonePlaceholder: 'আপনার ফোন নম্বর'
    },
    en: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      phone: 'Phone Number',
      signInBtn: 'Sign In',
      signUpBtn: 'Sign Up',
      signInSuccess: 'Successfully signed in',
      signUpSuccess: 'Successfully signed up',
      error: 'Error',
      emailPlaceholder: 'Your email',
      passwordPlaceholder: 'Your password',
      namePlaceholder: 'Your full name',
      phonePlaceholder: 'Your phone number'
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(signInData.email, signInData.password);
      if (error) throw error;
      
      toast({
        title: text[language].signInSuccess,
        description: "",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: text[language].error,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
      if (error) throw error;
      
      toast({
        title: text[language].signUpSuccess,
        description: "",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: text[language].error,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Pro Local Connect
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{text[language].signIn}</TabsTrigger>
            <TabsTrigger value="signup">{text[language].signUp}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">{text[language].email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder={text[language].emailPlaceholder}
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">{text[language].password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder={text[language].passwordPlaceholder}
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '...' : text[language].signInBtn}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">{text[language].fullName}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={text[language].namePlaceholder}
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">{text[language].email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={text[language].emailPlaceholder}
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">{text[language].password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder={text[language].passwordPlaceholder}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '...' : text[language].signUpBtn}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
