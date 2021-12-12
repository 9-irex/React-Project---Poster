import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";

const setUpState = {
  postArgs: {
    PostID: "",
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
    likePosts: (state) => {
      instance.post("/like", state.value.postArgs).then((response) => {
        console.log(response);
      });
    },
    unlikePosts: (state) => {
      instance.post("/unlike", state.value.postArgs).then((response) => {
        console.log(response);
      });
    },
    sharePosts: (state) => {
      instance.post("/share", state.value.postArgs);
    },
  },
});

export const {
  sendPost,
  initializePost,
  setListPosts,
  likePosts,
  sharePosts,
  unlikePosts,
} = PostSlice.actions;

export default PostSlice.reducer;
