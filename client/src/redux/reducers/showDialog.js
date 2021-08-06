import { createSlice } from "@reduxjs/toolkit";
const showDialogSlice = createSlice({
  name: "showDialog",
  initialState: {
    show: false,
    questionId: null,
    questionText: "",
    showAnswerDialog: false,
    by: "",
  },
  reducers: {
    showDialog: (state, action) => {
      state.value = {
        ...state.value,
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
    showAnswerDialog: (state, action) => {
      state.value = {
        ...state.value,
        showAnswerDialog: true,
        questionId: action.payload.questionId,
        questionText: action.payload.questionText,
        by: action.payload.by,
      };
    },
    hideAnswerDialog: (state, action) => {
      state.value = {
        ...state.value,
        showAnswerDialog: false,
      };
    },
  },
});

export const { showDialog, hideDialog, showAnswerDialog, hideAnswerDialog } =
  showDialogSlice.actions;

export default showDialogSlice.reducer;
