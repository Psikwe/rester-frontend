import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user_slice from "./slices/user_slice";

const reducer = combineReducers({
  user_slice,
});

const store = configureStore({
  reducer,
});

export default store;
