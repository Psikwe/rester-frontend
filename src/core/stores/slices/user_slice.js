import { createSlice } from "@reduxjs/toolkit";
import { getUserSession } from "../../utilities";

const initialState = {
  user: getUserSession(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
      window.localStorage.removeItem("u_user_info");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
