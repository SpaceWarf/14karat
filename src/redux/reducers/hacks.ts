import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Hack } from "../../state/hack";

export interface HacksState {
  hacks: Hack[];
}

const initialState: HacksState = {
  hacks: [],
};

export const warInfo = createSlice({
  name: 'Hack',
  initialState: initialState,
  reducers: {
    setHacks: (state, action: PayloadAction<Hack[]>) => {
      state.hacks = action.payload;
    },
  },
});

export const { setHacks } = warInfo.actions;
export default warInfo.reducer;