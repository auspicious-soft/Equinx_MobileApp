import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SettingResponse } from "../../Typings/apiResponse";

// Define a type for the slice state
interface ChatSliceState {
  settingData: SettingResponse | null;
}

// Define the initial state using that type
const initialState: ChatSliceState = {
  settingData: null,
};

export const SettingDataSlice = createSlice({
  name: "settingData",
  initialState,
  reducers: {
    setSettingData: (state, action: PayloadAction<SettingResponse>) => {
      state.settingData = action.payload;
    },
  },
});

export const { setSettingData } = SettingDataSlice.actions;

export default SettingDataSlice.reducer;
