import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../Typings/apiResponse";

interface ProfileForm {
  gender: string;
  dob: string;
  age: string;
  height: string;
  weight: string;
}

// Define a type for storing answers and order by question ID
interface QuestionAnswerEntry {
  answers: string[];
  order: number; // Store the question order
}

interface QuestionAnswers {
  [questionId: string]: QuestionAnswerEntry;
}

interface QuestionState {
  selectedOptions: string[];
  questionAnswers: QuestionAnswers;
  currentQuestionId: string | null;
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
    setCurrentQuestionId(state, action: PayloadAction<string>) {
      state.currentQuestionId = action.payload;
    },
    setSelectedOptions(
      state,
      action: PayloadAction<{
        options: string[];
        updateAnswers?: boolean;
      }>
    ) {
      state.selectedOptions = action.payload.options;

      // Only update questionAnswers if explicitly requested
      if (action.payload.updateAnswers && state.currentQuestionId !== null) {
        state.questionAnswers[state.currentQuestionId] = {
          answers: action.payload.options,
          order: state.questionsData.findIndex(
            (q) => q._id === state.currentQuestionId
          ),
        };
      }
    },
    // Set answers for a specific question ID
    setQuestionAnswer(
      state,
      action: PayloadAction<{
        questionId: string;
        answers: string[];
        order?: number; // Optional order parameter
      }>
    ) {
      const { questionId, answers, order } = action.payload;
      const questionOrder =
        order !== undefined
          ? order
          : state.questionsData.findIndex((q) => q._id === questionId);

      state.questionAnswers[questionId] = {
        answers,
        order: questionOrder,
      };

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
