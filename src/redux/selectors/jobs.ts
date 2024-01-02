import { Job } from "../../state/jobs";
import { RootState } from "../store";

export function getJobById(state: RootState, id?: string): Job | undefined {
  return state.jobs.jobs.find(job => job.id === id);
}

export function getActiveJobs(state: RootState): Job[] {
  return state.jobs.jobs.filter(job => !job.completed);
}

export function getCompletedJobs(state: RootState): Job[] {
  return state.jobs.jobs.filter(job => job.completed);
}