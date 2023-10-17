import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../../state/jobs";

export interface JobsState {
  jobs: Job[];
}

const initialState: JobsState = {
  jobs: [],
};

export const jobs = createSlice({
  name: 'Jobs',
  initialState: initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
  },
});

export const { setJobs } = jobs.actions;
export default jobs.reducer;