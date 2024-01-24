import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/patientSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});