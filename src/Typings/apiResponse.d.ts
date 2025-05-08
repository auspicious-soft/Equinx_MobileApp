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
