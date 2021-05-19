import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./Tasks/taskSlice";
import authReducer from "./Auth/authSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store; 
