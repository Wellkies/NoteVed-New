// Assuming your navigationRef has a type definition, for example, NavigationContainerRef from React Navigation
import { NavigationContainerRef } from '@react-navigation/native';
import {navigationRef} from '../../App';

interface PendingNavigation {
  screenName: string;
  params?: object;
}

let pendingNavigation: PendingNavigation | null = null;

function navigateToScreen(screenName: string, params?: object) {
  if (navigationRef.current) {
    (navigationRef.current).navigate(
      screenName,
      params,
    );
  } else {
    pendingNavigation = {screenName, params};
  }
}

function handleNavigationRefAvailable() {
  if (pendingNavigation) {
    const {screenName, params} = pendingNavigation;

    navigateToScreen(screenName, params);
    pendingNavigation = null;
  }
}

export {navigateToScreen, handleNavigationRefAvailable};
