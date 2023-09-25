import { BehaviorSubject } from "rxjs";
import {
  getProfileById,
  onProfileByIdSnapshot,
  getDivisions,
  getRoles
} from "../utils/firestore";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { setPfpUrl, setProfile } from "../redux/reducers/profile";
import { getProfilePictureUrl } from "../utils/storage";
import { setRoles } from "../redux/reducers/roles";
import { setDivisions } from "../redux/reducers/divisions";

export const loadingSubject = new BehaviorSubject<boolean>(true);

export async function loadData(id: string, dispatch: Dispatch<AnyAction>) {
  const [
    profile,
    divisions,
    roles,
  ] = await Promise.all([
    getProfileById(id),
    getDivisions(),
    getRoles(),
  ]);
  dispatch(setProfile(profile));
  dispatch(setRoles(roles));
  dispatch(setDivisions(divisions));

  if (profile.pfp) {
    const url = await getProfilePictureUrl(profile.pfp);
    dispatch(setPfpUrl(url));
  }

  onProfileByIdSnapshot(id, profile => dispatch(setProfile(profile)));
  loadingSubject.next(false);
}