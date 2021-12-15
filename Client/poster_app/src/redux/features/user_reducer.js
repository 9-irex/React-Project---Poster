import { createSlice } from "@reduxjs/toolkit";

const userState = {
  isLogged: false,
  id: "",
  name: "",
  email: "",
  phone: "",
  gender: "",
  date: "",
  birthday: "",
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
      sessionStorage.setItem("loggedStatus", JSON.stringify(action.payload));
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
