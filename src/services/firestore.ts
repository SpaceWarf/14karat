import { BehaviorSubject } from "rxjs";
import {
  getHacks,
  getActiveJobs,
  onActiveJobsSnapshot,
  getJobInfos,
  getGear,
  getRadios,
  onRadiosSnapshot,
  getQuotes,
  getItemById,
  DatabaseTable,
  onItemByIdSnapshot,
  getItems,
  onItemsSnapshot
} from "../utils/firestore";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { setPfpUrl, setProfile } from "../redux/reducers/profile";
import { getProfilePictureUrl } from "../utils/storage";
import { Role, setRoles } from "../redux/reducers/roles";
import { Division, setDivisions } from "../redux/reducers/divisions";
import { DriverStrat, setDriverStrats } from "../redux/reducers/driverStrats";
import { Neighbourhood, setNeighbourhoods } from "../redux/reducers/neighbourhoods";
import { setWars } from "../redux/reducers/wars";
import { setEvents } from "../redux/reducers/events";
import { setHacks } from "../redux/reducers/hacks";
import { setActiveJobs, setGear, setJobInfos } from "../redux/reducers/jobs";
import { setRadios } from "../redux/reducers/radios";
import { setQuotes } from "../redux/reducers/quotes";
import { ProfileInfo } from "../state/profile";
import { War } from "../state/war";
import { CalendarEvent } from "../state/event";

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
    activeJobs,
    jobInfos,
    gear,
    radios,
    quotes,
  ] = await Promise.all([
    getItemById<ProfileInfo>(DatabaseTable.PROFILES, id),
    getItems<Division>(DatabaseTable.DIVISIONS),
    getItems<Role>(DatabaseTable.ROLES),
    getItems<DriverStrat>(DatabaseTable.DRIVER_STRATS),
    getItems<Neighbourhood>(DatabaseTable.NEIGHBOURHOODS),
    getItems<War>(DatabaseTable.WARS),
    getItems<CalendarEvent>(DatabaseTable.EVENTS),
    getHacks(),
    getActiveJobs(),
    getJobInfos(),
    getGear(),
    getRadios(),
    getQuotes(),
  ]);
  dispatch(setProfile(profile));
  dispatch(setRoles(roles));
  dispatch(setDivisions(divisions));
  dispatch(setDriverStrats(driverStrats));
  dispatch(setNeighbourhoods(neighbourhoods));
  dispatch(setWars(wars));
  dispatch(setEvents(events));
  dispatch(setHacks(hacks));
  dispatch(setActiveJobs(activeJobs));
  dispatch(setJobInfos(jobInfos));
  dispatch(setGear(gear));
  dispatch(setRadios(radios));
  dispatch(setQuotes(quotes));

  if (profile.pfp) {
    const url = await getProfilePictureUrl(profile.pfp);
    dispatch(setPfpUrl(url));
  }

  onItemByIdSnapshot<ProfileInfo>(DatabaseTable.PROFILES, id, profile => dispatch(setProfile(profile)));
  onItemsSnapshot<DriverStrat>(DatabaseTable.DRIVER_STRATS, strats => dispatch(setDriverStrats(strats)));
  onItemsSnapshot<War>(DatabaseTable.WARS, wars => dispatch(setWars(wars)));
  onItemsSnapshot<CalendarEvent>(DatabaseTable.EVENTS, events => dispatch(setEvents(events)));
  onActiveJobsSnapshot(jobs => dispatch(setActiveJobs(jobs)));
  onRadiosSnapshot(radios => dispatch(setRadios(radios)));
  loadingSubject.next(false);
}