import { RootState } from "../store";

export function getDriverStratsByNeighbourhood(state: RootState): any {
  const map = new Map<string, string[]>();
  state.driverStrats.driverStrats.forEach(strat => {
    if (map.has(strat.neighbourhood)) {
      map.set(strat.neighbourhood, [...map.get(strat.neighbourhood) || [], strat.embed])
    } else {
      map.set(strat.neighbourhood, [strat.embed])
    }
  });
  return map;
}