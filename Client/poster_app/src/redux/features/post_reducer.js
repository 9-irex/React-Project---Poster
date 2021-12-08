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

      // Format data
      state.value = defaultState;
    },
    initializePost: (state, action) => {
      state.value = action.payload;
    },
    getPost: (state) => {
      instance.get("/posts").then((result) => {
        console.log(result);
      });

      // Format data
      state.value = defaultState;
    },
  },
});

export const { sendPost, initializePost, getPost } = PostSlice.actions;

export default PostSlice.reducer;
