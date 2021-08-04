import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import showDialogSlice from "./reducers/showDialog";
export default configureStore({
  reducer: {
    user: userSlice,
    showDialog: showDialogSlice,
  },
});
