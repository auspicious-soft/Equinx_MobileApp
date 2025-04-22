import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import initialReducer from "./slices/initialSlice";
import modalReducer from "./slices/modalSlice";
import questionReducer from "./slices/questionSlice";

export const store = configureStore({
  reducer: {
    initial: initialReducer,
    modals: modalReducer,
    questions: questionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
