import { War } from "../../state/war";
import { RootState } from "../store";

export function getMostRecentWar(state: RootState): War {
  return [...state.wars.wars]
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())[0];
}