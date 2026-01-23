import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cheeseburger.factory',
  appName: 'Cheeseburger Factory',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#EF4444", // Red color matching your brand
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: 'light',
      backgroundColor: "#EF4444"
    },
    // Google Sign-In configuration
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  },
  // iOS specific configuration
  ios: {
    contentInset: 'automatic',
    scheme: 'Cheeseburger Factory'
  },
  // Android specific configuration
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false // Set to true during development
  }
};

export default config;
