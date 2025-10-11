import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import productSlice from "./reducers/productSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    productReducer: productSlice,
  },
});
