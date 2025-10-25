import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  Info,
  ChevronRight 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        {
          label: 'Profile Settings',
          description: 'Manage your personal information',
          onClick: () => navigate('/profile'),
          icon: User,
        },
        {
          label: 'Notifications',
          description: 'Configure notification preferences',
          onClick: () => {},
          icon: Bell,
          badge: 'Coming Soon',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          label: 'Privacy Settings',
          description: 'Control your privacy and data',
          onClick: () => {},
          icon: Shield,
          badge: 'Coming Soon',
        },
      ],
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        {
          label: 'Help Center',
          description: 'Get help and support',
          onClick: () => navigate('/learn-more'),
          icon: HelpCircle,
        },
        {
          label: 'About UrbanNest',
          description: 'Learn more about our platform',
          onClick: () => navigate('/learn-more'),
          icon: Info,
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account preferences and app settings
            </p>
          </div>

          {/* Theme Settings */}
          <div className="mb-8">
            <ThemeToggle />
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settingsSections.map((section, sectionIndex) => {
              const SectionIcon = section.icon;
              
              return (
                <Card key={sectionIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SectionIcon className="h-5 w-5 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {section.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;
                      
                      return (
                        <Button
                          key={itemIndex}
                          variant="ghost"
                          className="w-full h-auto p-4 justify-start gap-3 hover:bg-muted/50"
                          onClick={item.onClick}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <ItemIcon className="h-5 w-5 text-muted-foreground" />
                            <div className="text-left flex-1">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* User Info */}
          {currentUser && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {currentUser.displayName || 'User'}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {currentUser.email}
                  </p>
                  <Badge variant="outline" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Verified Account
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
};

export default SettingsPage;
