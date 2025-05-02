import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreatePassword from "../Screens/CreatePassword";
import ForgotPassword from "../Screens/ForgotPassword";
import InfoScreen from "../Screens/infoScreen";
import Login from "../Screens/Login";
import NotificationTestScreen from "../Screens/NotificationTestScreen";
import Otp from "../Screens/Otp";
import QuestionScreen from "../Screens/QuestionScreen";
import Register from "../Screens/Register";
import Splash from "../Screens/Splash";
import {
  AuthStackParams,
  BottomTabParams,
  MainStackParams,
  OnBoardingStackParams,
  RootStackParams,
} from "../Typings/route";
import Home from "../Screens/Home";
import Nutrition from "../Screens/Nutrition";
import Chat from "../Screens/Chat";
import Settings from "../Screens/Settings";
import BottomTabBar from "../Components/BottomBar";
import MyPlan from "../Screens/MyPlan";
import PlanScreen from "../Screens/PlanScreen";
import MemberShip from "../Screens/MemberShipScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import Recalculate from "../Screens/Recalculate";
import Profile from "../Screens/Profile";
import Fasts from "../Screens/Fasts";

const RootStack = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<AuthStackParams>();
const OnBoarding = createNativeStackNavigator<OnBoardingStackParams>();
const Tabs = createBottomTabNavigator<BottomTabParams>();
const Main = createNativeStackNavigator<MainStackParams>(); // Create Drawer Navigator

const Routing = () => {
  function AuthStack() {
    return (
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Auth.Screen name="login" component={Login} />
        <Auth.Screen name="register" component={Register} />
        <Auth.Screen name="otp" component={Otp} />
        <Auth.Screen name="forgotpassword" component={ForgotPassword} />
        <Auth.Screen name="createNewPassword" component={CreatePassword} />
      </Auth.Navigator>
    );
  }

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

  function TabStack() {
    return (
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <BottomTabBar {...props} />}
      >
        <Tabs.Screen
          options={{
            title: "HOME",
          }}
          name="home"
          component={Home}
        />
        <Tabs.Screen
          options={{
            title: "PLAN",
          }}
          name="myPlan"
          component={MyPlan}
        />
        <Tabs.Screen
          options={{
            title: "NUTRITION",
          }}
          name="nutrition"
          component={Nutrition}
        />
        <Tabs.Screen
          options={{
            title: "CHATS",
          }}
          name="chats"
          component={Chat}
        />
        <Tabs.Screen
          options={{
            title: "SETTINGS",
          }}
          name="settings"
          component={Settings}
        />
      </Tabs.Navigator>
    );
  }

  function MainStack() {
    return (
      <Main.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Main.Screen name="tabs" component={TabStack} />
        {/* <Main.Screen name="mealDetails" component={MealDetails} /> */}
        <Main.Screen name="MemberShip" component={MemberShip} />
        <Main.Screen name="Welcome" component={WelcomeScreen} />
        <Main.Screen name="Recalculate" component={Recalculate} />
        <Main.Screen name="profile" component={Profile} />
        <Main.Screen name="Fasts" component={Fasts} />
      </Main.Navigator>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="splash" component={Splash} />
      <RootStack.Screen name="onBoardingStack" component={OnBoardingStack} />
      <RootStack.Screen name="authStack" component={AuthStack} />
      <RootStack.Screen name="mainStack" component={MainStack} />
    </RootStack.Navigator>
  );
};

export default Routing;
