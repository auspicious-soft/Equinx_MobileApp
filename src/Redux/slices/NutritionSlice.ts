import { NutritionResponse } from "../../Typings/apiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface NutritionSliceState {
  nutrition: NutritionResponse | null;
}

// Define the initial state using that type
const initialState: NutritionSliceState = {
  nutrition: null,
};

export const GetNutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    setNutrition: (state, action: PayloadAction<NutritionResponse>) => {
      state.nutrition = action.payload;
    },
  },
});

export const { setNutrition } = GetNutritionSlice.actions;

export default GetNutritionSlice.reducer;
