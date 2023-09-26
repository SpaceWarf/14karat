import { DriverStrat } from "../reducers/driverStrats";
import { RootState } from "../store";

export function getDriverStratsByNeighbourhood(state: RootState): any {
  const map = new Map<string, DriverStrat[]>();
  state.driverStrats.driverStrats.forEach(strat => {
    if (map.has(strat.neighbourhood)) {
      map.set(strat.neighbourhood, [...map.get(strat.neighbourhood) || [], strat])
    } else {
      map.set(strat.neighbourhood, [strat])
    }
  });
  return map;
}