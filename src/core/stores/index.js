import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user_slice from "./slices/user_slice";
import app_slice from "./slices/app_slice";

const reducer = combineReducers({
  user_slice,
  app_slice,
});

const store = configureStore({
  reducer,
});

export default store;
