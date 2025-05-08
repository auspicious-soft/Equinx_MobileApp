import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../Typings/apiResponse";

interface ProfileForm {
  gender: string;
  dob: string;
  age: string;
  height: string;
  weight: string;
}

// Define a type for storing answers by question ID
interface QuestionAnswers {
  [questionId: number]: string[];
}

interface QuestionState {
  selectedOptions: string[];
  questionAnswers: QuestionAnswers;
  currentQuestionId: number | null;
  profileForm: ProfileForm;
  weightGoal: string;
  firstMmealTime: string;
  lastMealTime: string;
  questionsData: Question[];
}

const initialState: QuestionState = {
  selectedOptions: [],
  questionAnswers: {},
  currentQuestionId: null,
  profileForm: {
    gender: "",
    dob: "",
    age: "",
    height: "",
    weight: "",
  },
  weightGoal: "",
  firstMmealTime: "",
  lastMealTime: "",
  questionsData: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setCurrentQuestionId(state, action: PayloadAction<number>) {
      state.currentQuestionId = action.payload;
    },
    setSelectedOptions(state, action: PayloadAction<string[]>) {
      state.selectedOptions = action.payload;

      // If we have a current question ID, also store the answer for that specific question
      if (state.currentQuestionId !== null) {
        state.questionAnswers[state.currentQuestionId] = action.payload;
      }
    },
    // Set answers for a specific question ID
    setQuestionAnswer(
      state,
      action: PayloadAction<{ questionId: number; answers: string[] }>
    ) {
      const { questionId, answers } = action.payload;
      state.questionAnswers[questionId] = answers;

      // If this is the current question, also update selectedOptions
      if (state.currentQuestionId === questionId) {
        state.selectedOptions = answers;
      }
    },
    setProfileForm(state, action: PayloadAction<Partial<ProfileForm>>) {
      state.profileForm = { ...state.profileForm, ...action.payload };
    },
    setWeightGoal(state, action: PayloadAction<string>) {
      state.weightGoal = action.payload;
    },
    setFirstMealTime(state, action: PayloadAction<string>) {
      state.firstMmealTime = action.payload;
    },
    setLastMealTime(state, action: PayloadAction<string>) {
      state.lastMealTime = action.payload;
    },
    resetQuestionState(state) {
      state.selectedOptions = initialState.selectedOptions;
      state.questionAnswers = initialState.questionAnswers;
      state.currentQuestionId = initialState.currentQuestionId;
      state.profileForm = initialState.profileForm;
      state.weightGoal = initialState.weightGoal;
      state.firstMmealTime = initialState.firstMmealTime;
      state.lastMealTime = initialState.lastMealTime;
    },
    setQuestionsData(state, action: PayloadAction<Question[]>) {
      state.questionsData = action.payload;
    },
  },
});

export const {
  setCurrentQuestionId,
  setSelectedOptions,
  setQuestionAnswer,
  setProfileForm,
  setWeightGoal,
  setFirstMealTime,
  setLastMealTime,
  resetQuestionState,
  setQuestionsData,
} = questionSlice.actions;

export default questionSlice.reducer;
