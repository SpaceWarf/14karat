import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DriverStrat {
  id: string;
  neighbourhood: string;
  embed: string;
  createdAt: string;
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
  },
});

export const { setDriverStrats, addDriverStrat } = roles.actions;
export default roles.reducer;