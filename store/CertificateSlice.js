import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  entities: [],
  selectedCertificate: [],
};

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    listAllCertificate: (state, action) => {
      action.payload.forEach((element) => {
        state.entities.push(element);
      });
    },
    viewCertificate: (state, action) => {
      state.selectedCertificate.pop();
      state.selectedCertificate.push(action.payload);
    },
    approveCertificate: (state, action) => {
      state.entities.forEach((element) => {
        if (element.path === action.payload) {
          element.status = "true";
        }
      });
    },
    rejectCertificate: (state, action) => {
      state.entities.forEach((element) => {
        if (element.path === action.payload) {
          element.status = "false";
        }
      });
    },
  },
});

export const {
  listAllCertificate,
  viewCertificate,
  approveCertificate,
  rejectCertificate,
} = certificateSlice.actions;

export default certificateSlice.reducer;
