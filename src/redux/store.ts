import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profile";
import divisions from "./reducers/divisions";
import roles from "./reducers/roles";
import driverStrats from "./reducers/driverStrats";
import neighbourhoods from "./reducers/neighbourhoods";
import wars from "./reducers/wars";
import events from "./reducers/events";
import hacks from "./reducers/hacks";
import jobs from "./reducers/jobs";
import radios from "./reducers/radios";

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = {};
  }

  return combineReducers({
    profile: profileReducer,
    divisions: divisions,
    roles: roles,
    driverStrats: driverStrats,
    neighbourhoods: neighbourhoods,
    wars: wars,
    events: events,
    hacks: hacks,
    jobs: jobs,
    radios: radios,
  })(state, action);
}

const store = configureStore({
  reducer: rootReducer
});


export default store;

export type RootState = ReturnType<typeof rootReducer>;