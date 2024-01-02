import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, Gear, Job, Usb } from "../../state/jobs";

export interface JobsState {
  jobs: Job[];
  gear: Gear[];
  cards: Card[];
  usbs: Usb[];
}

const initialState: JobsState = {
  jobs: [],
  gear: [],
  cards: [],
  usbs: [],
};

export const jobs = createSlice({
  name: 'Jobs',
  initialState: initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
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

export const { setJobs, setGear, setCards, setUsbs } = jobs.actions;
export default jobs.reducer;