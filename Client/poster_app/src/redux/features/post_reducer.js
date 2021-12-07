import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";

const defaultState = {
  Title: "",
  Image: "",
  UserID: "",
  Date: "",
  Type: "",
};

export const PostSlice = createSlice({
  name: "Posts",
  initialState: {
    value: defaultState,
  },
  reducers: {
    sendPost: (state) => {
      instance.post("/posts", state.value).then((result) => {
        if (result.data.Error !== null) {
          alert(result.data.Message);
        }
      });
      state.value = defaultState;
    },
    initializePost: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { sendPost, initializePost } = PostSlice.actions;

export default PostSlice.reducer;
