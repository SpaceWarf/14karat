import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Radio } from "../../state/radio";

export interface RadiosState {
  radios: Radio[];
}

const initialState: RadiosState = {
  radios: [],
};

export const radios = createSlice({
  name: 'Radios',
  initialState: initialState,
  reducers: {
    setRadios: (state, action: PayloadAction<Radio[]>) => {
      state.radios = action.payload;
    },
  },
});

export const { setRadios } = radios.actions;
export default radios.reducer;