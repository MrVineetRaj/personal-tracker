// store.js
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./lib/slices/tokenSlice";
import userReducer from "./lib/slices/userSlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
  },
});

export default store;
