import { BehaviorSubject } from "rxjs";
import {
  getProfileById,
  onProfileByIdSnapshot,
  getDivisions,
  getRoles,
  getDriverStrats,
  getNeighbourhoods,
  onWarSnapshot,
  onDriverStratsSnapshot,
  getWars
} from "../utils/firestore";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { setPfpUrl, setProfile } from "../redux/reducers/profile";
import { getProfilePictureUrl } from "../utils/storage";
import { setRoles } from "../redux/reducers/roles";
import { setDivisions } from "../redux/reducers/divisions";
import { setDriverStrats } from "../redux/reducers/driverStrats";
import { setNeighbourhoods } from "../redux/reducers/neighbourhoods";
import { setWars } from "../redux/reducers/wars";

export const loadingSubject = new BehaviorSubject<boolean>(true);

export async function loadData(id: string, dispatch: Dispatch<AnyAction>) {
  const [
    profile,
    divisions,
    roles,
    driverStrats,
    neighbourhoods,
    wars,
  ] = await Promise.all([
    getProfileById(id),
    getDivisions(),
    getRoles(),
    getDriverStrats(),
    getNeighbourhoods(),
    getWars(),
  ]);
  dispatch(setProfile(profile));
  dispatch(setRoles(roles));
  dispatch(setDivisions(divisions));
  dispatch(setDriverStrats(driverStrats));
  dispatch(setNeighbourhoods(neighbourhoods));
  dispatch(setWars(wars));

  if (profile.pfp) {
    const url = await getProfilePictureUrl(profile.pfp);
    dispatch(setPfpUrl(url));
  }

  onProfileByIdSnapshot(id, profile => dispatch(setProfile(profile)));
  onDriverStratsSnapshot(strats => dispatch(setDriverStrats(strats)));
  onWarSnapshot(wars => dispatch(setWars(wars)));
  loadingSubject.next(false);
}