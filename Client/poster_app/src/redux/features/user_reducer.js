import { createSlice } from "@reduxjs/toolkit";

const userState = {
  id: "",
  username: "",
  password: "",
  avatar: "",
  status: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    value: userState,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
      //Craete sessionStorage
      sessionStorage.setItem("loggedStatus", action.payload);
    },
    logout: (state) => {
      state.value = userState;
      //Destroy sessionStorage
      sessionStorage.clear();
    },
  },
});

export const { login, logout } = UserSlice.actions;

export default UserSlice.reducer;
