// dietSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calories: 0,
  serving_size_g: 0,
  protein_g: 0,
  sodium_mg: 0,
  potassium_mg: 0,
  cholesterol_mg: 0,
  carbohydrates_total_g: 0,
  fiber_g: 0,
  sugar_g: 0,
};

const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {
    setDiet: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setDiet } = dietSlice.actions;
const dietReducer = dietSlice.reducer;

export default dietReducer;
