import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user_reducer";
import postReducer from "./features/post_reducer";
import requestReducer from "./features/request_reducer";
import messageReducer from "./features/message_reducer";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    request: requestReducer,
    message: messageReducer,
  },
});
