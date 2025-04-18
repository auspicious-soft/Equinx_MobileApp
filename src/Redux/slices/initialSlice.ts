import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface initialSlice {
  currentRoute: string | null;
}

// Define the initial state using that type
const initialState: initialSlice = {
  currentRoute: null,
};

export const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<string | null>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setCurrentRoute } = initialSlice.actions;

export default initialSlice.reducer;
