import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Unsubscribe, User } from "firebase/auth";
import { DriverStrat, DriverStratUpdate } from "../redux/reducers/driverStrats";
import { Neighbourhood } from "../redux/reducers/neighbourhoods";
import { Group, GroupUpdate } from "../state/groups";
import { Member, MemberUpdate } from "../state/member";
import { Intel, IntelUpdate } from "../state/intel";
import { War, WarClip, WarClipUpdate, WarUpdate } from "../state/war";
import { Webhook } from "../state/webhook";
import { CalendarEvent, CalendarEventUpdate } from "../state/event";
import { Hack } from "../state/hack";
import { Location } from '../state/location';
import { Card, Gear, Job, JobInfo, JobUpdate, Usb } from "../state/jobs";
import { ProfileInfo } from "../state/profile";
import { Radio, RadioUpdate } from "../state/radio";
import { Quote } from "../state/quotes";
import { Asset } from "../state/asset";
import dayjs from "dayjs";

export interface FirestoreEntity {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  deleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

export enum DatabaseTable {
  PROFILES = "profiles",
  ROLES = "roles",
  DIVISIONS = "divisions",
  DRIVER_STRATS = "driver-strats",
  NEIGHBOURHOODS = "neighbourhoods",
  GROUPS = "groups",
  MEMBERS = "members",
  INTEL = "intel",
  WARS = "wars",
  EVENTS = "events",
  WAR_CLIPS = "war-clips",
  HACKS = "hacks",
  LOCATIONS = "locations",
  JOBS = "jobs",
  JOB_INFO = "job-info",
  GEAR = "gear",
  CARDS = "cards",
  USBS = "usbs",
  RADIOS = "radios",
  QUOTES = "quotes",
  ASSETS = "assets",
  INVENTORY = "inventory",
  STASHES = "stashes",
}

const driverStratsRef = collection(db, "driver-strats");
const neighbourhoodsRef = collection(db, "neighbourhoods");
const groupsRef = collection(db, "groups");
const membersRef = collection(db, "members");
const intelRef = collection(db, "intel");
const warsRef = collection(db, "wars");
const eventsRef = collection(db, "events");
const warClipsRef = collection(db, "war-clips");
const hacksRef = collection(db, "hacks");
const locationsRef = collection(db, "locations");
const jobsRef = collection(db, "jobs");
const jobInfoRef = collection(db, "job-info");
const gearRef = collection(db, "gear");
const cardsRef = collection(db, "cards");
const usbsRef = collection(db, "usbs");
const radiosRef = collection(db, "radios");
const quotesRef = collection(db, "quotes");
const assetsRef = collection(db, "assets");

export async function getItems<T>(table: DatabaseTable): Promise<T[]> {
  const snapshot = await getDocs(collection(db, table));
  const items: T[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      items.push({ id: doc.id, ...doc.data() });
    }
  });
  return items;
}

export async function getItemById<T>(table: DatabaseTable, id: string): Promise<T> {
  const snapshot = await getDoc(doc(db, table, id));
  return { id: snapshot.id, ...snapshot.data() } as T;
}

export function onItemsSnapshot<T>(table: string, cb: (items: T[]) => void): Unsubscribe {
  return onSnapshot(collection(db, table), {}, snapshot => {
    const items: T[] = [];
    snapshot.forEach((doc: DocumentData) => {
      if (!doc.data().deleted) {
        items.push({ id: doc.id, ...doc.data() });
      }
    });
    cb(items);
  });
}

export function onItemByIdSnapshot<T>(table: DatabaseTable, id: string, cb: (profile: T) => void): Unsubscribe {
  return onSnapshot(doc(db, table, id), {}, snapshot => {
    cb({ id: snapshot.id, ...snapshot.data() } as T);
  });
}

export async function createItem<T, U>(table: string, item: T, user: User | null): Promise<U> {
  const now = new Date().toISOString();
  const doc = await addDoc(collection(db, table), {
    ...item,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...item,
    createdAt: now,
  } as U;
}

export async function updateItem<T>(table: string, id: string, update: T, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, table, id), {
    ...update,
    updatedAt: now,
    updatedBy: user?.uid ?? "",
  });
}

export async function deleteItem(table: string, id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, table, id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getStats() {
  const jobs = await getItems<Job>(DatabaseTable.JOBS);
  const profiles = await getItems<ProfileInfo>(DatabaseTable.PROFILES);
  const dateFilter = dayjs().subtract(7, "days").toDate();

  let stats = jobs.reduce((map, job) => {
    if (job.createdAt && new Date(job.createdAt).getTime() < dateFilter.getTime()) {
      return map;
    }

    const crew = [...new Set(Object.values(job.crew).reduce((crew, role) => [...crew, ...role]))].filter(member => member);

    crew.forEach(member => {
      if (map.has(member)) {
        map.set(member, map.get(member) + 1);
      } else {
        map.set(member, 1);
      }
    });

    return map;
  }, new Map());

  console.log("-------------------------------------------------------------")
  stats = new Map([...stats.entries()].sort((a, b) => b[1] - a[1]));
  stats.forEach((value: boolean, key: string) => {
    const name = profiles.find(profile => profile.id === key)?.name ?? key;
    console.log(`${name} has completed ${value} jobs in the last two weeks`)
  });
}

export async function getDriverStrats(): Promise<DriverStrat[]> {
  const snapshot = await getDocs(driverStratsRef);
  const driverStrats: DriverStrat[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      driverStrats.push({ id: doc.id, ...doc.data() });
    }
  });
  return driverStrats;
}

export function onDriverStratsSnapshot(cb: (strats: DriverStrat[]) => void): Unsubscribe {
  return onSnapshot(driverStratsRef, {}, snapshot => {
    const driverStrats: DriverStrat[] = [];
    snapshot.forEach((doc: DocumentData) => {
      if (!doc.data().deleted) {
        driverStrats.push({ id: doc.id, ...doc.data() });
      }
    });
    cb(driverStrats);
  });
}

export async function createDriverStrat(strat: DriverStratUpdate, user: User | null): Promise<DriverStrat> {
  const now = new Date().toISOString();
  const doc = await addDoc(driverStratsRef, {
    ...strat,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...strat,
    createdAt: now,
  };
}

export async function deleteDriverStrat(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "driver-strats", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getNeighbourhoods(): Promise<Neighbourhood[]> {
  const snapshot = await getDocs(neighbourhoodsRef);
  const neighbourhoods: Neighbourhood[] = [];
  snapshot.forEach((doc: DocumentData) => {
    neighbourhoods.push({ id: doc.id, ...doc.data() });
  });
  return neighbourhoods;
}

export async function getGroups(): Promise<Group[]> {
  const snapshot = await getDocs(groupsRef);
  const groups: Group[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      groups.push({ id: doc.id, ...doc.data() });
    }
  });
  return groups;
}

export async function updateGroup(id: string, group: GroupUpdate, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "groups", id), {
    ...group,
    updatedAt: now,
    updatedBy: user?.uid ?? '',
  });
}

export async function createGroup(group: GroupUpdate, user: User | null): Promise<Group> {
  const now = new Date().toISOString();
  const doc = await addDoc(groupsRef, {
    ...group,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...group,
  }
}

export async function deleteGroup(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "groups", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getMembersForGroup(id: string): Promise<Member[]> {
  const snapshot = await getDocs(membersRef);
  const members: Member[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && data.group === id) {
      members.push({ id: doc.id, ...data });
    }
  });
  return members;
}

export async function updateMember(id: string, member: MemberUpdate, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "members", id), {
    ...member,
    updatedAt: now,
    updatedBy: user?.uid ?? '',
  });
}

export async function createMember(member: MemberUpdate, user: User | null): Promise<Member> {
  const now = new Date().toISOString();
  const doc = await addDoc(membersRef, {
    ...member,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...member,
  }
}

export async function deleteMember(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "members", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getIntelForGroup(id: string): Promise<Intel[]> {
  const snapshot = await getDocs(intelRef);
  const intel: Intel[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && data.group === id) {
      intel.push({ id: doc.id, ...data });
    }
  });
  return intel;
}

export async function getIntelForMember(id: string): Promise<Intel[]> {
  const snapshot = await getDocs(intelRef);
  const intel: Intel[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && data.member === id) {
      intel.push({ id: doc.id, ...data });
    }
  });
  return intel;
}

export async function createIntel(intel: IntelUpdate, user: User | null): Promise<Intel> {
  const now = new Date().toISOString();
  const doc = await addDoc(intelRef, {
    ...intel,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...intel,
  }
}

export async function deleteIntel(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "intel", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getWars(): Promise<War[]> {
  const snapshot = await getDocs(warsRef);
  const wars: War[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      wars.push({ id: doc.id, ...data });
    }
  });
  return wars;
}

export function onWarSnapshot(cb: (wars: War[]) => void): Unsubscribe {
  return onSnapshot(warsRef, {}, snapshot => {
    const wars: War[] = [];
    snapshot.forEach((doc: DocumentData) => {
      const data = doc.data();
      if (!data.deleted) {
        wars.push({ id: doc.id, ...data });
      }
    });
    cb(wars);
  });
}

export async function updateWarInfo(id: string, update: Partial<War>, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "wars", id), {
    ...update,
    updatedAt: now,
    updatedBy: user?.uid ?? '',
  });
}

export async function createWarInfo(warInfo: WarUpdate, user: User | null): Promise<War> {
  const now = new Date().toISOString();
  const doc = await addDoc(warsRef, {
    ...warInfo,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...warInfo,
  };
}

export async function getWebhookById(id: string): Promise<Webhook> {
  const snapshot = await getDoc(doc(db, "webhooks", id));
  return { id: snapshot.id, ...snapshot.data() } as Webhook;
}

export async function getEvents(): Promise<CalendarEvent[]> {
  const snapshot = await getDocs(eventsRef);
  const wars: CalendarEvent[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      wars.push({ id: doc.id, ...data });
    }
  });
  return wars;
}

export function onEventsSnapshot(cb: (wars: CalendarEvent[]) => void): Unsubscribe {
  return onSnapshot(eventsRef, {}, snapshot => {
    const wars: CalendarEvent[] = [];
    snapshot.forEach((doc: DocumentData) => {
      const data = doc.data();
      if (!data.deleted) {
        wars.push({ id: doc.id, ...data });
      }
    });
    cb(wars);
  });
}

export async function createEvent(event: CalendarEventUpdate, user: User | null): Promise<CalendarEvent> {
  const now = new Date().toISOString();
  const doc = await addDoc(eventsRef, {
    ...event,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...event,
  };
}

export async function updateEvent(id: string, update: CalendarEventUpdate, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "events", id), {
    ...update,
    updatedAt: now,
    updatedBy: user?.uid ?? '',
  });
}

export async function deleteEvent(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "events", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getWarClipsForWar(id: string): Promise<WarClip[]> {
  const snapshot = await getDocs(warClipsRef);
  const clips: WarClip[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && data.war === id) {
      clips.push({ id: doc.id, ...data });
    }
  });
  return clips;
}

export async function createWarClip(clip: WarClipUpdate, user: User | null): Promise<WarClip> {
  const now = new Date().toISOString();
  const doc = await addDoc(warClipsRef, {
    ...clip,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...clip,
  };
}

export async function deleteWarClip(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "war-clips", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getHacks(): Promise<Hack[]> {
  const snapshot = await getDocs(hacksRef);
  const hacks: Hack[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      hacks.push({ id: doc.id, ...data });
    }
  });
  return hacks;
}

export async function getLocations(): Promise<Location[]> {
  const snapshot = await getDocs(locationsRef);
  const locations: Location[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      locations.push({ id: doc.id, ...data });
    }
  });
  return locations;
}

export async function getActiveJobs(): Promise<Job[]> {
  const snapshot = await getDocs(jobsRef);
  const jobs: Job[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && !data.completed) {
      jobs.push({ id: doc.id, ...data });
    }
  });
  return jobs;
}

export function onActiveJobsSnapshot(cb: (jobs: Job[]) => void): Unsubscribe {
  return onSnapshot(jobsRef, {}, snapshot => {
    const jobs: Job[] = [];
    snapshot.forEach((doc: DocumentData) => {
      const data = doc.data();
      if (!data.deleted && !data.completed) {
        jobs.push({ id: doc.id, ...data });
      }
    });
    cb(jobs);
  });
}

export async function createActiveJob(job: JobUpdate, user: User | null): Promise<Job> {
  const now = new Date().toISOString();
  const doc = await addDoc(jobsRef, {
    ...job,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...job,
  };
}

export async function updateActiveJob(id: string, update: JobUpdate, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "jobs", id), {
    ...update,
    updatedAt: now,
    updatedBy: user?.uid ?? '',
  });
}

export async function deleteActiveJob(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "jobs", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getJobInfos(): Promise<JobInfo[]> {
  const snapshot = await getDocs(jobInfoRef);
  const jobs: JobInfo[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      jobs.push({ id: doc.id, ...data });
    }
  });
  return jobs;
}

export async function getGear(): Promise<Gear[]> {
  const snapshot = await getDocs(gearRef);
  const gear: Gear[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      gear.push({ id: doc.id, ...data });
    }
  });
  return gear;
}

export async function getCards(): Promise<Card[]> {
  const snapshot = await getDocs(cardsRef);
  const cards: Card[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      cards.push({ id: doc.id, ...data });
    }
  });
  return cards;
}

export async function getUsbs(): Promise<Usb[]> {
  const snapshot = await getDocs(usbsRef);
  const usbs: Usb[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      usbs.push({ id: doc.id, ...data });
    }
  });
  return usbs;
}

export async function getRadios(): Promise<Radio[]> {
  const snapshot = await getDocs(radiosRef);
  const radios: Radio[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && !data.completed) {
      radios.push({ id: doc.id, ...data });
    }
  });
  return radios;
}

export function onRadiosSnapshot(cb: (radios: Radio[]) => void): Unsubscribe {
  return onSnapshot(radiosRef, {}, snapshot => {
    const radios: Radio[] = [];
    snapshot.forEach((doc: DocumentData) => {
      const data = doc.data();
      if (!data.deleted && !data.completed) {
        radios.push({ id: doc.id, ...data });
      }
    });
    cb(radios);
  });
}

export async function createRadio(radio: RadioUpdate, user: User | null): Promise<Radio> {
  const now = new Date().toISOString();
  const doc = await addDoc(radiosRef, {
    ...radio,
    createdAt: now,
    createdBy: user?.uid ?? '',
  });
  return {
    id: doc.id,
    ...radio,
  };
}

export async function updateRadio(id: string, update: RadioUpdate, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "radios", id), {
    ...update,
    updatedAt: now,
    updatedBy: user?.uid ?? '',
  });
}

export async function deleteRadio(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "radios", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.uid ?? '',
  });
}

export async function getQuotes(): Promise<Quote[]> {
  const snapshot = await getDocs(quotesRef);
  const quotes: Quote[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted) {
      quotes.push({ id: doc.id, ...data });
    }
  });
  return quotes;
}

export async function getAssets(): Promise<Asset[]> {
  const snapshot = await getDocs(assetsRef);
  const assets: Asset[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      assets.push({ id: doc.id, ...doc.data() });
    }
  });
  return assets;
}