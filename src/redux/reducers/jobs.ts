import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, Gear, Job, Usb } from "../../state/jobs";

export interface JobsState {
  active: Job[];
  gear: Gear[];
  cards: Card[];
  usbs: Usb[];
}

const initialState: JobsState = {
  active: [],
  gear: [],
  cards: [],
  usbs: [],
};

export const jobs = createSlice({
  name: 'Jobs',
  initialState: initialState,
  reducers: {
    setActiveJobs: (state, action: PayloadAction<Job[]>) => {
      state.active = action.payload;
    },
    setGear: (state, action: PayloadAction<Gear[]>) => {
      state.gear = action.payload;
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    setUsbs: (state, action: PayloadAction<Usb[]>) => {
      state.usbs = action.payload;
    },
  },
});

export const { setActiveJobs, setGear, setCards, setUsbs } = jobs.actions;
export default jobs.reducer;