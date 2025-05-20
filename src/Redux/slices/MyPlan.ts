import { MyPlanApiResponse, MyPlanData } from "../../Typings/apiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface MyPlanSliceState {
  myPlan: MyPlanApiResponse | null;
}

// Define the initial state using that type
const initialState: MyPlanSliceState = {
  myPlan: null,
};

export const GetMyPlanSlice = createSlice({
  name: "myPlan",
  initialState,
  reducers: {
    setMyPlan: (state, action: PayloadAction<MyPlanApiResponse>) => {
      state.myPlan = action.payload;
    },
  },
});

export const { setMyPlan } = GetMyPlanSlice.actions;

export default GetMyPlanSlice.reducer;
