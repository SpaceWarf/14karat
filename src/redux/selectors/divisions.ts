import { RootState } from "../store";

export function getDivisionHierarchy(state: RootState, id: string): number {
  return state.divisions.divisions.find(division => division.id === id)?.hierarchy ?? 0;
}