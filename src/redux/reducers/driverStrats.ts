import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DriverStrats {
  id: string;
  neighbourhood: string;
  embed: string;
}

export interface DriverStratsState {
  driverStrats: DriverStrats[];
}

const initialState: DriverStratsState = {
  driverStrats: [],
};

export const roles = createSlice({
  name: 'DriverStrats',
  initialState: initialState,
  reducers: {
    setDriverStrats: (state, action: PayloadAction<DriverStrats[]>) => {
      state.driverStrats = action.payload;
    },
  },
});

export const { setDriverStrats } = roles.actions;
export default roles.reducer;