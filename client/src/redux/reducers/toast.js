import { createSlice } from "@reduxjs/toolkit";
const toastSlice = createSlice({
  name: "toast",
  initialState: {
    show: true,
    text: "Hello",
  },
  reducers: {
    showToast: (state, action) => {
      state.value = {
        show: true,
        text: action.payload,
      };
    },
    hideToast: (state) => {
      state.value = {
        show: false,
        text: "",
      };
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
