
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e58904a103004846bb2a4715877c9e83',
  appName: 'ai-edu-navigator',
  webDir: 'dist',
  server: {
    url: 'https://e58904a1-0300-4846-bb2a-4715877c9e83.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#061933",
      splashImmersive: true,
      splashFullScreen: true,
    },
  },
};

export default config;
