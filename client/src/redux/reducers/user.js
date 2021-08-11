import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      if (localStorage) {
        const user = localStorage.getItem("user");
        if (user) {
          state.value = JSON.parse(user);
        } else {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.value = action.payload;
        }
      } else {
        state.value = action.payload;
      }
    },
    removeUser: (state) => {
      if (localStorage) {
        localStorage.removeItem("user");
        state.value = {};
      } else {
        state.value = {};
      }
    },
    updateUser: (state) => {
      if (localStorage) {
        const user = localStorage.getItem("user");
        state.value = JSON.parse(user);
      } else {
        state.value = {
          ...state.value,
        };
      }
    },
  },
});

export const { setUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
