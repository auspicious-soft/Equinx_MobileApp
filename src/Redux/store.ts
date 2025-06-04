import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import initialReducer from "./slices/initialSlice";
import modalReducer from "./slices/modalSlice";
import questionReducer from "./slices/questionSlice";
import homeDataReducer from "./slices/homeDataSlice";
import PlanPricesReducer from "./slices/planPrices";
import MyPlanReducer from "./slices/MyPlan";
import chatDataReducer from "./slices/ChatSlice";
import settingDataReducer from "./slices/settingSlice";
import profileDataReducer from "./slices/ProfileSlice";
import FastsDataSliceReducer from "./slices/DateMeal";
import NutritionReducer from "./slices/NutritionSlice";
import pricePlanInfoReducer from "./slices/planPriceInfo";
import NotificationReducer from "./slices/NotificationSlice";

export const store = configureStore({
  reducer: {
    initial: initialReducer,
    modals: modalReducer,
    questions: questionReducer,
    homeData: homeDataReducer,
    planPrices: PlanPricesReducer,
    myPlan: MyPlanReducer,
    chatData: chatDataReducer,
    settingData: settingDataReducer,
    profileData: profileDataReducer,
    fastsData: FastsDataSliceReducer,
    nutrition: NutritionReducer,
    planPricesInfo: pricePlanInfoReducer,
    notification: NotificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
