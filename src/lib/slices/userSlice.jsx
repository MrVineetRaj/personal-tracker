// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
