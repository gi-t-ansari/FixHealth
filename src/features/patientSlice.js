import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "patientData",
  initialState: {
    value: [],
  },
  reducers: {
    update: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { update } = dataSlice.actions;

export default dataSlice.reducer;