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
  getWars,
  getEvents,
  onEventsSnapshot,
  getHacks,
  getActiveJobs,
  onActiveJobsSnapshot
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
import { setEvents } from "../redux/reducers/events";
import { setHacks } from "../redux/reducers/hacks";
import { setJobs } from "../redux/reducers/jobs";

export const loadingSubject = new BehaviorSubject<boolean>(true);

export async function loadData(id: string, dispatch: Dispatch<AnyAction>) {
  const [
    profile,
    divisions,
    roles,
    driverStrats,
    neighbourhoods,
    wars,
    events,
    hacks,
    jobs,
  ] = await Promise.all([
    getProfileById(id),
    getDivisions(),
    getRoles(),
    getDriverStrats(),
    getNeighbourhoods(),
    getWars(),
    getEvents(),
    getHacks(),
    getActiveJobs(),
  ]);
  dispatch(setProfile(profile));
  dispatch(setRoles(roles));
  dispatch(setDivisions(divisions));
  dispatch(setDriverStrats(driverStrats));
  dispatch(setNeighbourhoods(neighbourhoods));
  dispatch(setWars(wars));
  dispatch(setEvents(events));
  dispatch(setHacks(hacks));
  dispatch(setJobs(jobs));

  if (profile.pfp) {
    const url = await getProfilePictureUrl(profile.pfp);
    dispatch(setPfpUrl(url));
  }

  onProfileByIdSnapshot(id, profile => dispatch(setProfile(profile)));
  onDriverStratsSnapshot(strats => dispatch(setDriverStrats(strats)));
  onWarSnapshot(wars => dispatch(setWars(wars)));
  onEventsSnapshot(events => dispatch(setEvents(events)));
  onActiveJobsSnapshot(jobs => dispatch(setJobs(jobs)));
  loadingSubject.next(false);
}