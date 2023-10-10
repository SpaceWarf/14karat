import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirestoreEntity } from "../../utils/firestore";

export interface DriverStrat extends FirestoreEntity {
  id: string;
  neighbourhood: string;
  embed: string;
  notes: string;
  tags: string[];
}

export interface DriverStratUpdate {
  neighbourhood: string;
  embed: string;
  notes: string;
  tags: string[];
}

export enum DriverStratTag {
  SQUEEZE = "squeeze",
  JUMP = "jump",
  WALL_HOP = "wall hop",
  FENCE = "fence",
  WALL_BREAK = "wall break",
  STAIRS = "stairs",
}

export interface DriverStratsState {
  driverStrats: DriverStrat[];
}

const initialState: DriverStratsState = {
  driverStrats: [],
};

export const roles = createSlice({
  name: 'DriverStrats',
  initialState: initialState,
  reducers: {
    setDriverStrats: (state, action: PayloadAction<DriverStrat[]>) => {
      state.driverStrats = action.payload;
    },
    addDriverStrat: (state, action: PayloadAction<DriverStrat>) => {
      state.driverStrats = [action.payload, ...state.driverStrats];
    },
    removeDriverStrat: (state, action: PayloadAction<string>) => {
      state.driverStrats = state.driverStrats.filter(strat => strat.id !== action.payload);
    },
  },
});

export const { setDriverStrats, addDriverStrat, removeDriverStrat } = roles.actions;
export default roles.reducer;