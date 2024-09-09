// tokenSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
const tokenReducer = tokenSlice.reducer;

export default tokenReducer;
