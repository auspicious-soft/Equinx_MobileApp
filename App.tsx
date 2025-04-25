import { NavigationContainer, NavigationState } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import { Appearance, Platform, StatusBar, StatusBarStyle } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { setCurrentRoute } from "./src/Redux/slices/initialSlice";
import { useAppDispatch, useAppSelector } from "./src/Redux/store";
import Routing from "./src/Routes";
import COLORS from "./src/Utilities/Colors";

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
  ];

  console.log(currentRoute);

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

  return (
    <>
      <SafeAreaProvider>
        <StatusBar
          animated={true}
          backgroundColor={statusBarConfig.backgroundColor}
          barStyle={statusBarConfig.barStyle}
          translucent={
            Platform.OS === "android" ? statusBarConfig.translucent : undefined
          }
        />
        <NavigationContainer onStateChange={handleNavigationStateChange}>
          <Routing />
        </NavigationContainer>
      </SafeAreaProvider>
      <Toast />
    </>
  );
};

export default App;
