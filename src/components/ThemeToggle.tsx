import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Light',
      icon: Sun,
      description: 'Always use light theme',
    },
    {
      value: 'dark' as const,
      label: 'Dark',
      icon: Moon,
      description: 'Always use dark theme',
    },
    {
      value: 'system' as const,
      label: 'System',
      icon: Monitor,
      description: 'Follow device settings',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            {actualTheme === 'dark' ? (
              <Moon className="h-5 w-5 text-primary" />
            ) : (
              <Sun className="h-5 w-5 text-primary" />
            )}
          </div>
          Theme Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Choose your preferred theme. System theme will automatically follow your device settings.
        </div>
        
        <div className="grid gap-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;
            
            return (
              <Button
                key={option.value}
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "h-auto p-4 justify-start gap-3",
                  isSelected && "ring-2 ring-primary ring-offset-2"
                )}
                onClick={() => setTheme(option.value)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <Check className="h-5 w-5 text-primary-foreground" />
                )}
              </Button>
            );
          })}
        </div>

        {/* Current Status */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current theme:</span>
            <Badge variant="secondary" className="gap-1">
              {actualTheme === 'dark' ? (
                <Moon className="h-3 w-3" />
              ) : (
                <Sun className="h-3 w-3" />
              )}
              {actualTheme === 'dark' ? 'Dark' : 'Light'}
              {theme === 'system' && ' (System)'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeToggle;
