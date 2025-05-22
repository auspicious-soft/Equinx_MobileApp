import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProfileResponse } from "../../Typings/apiResponse";

// Define a type for the slice state
interface ProfileSliceState {
  profileData: ProfileResponse | null;
}

// Define the initial state using that type
const initialState: ProfileSliceState = {
  profileData: null,
};

export const ProfileDataSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileResponse>) => {
      state.profileData = action.payload;
    },
  },
});

export const { setProfileData } = ProfileDataSlice.actions;

export default ProfileDataSlice.reducer;
