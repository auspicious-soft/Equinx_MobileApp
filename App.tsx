import { PUBLISHABLE_KEY } from "@env";
import messaging from "@react-native-firebase/messaging";
import { NavigationContainer, NavigationState } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect, useMemo } from "react";
import {
  Appearance,
  LogBox,
  Platform,
  StatusBar,
  StatusBarStyle,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import NetworkLogger from "./src/Components/NetworkLogger";
import { setCurrentRoute } from "./src/Redux/slices/initialSlice";
import { useAppDispatch, useAppSelector } from "./src/Redux/store";
import Routing from "./src/Routes";
import NotificationService from "./src/Services/NotificationService";
import COLORS from "./src/Utilities/Colors";
import STORAGE_KEYS from "./src/Utilities/Constants";
import { storeLocalStorageData } from "./src/Utilities/Storage";
import { LanguageProvider } from "./src/Context/LanguageContext";

LogBox.ignoreAllLogs(true);

const App = () => {
  const dispatch = useAppDispatch();
  const { currentRoute } = useAppSelector((state) => state.initial);

  const getCurrentRouteName = (state: any): string | null => {
    if (!state) return null;

    const route = state.routes[state.index];
    if (route.state) {
      return getCurrentRouteName(route.state);
    }
    return route.name;
  };

  const handleNavigationStateChange = (
    state: Readonly<NavigationState> | undefined
  ) => {
    const routeName = getCurrentRouteName(state);
    const routeHistory: any = state?.routes.find(
      (item) => item.name === "mainStack"
    )?.state?.history;

    dispatch(setCurrentRoute(routeName));
  };

  const greenRoutes = [
    "splash",
    "infoScreen",
    "planScreen",
    "login",
    "register",
    "forgotpassword",
    "otp",
    "createNewPassword",
    "Welcome",
    "MemberShip",
  ];

  const statusBarConfig = useMemo(() => {
    const isAuthRoute = currentRoute && greenRoutes.includes(currentRoute);

    if (Platform.OS === "ios") {
      return {
        barStyle: "dark-content" as StatusBarStyle,
        backgroundColor: "transparent",
      };
    }

    return {
      barStyle: "dark-content" as StatusBarStyle,
      backgroundColor: currentRoute
        ? isAuthRoute
          ? COLORS.lightGreenGradient.start
          : COLORS.white
        : COLORS.lightGreenGradient.start,
      translucent: true,
    };
  }, [currentRoute]);

  useEffect(() => {
    Appearance.setColorScheme("light");
  }, []);

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("FCM Token:", fcmToken);
        await storeLocalStorageData(STORAGE_KEYS.fcmToken, fcmToken);
      }
    } catch (error) {
      console.log("Error getting FCM token:", error);
    }
  };

  useEffect(() => {
    const initNotifications = async () => {
      await NotificationService.initializeNotifications();
    };
    initNotifications();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("FCM Foreground Message:", remoteMessage);

      const title = remoteMessage.notification?.title || "Notification";
      const body = remoteMessage.notification?.body || "";

      await NotificationService.displayNotification(title, body);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = NotificationService.setupListeners((type, data) => {
      console.log("Notification interaction:", type, data);
      // Handle navigation or other logic based on notification data
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getFcmToken();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <LanguageProvider>
          <StripeProvider publishableKey={PUBLISHABLE_KEY}>
            <StatusBar
              animated={true}
              backgroundColor={statusBarConfig.backgroundColor}
              barStyle={statusBarConfig.barStyle}
              translucent={
                Platform.OS === "android"
                  ? statusBarConfig.translucent
                  : undefined
              }
            />
            <NavigationContainer onStateChange={handleNavigationStateChange}>
              <Routing />
              {__DEV__ && <NetworkLogger />}
            </NavigationContainer>
          </StripeProvider>
        </LanguageProvider>
      </SafeAreaProvider>
      <Toast />
    </>
  );
};

export default App;
