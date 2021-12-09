import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";

const setUpState = {
  postArgs: {
    Title: "",
    Image: "",
    UserID: "",
    Date: "",
    Type: "",
  },
  postLists: [],
};

export const PostSlice = createSlice({
  name: "post",
  initialState: {
    value: setUpState,
  },
  reducers: {
    sendPost: (state) => {
      instance.post("/manage_posts", state.value.postArgs).then((result) => {
        if (result.data.Error !== null) {
          alert(result.data.Message);
        }
      });

      // Format data
      state.value.postArgs = setUpState.postArgs;
    },
    initializePost: (state, action) => {
      state.value.postArgs = action.payload;
    },
    setListPosts: (state, actions) => {
      state.value.postLists = actions.payload;
    },
  },
});

export const { sendPost, initializePost, setListPosts } = PostSlice.actions;

export default PostSlice.reducer;
