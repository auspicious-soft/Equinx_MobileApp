import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import InfoScreen from "../Screens/infoScreen";
import NotificationTestScreen from "../Screens/NotificationTestScreen";
import PlanScreen from "../Screens/PlanScreen";
import QuestionScreen from "../Screens/QuestionScreen";
import Splash from "../Screens/Splash";
import {
    AuthStackParams,
    BottomTabParams,
    MainStackParams,
    OnBoardingStackParams,
    RootStackParams,
} from "../Typings/route";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const OnBoarding = createNativeStackNavigator<OnBoardingStackParams>();
const Tabs = createBottomTabNavigator<BottomTabParams>();
const Main = createNativeStackNavigator<MainStackParams>(); // Create Drawer Navigator

const Routing = () => {
  //   function AuthStack() {
  //     return (
  //       <Auth.Navigator
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //       >
  //         <Auth.Screen name="welcome" component={Welcome} />
  //         <Auth.Screen name="signIn" component={SignIn} />
  //         <Auth.Screen name="signUp" component={SignUp} />
  //         <Auth.Screen name="forgotpassword" component={ForgotPassword} />
  //         <Auth.Screen name="resetPassword" component={ResetPassword} />
  //       </Auth.Navigator>
  //     );
  //   }

  function OnBoardingStack() {
    return (
      <OnBoarding.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <OnBoarding.Screen name="infoScreen" component={InfoScreen} />
        <OnBoarding.Screen name="questionScreen" component={QuestionScreen} />
        <OnBoarding.Screen name="planScreen" component={PlanScreen} />
        <OnBoarding.Screen
          name="notificationTest"
          component={NotificationTestScreen}
        />
      </OnBoarding.Navigator>
    );
  }

  //   function TabStack() {
  //     return (
  //       <Tabs.Navigator
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //         tabBar={(props) => <BottomTabBar {...props} />}
  //       >
  //         <Tabs.Screen
  //           options={{
  //             title: "HOME",
  //           }}
  //           name="HOME"
  //           component={HOME}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "PLAN",
  //           }}
  //           name="PLAN"
  //           component={PLAN}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "STATS",
  //           }}
  //           name="STATS"
  //           component={STATS}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "INSIGHT",
  //           }}
  //           name="INSIGHT"
  //           component={INSIGHT}
  //         />
  //         <Tabs.Screen
  //           options={{
  //             title: "SETTINGS",
  //           }}
  //           name="SETTINGS"
  //           component={SETTINGS}
  //         />
  //       </Tabs.Navigator>
  //     );
  //   }

  //   function MianStack() {
  //     return (
  //       <Main.Navigator
  //         screenOptions={{
  //           headerShown: false,
  //         }}
  //       >
  //         <Main.Screen name="tabs" component={TabStack} />
  //         <Main.Screen name="mealDetails" component={MealDetails} />
  //       </Main.Navigator>
  //     );
  //   }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <RootStack.Screen name="splash" component={Splash} />
      <RootStack.Screen name="onBoardingStack" component={OnBoardingStack} />
      {/* <RootStack.Screen name="authStack" component={AuthStack} /> */}
      {/* <RootStack.Screen name="mainStack" component={MianStack} /> */}
    </RootStack.Navigator>
  );
};

export default Routing;
