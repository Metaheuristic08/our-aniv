import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ouranniv.app',
  appName: 'Our Anniversary',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      style: 'dark',
      backgroundColor: '#ee2b8c'
    }
  }
};

export default config;
