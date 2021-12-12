import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";

const setupArgs = {
  requestData: { requestID: "", From: "", To: "", Status: "", Date: "" },
  suggests: [],
  reqList: [],
};

export const RequestSlice = createSlice({
  name: "request",
  initialState: {
    value: setupArgs,
  },
  reducers: {
    getSuggest: (state, action) => {
      state.value.suggests = action.payload;
    },
    clearRequestList: (state) => {
      state.value.requestList = setupArgs.reqList;
    },
    getRequest: (state, action) => {
      state.value.reqList.push(action.payload);
    },
    setRequest: (state, action) => {
      state.value.requestData = action.payload;
    },
    bendRequest: (state) => {
      instance.post("/send_request", state.value.requestData).then((result) => {
        // console.log(result);
      });
    },
    allowRequest: (state) => {
      instance
        .post("/accept_request", state.value.requestData)
        .then((result) => {
          if (result.data.Error !== null) {
            console.log(result.data.Error);
            alert(result.data.Message);
          }
        });
    },
    ignoreRequest: (state) => {
      instance
        .post("/cancel_request", state.value.requestData)
        .then((result) => {
          if (result.data.Error !== null) {
            console.log(result.data.Error);
            alert(result.data.Message);
          }
        });
    },
  },
});

export const {
  getSuggest,
  setRequest,
  bendRequest,
  getRequest,
  clearRequestList,
  ignoreRequest,
  allowRequest,
} = RequestSlice.actions;

export default RequestSlice.reducer;
