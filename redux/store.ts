import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

 const store = configureStore({
  reducer: {
    studentInfo: userReducer,
  },
});

export default store;


