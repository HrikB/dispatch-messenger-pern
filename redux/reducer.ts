<<<<<<< HEAD
import { userReducer } from "./slices";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ userReducer });
=======
import { userReducer, friendsListReducer } from "./slices";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ userReducer, friendsListReducer });
>>>>>>> 15c69c0 (reinit)

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
