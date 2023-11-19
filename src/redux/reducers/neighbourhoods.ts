import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Neighbourhood {
  id: string;
  name: string;
}

export interface NeighbourhoodsState {
  neighbourhoods: Neighbourhood[];
}

const initialState: NeighbourhoodsState = {
  neighbourhoods: [],
};

export const neighbourhoods = createSlice({
  name: 'Neighbourhoods',
  initialState: initialState,
  reducers: {
    setNeighbourhoods: (state, action: PayloadAction<Neighbourhood[]>) => {
      state.neighbourhoods = action.payload;
    },
  },
});

export const { setNeighbourhoods } = neighbourhoods.actions;
export default neighbourhoods.reducer;