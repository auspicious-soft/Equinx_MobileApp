import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PricePlan } from "../../Typings/apiResponse";

// Define a type for the slice state
interface PricePlanSliceState {
  plansPrices: PricePlan[];
}

// Define the initial state using that type
const initialState: PricePlanSliceState = {
  plansPrices: [],
};

export const GetPricePlanSlice = createSlice({
  name: "planPrices",
  initialState,
  reducers: {
    setPricePlan: (state, action: PayloadAction<PricePlan[]>) => {
      state.plansPrices = action.payload;
    },
  },
});

export const { setPricePlan } = GetPricePlanSlice.actions;

export default GetPricePlanSlice.reducer;
