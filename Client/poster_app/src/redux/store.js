import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user_reducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
