import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { War } from "../../state/war";

export interface WarInfoState {
  wars: War[];
}

const initialState: WarInfoState = {
  wars: [],
};

export const warInfo = createSlice({
  name: 'War',
  initialState: initialState,
  reducers: {
    setWars: (state, action: PayloadAction<War[]>) => {
      state.wars = action.payload;
    },
  },
});

export const { setWars } = warInfo.actions;
export default warInfo.reducer;