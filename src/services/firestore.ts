import { BehaviorSubject } from "rxjs";
import {
  getProfileById,
  onProfileByIdSnapshot,
  getDivisions,
  getRoles,
  getDriverStrats,
  getNeighbourhoods,
  getWarInfo,
  onWarInfoSnapshot,
  onDriverStratsSnapshot
} from "../utils/firestore";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { setPfpUrl, setProfile } from "../redux/reducers/profile";
import { getProfilePictureUrl } from "../utils/storage";
import { setRoles } from "../redux/reducers/roles";
import { setDivisions } from "../redux/reducers/divisions";
import { setDriverStrats } from "../redux/reducers/driverStrats";
import { setNeighbourhoods } from "../redux/reducers/neighbourhoods";
import { setWarInfo } from "../redux/reducers/warInfo";

export const loadingSubject = new BehaviorSubject<boolean>(true);

export async function loadData(id: string, dispatch: Dispatch<AnyAction>) {
  const [
    profile,
    divisions,
    roles,
    driverStrats,
    neighbourhoods,
    warInfo,
  ] = await Promise.all([
    getProfileById(id),
    getDivisions(),
    getRoles(),
    getDriverStrats(),
    getNeighbourhoods(),
    getWarInfo(),
  ]);
  dispatch(setProfile(profile));
  dispatch(setRoles(roles));
  dispatch(setDivisions(divisions));
  dispatch(setDriverStrats(driverStrats));
  dispatch(setNeighbourhoods(neighbourhoods));
  dispatch(setWarInfo(warInfo));

  if (profile.pfp) {
    const url = await getProfilePictureUrl(profile.pfp);
    dispatch(setPfpUrl(url));
  }

  onProfileByIdSnapshot(id, profile => dispatch(setProfile(profile)));
  onDriverStratsSnapshot(strats => dispatch(setDriverStrats(strats)));
  onWarInfoSnapshot(warInfo => dispatch(setWarInfo(warInfo)));
  loadingSubject.next(false);
}