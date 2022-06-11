import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  entities: [],
  isSignedIn: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload;
      state.isSignedIn = true;
    },
    singOut: (state, action) => {
      state.currentUser = null;
      state.isSignedIn = false;
    },
  },
});

export const { signIn, singOut } = authSlice.actions;

export default authSlice.reducer;
