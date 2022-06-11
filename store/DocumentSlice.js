import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  entities: [],
  selectedDocument: [],
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    listAllDocuments: (state, action) => {
      action.payload.forEach((element) => {
        state.entities.push(element);
      });
    },
    viewDocument: (state, action) => {
      state.selectedDocument.pop();
      state.selectedDocument.push(action.payload);
    },
    approveDocument: (state, action) => {
      state.entities.forEach((element) => {
        if (element.path === action.payload) {
          element.status = "true";
        }
      });
    },
    rejectDocument: (state, action) => {
      state.entities.forEach((element) => {
        if (element.path === action.payload) {
          element.status = "false";
        }
      });
    },
  },
});

export const {
  listAllDocuments,
  viewDocument,
  approveDocument,
  rejectDocument,
} = documentSlice.actions;

export default documentSlice.reducer;
