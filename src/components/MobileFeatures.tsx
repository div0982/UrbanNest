import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { triggerHaptic, isNativePlatform, getPlatform } from '@/capacitor';

export const MobileFeatures: React.FC = () => {
  const handleHapticTest = async () => {
    await triggerHaptic();
  };

  const platform = getPlatform();
  const isNative = isNativePlatform();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mobile Features</CardTitle>
        <CardDescription>
          Test Capacitor mobile features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p><strong>Platform:</strong> {platform}</p>
          <p><strong>Native:</strong> {isNative ? 'Yes' : 'No'}</p>
        </div>
        
        <Button 
          onClick={handleHapticTest}
          className="w-full mobile-button"
          disabled={!isNative}
        >
          Test Haptic Feedback
        </Button>
        
        {!isNative && (
          <p className="text-xs text-muted-foreground text-center">
            Haptic feedback only works on mobile devices
          </p>
        )}
      </CardContent>
    </Card>
  );
};



