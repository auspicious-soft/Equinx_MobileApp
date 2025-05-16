import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { HomeDataResponse } from "../../Typings/apiResponse";

// Define a type for the slice state
interface HomeSliceState {
  homeData: HomeDataResponse | null;
}

// Define the initial state using that type
const initialState: HomeSliceState = {
  homeData: null,
};

export const HomeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    setHomeData: (state, action: PayloadAction<HomeDataResponse>) => {
      state.homeData = action.payload;
    },
  },
});

export const { setHomeData } = HomeDataSlice.actions;

export default HomeDataSlice.reducer;
