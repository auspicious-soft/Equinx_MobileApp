import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PricePlan, PricePlanInfoResponse } from "../../Typings/apiResponse";

// Define a type for the slice state
interface PricePlanInfoSliceState {
  planPricesInfo: PricePlanInfoResponse[];
}

// Define the initial state using that type
const initialState: PricePlanInfoSliceState = {
  planPricesInfo: [],
};

export const GetPricePlanInfoSlice = createSlice({
  name: "planPricesInfo",
  initialState,
  reducers: {
    setPricePlanInfo: (
      state,
      action: PayloadAction<PricePlanInfoResponse[]>
    ) => {
      state.planPricesInfo = action.payload;
    },
  },
});

export const { setPricePlanInfo } = GetPricePlanInfoSlice.actions;

export default GetPricePlanInfoSlice.reducer;
