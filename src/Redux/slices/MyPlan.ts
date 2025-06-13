import { MyPlanApiResponse, MyPlanData } from "../../Typings/apiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface MyPlanSliceState {
  myPlan: MyPlanApiResponse | null;
  isRefresh: number;
}

// Define the initial state using that type
const initialState: MyPlanSliceState = {
  myPlan: null,
  isRefresh: 0,
};

export const GetMyPlanSlice = createSlice({
  name: "myPlan",
  initialState,
  reducers: {
    setMyPlan: (state, action: PayloadAction<MyPlanApiResponse>) => {
      state.myPlan = action.payload;
    },
    refreshData: (state) => {
      state.isRefresh = Math.floor(Math.random() * 1000) + 1;
    },
  },
});

export const { setMyPlan, refreshData } = GetMyPlanSlice.actions;

export default GetMyPlanSlice.reducer;
