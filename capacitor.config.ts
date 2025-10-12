import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.urbannest.app',
  appName: 'UrbanNest',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // For development - use your network IP
    url: 'http://192.168.2.117:8080',
    cleartext: true
  }
};

export default config;
