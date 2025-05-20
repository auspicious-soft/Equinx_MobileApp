import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ChatResponse, HomeDataResponse } from "../../Typings/apiResponse";

// Define a type for the slice state
interface ChatSliceState {
  chatData: ChatResponse | null;
}

// Define the initial state using that type
const initialState: ChatSliceState = {
  chatData: null,
};

export const ChatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setChatData: (state, action: PayloadAction<ChatResponse>) => {
      state.chatData = action.payload;
    },
  },
});

export const { setChatData } = ChatDataSlice.actions;

export default ChatDataSlice.reducer;
