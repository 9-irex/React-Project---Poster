import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";

const defState = {
  setMessage: {
    Type: "",
    From: "",
    To: "",
    _Date: "",
    GroupID: "",
    Message: "",
  },
};

export const MessageSlice = createSlice({
  name: "message",
  initialState: {
    value: defState,
  },
  reducers: {
    initMessage: (state, action) => {
      state.value.setMessage = action.payload;
    },
    newMessage: (state) => {
      console.log("Reached");
      instance.post("/send_message", state.value.setMessage, (result) => {
        if (result.data.Error !== null) {
          console.log(result.data.Error);
        }
      });
    },
  },
});

export const { initMessage, newMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
