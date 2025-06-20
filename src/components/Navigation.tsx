
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, User, Settings, LogOut, Home, Users, Briefcase, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { useAdminRoles } from '@/hooks/useAdminRoles';
import NotificationCenter from './NotificationCenter';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const { isAdmin } = useAdminRoles();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { path: '/', label: 'হোম', icon: Home, show: true },
    { path: '/admin', label: 'অ্যাডমিন', icon: Shield, show: isAdmin },
    { path: '/provider-dashboard', label: 'প্রোভাইডার', icon: Briefcase, show: user },
    { path: '/provider-registration', label: 'রেজিস্ট্রেশন', icon: Users, show: true },
  ].filter(item => item.show);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">ডায়াল ফর হেল্প</h1>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex ml-10 space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side - Notifications and User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              )}

              {/* User Menu */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="hidden md:block text-sm text-gray-700">
                    {user.email}
                  </span>
                  {isAdmin && (
                    <Badge variant="secondary" className="hidden md:flex">
                      <Shield className="w-3 h-3 mr-1" />
                      অ্যাডমিন
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    <span className="hidden md:block">লগআউট</span>
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button size="sm" className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    লগইন
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="flex flex-col space-y-4 mt-8">
                      {user && (
                        <div className="pb-4 border-b">
                          <p className="text-sm text-gray-600">{user.email}</p>
                          {isAdmin && (
                            <Badge variant="secondary" className="mt-1">
                              <Shield className="w-3 h-3 mr-1" />
                              অ্যাডমিন
                            </Badge>
                          )}
                        </div>
                      )}
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                              isActive
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.label}
                          </Link>
                        );
                      })}
                      {user && (
                        <Button
                          variant="ghost"
                          onClick={handleSignOut}
                          className="flex items-center justify-start px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          লগআউট
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
};

export default Navigation;
