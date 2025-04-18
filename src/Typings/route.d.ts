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
  otp: undefined;
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
};

export type BottomTabParams = {
  HOME: undefined;
  PLAN: undefined;
  STATS: undefined;
  INSIGHT: undefined;
  SETTINGS: undefined;
};

// Splash Screens
export type SplashProps = NativeStackScreenProps<RootStackParams, "splash">;
export type InfoScreenProps = NativeStackScreenProps<
  RootStackParams & OnBoardingStackParams,
  "infoScreen"
>;

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
