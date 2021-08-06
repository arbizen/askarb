import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import showDialogSlice from "./reducers/showDialog";
import questions from "./reducers/questions";
import toast from "./reducers/toast";
export default configureStore({
  reducer: {
    user: userSlice,
    showDialog: showDialogSlice,
    questions,
    toast,
  },
});
