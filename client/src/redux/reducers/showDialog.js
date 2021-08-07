import { createSlice } from "@reduxjs/toolkit";
const showDialogSlice = createSlice({
  name: "showDialog",
  initialState: {
    show: false,
    questionId: null,
    questionText: "",
    showAnswerDialog: false,
    by: "",
    editQuestionTitle: "",
    editQuestionAnswer: "",
    showEditQuestionDialogue: false,
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
    hideAnswerDialog: (state) => {
      state.value = {
        ...state.value,
        showAnswerDialog: false,
      };
    },
    showEditQuestionDialogue: (state, action) => {
      state.value = {
        ...state.value,
        editQuestionTitle: action.payload.title,
        editQuestionAnswer: action.payload.answer,
        showEditQuestionDialogue: true,
        questionId: action.payload.id,
      };
    },
    hideEditQuestionDialogue: (state) => {
      state.value = {
        ...state.value,
        showEditQuestionDialogue: false,
      };
    },
  },
});

export const {
  showDialog,
  hideDialog,
  showAnswerDialog,
  hideAnswerDialog,
  showEditQuestionDialogue,
  hideEditQuestionDialogue,
} = showDialogSlice.actions;

export default showDialogSlice.reducer;
