// store.js
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./lib/slices/tokenSlice";
import userReducer from "./lib/slices/userSlice";
import dietReducer from "./lib/slices/dietSlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    diet: dietReducer,
  },
});

export default store;
