import { OnBoardingStackParams } from "./route.d";
import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParams = {
  splash: undefined;
  onBoardingStack: NavigatorScreenParams<OnBoardingStackParams>;
  authStack: NavigatorScreenParams<AuthStackParams>;
  mainStack: NavigatorScreenParams<MainStackParams>;
};

export type OnBoardingStackParams = {
  questionScreen: {
    questionId: number;
    totalQuestions: number;
  };
  infoScreen: {
    index: number;
    nextQuestion: number;
  };
  planScreen: undefined;
  notificationTest: undefined;
};

export type AuthStackParams = {
  login: undefined;
  register: undefined;
  otp: {
    isFrom: "register" | "forgotpassword";
  };
  forgotpassword: undefined;
  createNewPassword: undefined;
};

export type MainStackParams = {
  tabs: NavigatorScreenParams<BottomTabParams>;
  mealDetails: {
    mealId: string;
  };
  programDetails: {
    programId: string;
  };
  programsList: {
    data: any;
    title: string;
  };
  MemberShip: undefined;
  Welcome: undefined;
  Recalculate: undefined;
  profile: undefined;
  Fasts: undefined;
  FastDetails: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  UserMemberShip: undefined;
  LanguageScreen: undefined;
  Sync: undefined;
  LearnFast: undefined;
  Support: undefined;
  Policy: undefined;
};

export type BottomTabParams = {
  home: undefined;
  myPlan: undefined;
  nutrition: undefined;
  chats: undefined;
  settings: undefined;
};

// Splash Screens
export type SplashProps = NativeStackScreenProps<RootStackParams, "splash">;
export type InfoScreenProps = NativeStackScreenProps<
  RootStackParams & OnBoardingStackParams,
  "infoScreen"
>;

// Auth Screens

export type PlanScreenProps = NativeStackScreenProps<
  RootStackParams & OnBoardingStackParams,
  "planScreen"
>;
export type NotificationTestScreenProps = NativeStackScreenProps<
  RootStackParams & OnBoardingStackParams,
  "notificationTest"
>;

export type QuestionScreenProps = NativeStackScreenProps<
  RootStackParams & OnBoardingStackParams,
  "questionScreen"
>;

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParams & MainStackParams & RootStackParams,
  "login"
>;
export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParams,
  "register"
>;
export type OTPScreenProps = NativeStackScreenProps<
  AuthStackParams & MainStackParams,
  "otp"
>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParams,
  "forgotpassword"
>;
export type CreatePasswordScreenProps = NativeStackScreenProps<
  AuthStackParams,
  "createNewPassword"
>;

// Bottom Tab Bars

export type HomeScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "home"
>;
export type MyPlanScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "myPlan"
>;
export type NutritionScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "nutrition"
>;
export type ChatScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "chats"
>;
export type SettingsScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "settings"
>;

// Main Screens

export type MemberShipScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams & RootStackParams,
  "MemberShip"
>;

export type WelcomeScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "Welcome"
>;
export type RecalculateScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "Recalculate"
>;
export type ProfileScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "profile"
>;
export type FastsScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "Fasts"
>;
export type FastDetailsScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "FastDetails"
>;
export type EditProfileScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "EditProfile"
>;
export type ChangePasswordScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "ChangePassword"
>;
export type UserMemberShipScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "UserMemberShip"
>;
export type LanguageScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "LanguageScreen"
>;
export type SyncScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "Sync"
>;
export type LearnFastScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "LearnFast"
>;
export type SupportScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "Support"
>;
export type PolicyScreenProps = NativeStackScreenProps<
  BottomTabParams & MainStackParams,
  "Policy"
>;
