
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.be11a2c65ecf4b078b794dc66521a1e3',
  appName: 'dial-for-help',
  webDir: 'dist',
  server: {
    url: 'https://be11a2c6-5ecf-4b07-8b79-4dc66521a1e3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
