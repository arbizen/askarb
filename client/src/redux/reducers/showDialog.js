import { createSlice } from "@reduxjs/toolkit";
const showDialogSlice = createSlice({
  name: "showDialog",
  initialState: {
    show: false,
    questionId: null,
  },
  reducers: {
    showDialog: (state, action) => {
      state.value = {
        show: true,
        questionId: action.payload,
      };
    },
    hideDialog: (state) => {
      state.value = {
        ...state.value,
        show: false,
      };
    },
  },
});

export const { showDialog, hideDialog } = showDialogSlice.actions;

export default showDialogSlice.reducer;
