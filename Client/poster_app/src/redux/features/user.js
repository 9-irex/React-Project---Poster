import { createSlice } from "@reduxjs/toolkit";

const userObject = {
  __id: "",
  __username: "",
  __password: "",
  __avatar: "",
  __status: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: userObject,
  },
  reducers: {
    fillUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { fillUser } = userSlice.actions;

export default userSlice.reducer;
