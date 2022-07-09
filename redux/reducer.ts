import {
  userReducer,
  userInitialState,
  friendsListReducer,
  friendsListInitialState,
} from "./slices";
import {
  AnyAction,
  combineReducers,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  userReducer: { ...userInitialState },
  friendsListReducer: { ...friendsListInitialState },
};

const rootReducer = combineReducers({
  userReducer,
  friendsListReducer,
});

const masterReducer = (state = initialState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      userReducer: { user: action.payload.userReducer.user },
    };
    return nextState;
  } else return rootReducer(state, action);
};

export type RootState = ReturnType<typeof masterReducer>;

export default masterReducer;
