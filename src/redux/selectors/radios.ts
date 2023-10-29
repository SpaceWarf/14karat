import { Radio } from "../../state/radio";
import { RootState } from "../store";

export function getRadioForJob(state: RootState, job: string): Radio | undefined {
  return state.radios.radios
    .filter(radio => !radio.burned)
    .find(radio => radio.job === job);
}

export const getMainRadio = (state: RootState): Radio | undefined => {
  return state.radios.radios.find(radio => radio.main);
}

export const getActiveRadios = (state: RootState): Radio[] => {
  return state.radios.radios
    .filter(radio => !radio.main && !radio.burned)
    .sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
}

export const getRecentlyBurnedRadios = (state: RootState): Radio[] => {
  return state.radios.radios
    .filter(radio => !radio.main && radio.burned && new Date(radio.burnTime || "").getTime() - new Date().getTime() < 3600000)
    .sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
}