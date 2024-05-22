import { combineReducers } from "@reduxjs/toolkit";
import { darkModeReducer } from "./slices/darkModeSlice";
import { toastrReducer } from "./slices/toastrSlice";
import appConfigSlice from "./slices/appConfigSlice";

export const rootReducer = combineReducers({
  appConfigSlice,
  toastr: toastrReducer,
  darkMode: darkModeReducer,
});

export type reduxStoreStateType = ReturnType<typeof rootReducer>;

export type reduxStoreStateKeysArrayType = Array<keyof reduxStoreStateType>;

export default rootReducer;
