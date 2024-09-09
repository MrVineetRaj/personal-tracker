// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  physical: {
    height: 0,
    weight: 0,
  },
  financial: {
    earning: 0,
    expanse: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar || "";
      state.physical = action.payload.physical || { height: 0, weight: 0 };
      state.financial = action.payload.financial || { earning: 0, expanse: 0 };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
