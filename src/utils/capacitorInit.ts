
import { App as CapApp } from '@capacitor/app';

export const initializeCapacitor = () => {
  // Add listeners for app events
  CapApp.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active:', isActive);
  });

  CapApp.addListener('backButton', () => {
    console.log('Back button pressed');
    // You can implement custom back button behavior here
  });
};
