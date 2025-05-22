import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { FastsDataResponse } from "../../Typings/apiResponse";

// Define a type for the slice state
interface FastsMealSliceState {
  fastsData: FastsDataResponse | null;
}

// Define the initial state using that type
const initialState: FastsMealSliceState = {
  fastsData: null,
};

export const FastsDataSlice = createSlice({
  name: "fastsData",
  initialState,
  reducers: {
    setFastsData: (state, action: PayloadAction<FastsDataResponse>) => {
      state.fastsData = action.payload;
    },
  },
});

export const { setFastsData } = FastsDataSlice.actions;

export default FastsDataSlice.reducer;
