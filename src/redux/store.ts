import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profile";
import divisions from "./reducers/divisions";
import roles from "./reducers/roles";

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = {};
  }

  return combineReducers({
    profile: profileReducer,
    divisions: divisions,
    roles: roles,
  })(state, action);
}

const store = configureStore({
  reducer: rootReducer
});


export default store;

export type RootState = ReturnType<typeof rootReducer>;