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
}
