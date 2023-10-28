import { Radio } from "../../state/radio";
import { RootState } from "../store";

export function getRadioForJob(state: RootState, job: string): Radio | undefined {
  return state.radios.radios
    .filter(radio => !radio.burned)
    .find(radio => radio.job === job);
}