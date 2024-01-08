import { BehaviorSubject } from "rxjs";
import {
  getItemById,
  DatabaseTable,
  onItemByIdSnapshot,
  getItems,
  onItemsSnapshot,
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
import { setCards, setGear, setJobs, setUsbs } from "../redux/reducers/jobs";
import { setRadios } from "../redux/reducers/radios";
import { setQuotes } from "../redux/reducers/quotes";
import { ProfileInfo } from "../state/profile";
import { War } from "../state/war";
import { CalendarEvent } from "../state/event";
import { Hack } from "../state/hack";
import { Card, Gear, Job, Usb } from "../state/jobs";
import { Radio } from "../state/radio";
import { Quote } from "../state/quotes";

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
    gear,
    cards,
    usbs,
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
    getItems<Hack>(DatabaseTable.HACKS),
    getItems<Job>(DatabaseTable.JOBS),
    getItems<Gear>(DatabaseTable.GEAR),
    getItems<Card>(DatabaseTable.CARDS),
    getItems<Usb>(DatabaseTable.USBS),
    getItems<Radio>(DatabaseTable.RADIOS),
    getItems<Quote>(DatabaseTable.QUOTES),
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
  dispatch(setGear(gear));
  dispatch(setCards(cards));
  dispatch(setUsbs(usbs));
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
  onItemsSnapshot<Job>(DatabaseTable.JOBS, jobs => dispatch(setJobs(jobs)));
  onItemsSnapshot<Radio>(DatabaseTable.RADIOS, radios => dispatch(setRadios(radios)));
  loadingSubject.next(false);
}