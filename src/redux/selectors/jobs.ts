import { Job } from "../../state/jobs";
import { RootState } from "../store";

export function getJobById(state: RootState, id?: string): Job | undefined {
  return state.jobs.active
    .find(job => job.id === id);
}