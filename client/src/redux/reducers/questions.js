import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint } from "../../endpoint";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    all: [],
    isLoading: false,
    answered: [],
    answeredDataLen: 0,
    notAnswered: [],
    notAnsweredDataLen: 0,
  },
  reducers: {
    getQuestions: (state) => {
      state.value = {
        ...state.value,
        isLoading: true,
      };
      const { data } = axios.get(`${endpoint}/questions/all`);
      state.value = {
        ...state.value,
        all: data.questions,
        isLoading: false,
      };
    },
    loadingQuestions: (state) => {
      state.value = {
        ...state.value,
        isLoading: true,
        answered: [],
        notAnswered: [],
      };
    },
    getAnsweredQuestions: (state, action) => {
      state.value = {
        ...state.value,
        answered: action.payload.answered,
        answeredDataLen: action.payload.len,
        isLoading: false,
      };
    },
    getNotAnsweredQuestions: (state, action) => {
      state.value = {
        ...state.value,
        notAnswered: action.payload.notAnswered,
        notAnsweredDataLen: action.payload.len,
        isLoading: false,
      };
    },
    setQuestionNull: (state) => {
      state.value = {
        ...state.value,
        isLoading: true,
        answered: [],
        notAnswered: [],
      };
    },
  },
});

export const {
  getQuestions,
  getAnsweredQuestions,
  getNotAnsweredQuestions,
  loadingQuestions,
  setQuestionNull,
} = questionsSlice.actions;
export default questionsSlice.reducer;
