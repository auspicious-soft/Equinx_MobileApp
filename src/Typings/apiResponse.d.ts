import { MyPlan } from "./apiResponse.d";
export interface GetQuestionDataResponse {
  questions: Question[];
  questionResponse: QuestionResponse[];
}

export interface Question {
  _id: string;
  text: string;
  subtitle: string;
  type: string;
  next: string;
  options: Option[];
  order: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  text: string;
  value: number;
  hasIcon: boolean;
  _id: string;
}

export interface QuestionResponse {
  _id: string;
  deviceId: string;
  userId: any;
  questionId: string;
  order: number;
  selectedOptionValues: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface loginAPiResponse {
  _id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: string;
  profilePic: any;
  emailVerified: boolean;
  authType: string;
  language: string;
  token: string;
  fcmToken: any;
  country: any;
  subscription: boolean;
  isActive: boolean;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface HomeDataResponse {
  fastingStreak: number;
  thisWeekFastingDays: number;
  thisWeekFastingHours: number;
  todaysFastingStatus: boolean;
  weekRange: WeekRange;
  waterIntake: WaterIntake;
}

export interface WeekRange {
  start: string;
  end: string;
}

export interface WaterIntake {
  today: number;
  goal: number;
  containerType: string;
  containerSize: number;
  unit: string;
  progress: number;
  waterReminder: boolen;
}

export interface PricePlan {
  perks: Perks;
  _id: string;
  type: string;
  months: number;
  price: number;
  productId: string;
  priceText: string;
  description: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Perks {
  fastingTimer: string;
  fastingStages: string;
  customFastingGoal: string;
  nutritionScoring: string;
  advancedAnalysis: string;
  learningCenter: string;
}

export interface MyPlanApiResponse {
  hasActivePlan: boolean;
  plan: Plan[];
  essentialTips: EssentialTip[];
}

export interface MyPlanData {
  firstMealStatus: FirstMealStatus;
  secondMealStatus: SecondMealStatus;
  thirdMealStatus: ThirdMealStatus;
  otherMealStatus: OtherMealStatus;
  _id: string;
  userId: string;
  planId: PlanId;
  planDay: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface FirstMealStatus {
  carbs: number;
  protein: number;
  fat: number;
  status: boolean;
}

export interface SecondMealStatus {
  carbs: number;
  protein: number;
  fat: number;
  status: boolean;
}

export interface ThirdMealStatus {
  carbs: number;
  protein: number;
  fat: number;
  status: boolean;
}

export interface OtherMealStatus {
  carbs: number;
  protein: number;
  fat: number;
  status: boolean;
}

export interface PlanId {
  _id: string;
  plan_type: string;
  day: number;
  meals: Meal[];
  total_calories: string;
  __v: number;
}

export interface Meal {
  meal_time: string;
  items: string[];
  calories: string;
  _id: string;
}

export interface EssentialTip {
  _id: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ChatResponse {
  _id: string;
  userId: string;
  role: string;
  modelUsed: string;
  imageUrl: any;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SettingResponse {
  editProfile: EditProfile;
  notification: boolean;
  membership: Membership;
  language: string;
}

export interface EditProfile {
  _id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  profilePic: string;
  gender: string;
  dob: string;
  age: number;
  height: number;
  weight: number;
  bmi: number;
}

export interface Membership {
  _id: string;
  planId: PlanId;
  autoPayment: boolean;
  startDate: string;
  endDate: string;
}

export interface PlanId {
  _id: string;
  type: string;
  months: number;
  price: number;
  productId: string;
  priceText: string;
  description: string;
  perks: Perks;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Perks {
  fastingTimer: string;
  fastingStages: string;
  customFastingGoal: string;
  nutritionScoring: string;
  advancedAnalysis: string;
  learningCenter: string;
}
