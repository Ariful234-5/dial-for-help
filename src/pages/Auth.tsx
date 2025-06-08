
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!loginEmail || !loginPassword) {
      setError('ইমেইল এবং পাসওয়ার্ড প্রয়োজন');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn(loginEmail, loginPassword);
      if (result.error) {
        if (result.error.message.includes('Invalid login credentials')) {
          setError('ভুল ইমেইল বা পাসওয়ার্ড');
        } else {
          setError('লগইন করতে সমস্যা হয়েছে');
        }
      }
    } catch (err: any) {
      setError('লগইন করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!signupEmail || !signupPassword || !confirmPassword) {
      setError('সব ক্ষেত্র পূরণ করুন');
      setLoading(false);
      return;
    }

    if (signupPassword !== confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না');
      setLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      setLoading(false);
      return;
    }

    try {
      const result = await signUp(signupEmail, signupPassword);
      if (result.error) {
        if (result.error.message.includes('already registered')) {
          setError('এই ইমেইল দিয়ে ইতিমধ্যে একাউন্ট আছে');
        } else {
          setError('একাউন্ট তৈরি করতে সমস্যা হয়েছে');
        }
      } else {
        setError('');
        // Show success message or handle successful signup
      }
    } catch (err: any) {
      setError('একাউন্ট তৈরি করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            ডায়াল ফর হেল্প
          </CardTitle>
          <p className="text-gray-600">আপনার একাউন্টে প্রবেশ করুন</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">লগইন</TabsTrigger>
              <TabsTrigger value="signup">সাইন আপ</TabsTrigger>
            </TabsList>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">ইমেইল</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="আপনার ইমেইল"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">পাসওয়ার্ড</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="আপনার পাসওয়ার্ড"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">ইমেইল</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="আপনার ইমেইল"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">পাসওয়ার্ড</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">পাসওয়ার্ড নিশ্চিত করুন</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="পাসওয়ার্ড আবার লিখুন"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'একাউন্ট তৈরি হচ্ছে...' : 'একাউন্ট তৈরি করুন'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
