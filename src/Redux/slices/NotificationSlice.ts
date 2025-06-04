import { NutritionResponse } from "../../Typings/apiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface NotificationSliceState {
  notification: boolean;
}

// Define the initial state using that type
const initialState: NotificationSliceState = {
  notification: false,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<boolean>) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
