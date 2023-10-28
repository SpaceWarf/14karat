import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Unsubscribe, User } from "firebase/auth";
import { Division } from "../redux/reducers/divisions";
import { Role } from "../redux/reducers/roles";
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

const profilesRef = collection(db, "profiles");
const rolesRef = collection(db, "roles");
const divisionRef = collection(db, "divisions");
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

export async function getProfiles(): Promise<ProfileInfo[]> {
  const snapshot = await getDocs(profilesRef);
  const profiles: ProfileInfo[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      profiles.push({ id: doc.id, ...doc.data() });
    }
  });
  return profiles;
}

export function onProfilesSnapshot(cb: (profile: ProfileInfo[]) => void): Unsubscribe {
  return onSnapshot(profilesRef, {}, snapshot => {
    const profiles: ProfileInfo[] = [];
    snapshot.forEach((doc: DocumentData) => {
      if (!doc.data().deleted) {
        profiles.push({ id: doc.id, ...doc.data() });
      }
    });
    cb(profiles);
  });
}

export async function getProfileById(id: string): Promise<ProfileInfo> {
  const snapshot = await getDoc(doc(db, "profiles", id));
  return { id: snapshot.id, ...snapshot.data() } as ProfileInfo;
}

export function onProfileByIdSnapshot(id: string, cb: (profile: ProfileInfo) => void): Unsubscribe {
  return onSnapshot(doc(db, "profiles", id), {}, snapshot => {
    cb({ id: snapshot.id, ...snapshot.data() } as ProfileInfo);
  });
}

export async function updateProfileInfo(id: string, profile: ProfileInfo, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  const update: Partial<ProfileInfo> = { ...profile };
  delete update.id;
  await updateDoc(doc(db, "profiles", id), {
    ...update,
    updatedAt: now,
    updatedBy: user?.email ?? "",
  });
}

export async function getIsAdmin(id: string): Promise<boolean> {
  const snapshot = await getDoc(doc(db, "profiles", id));
  return snapshot.data()?.admin;
}

export async function getDivisions(): Promise<Division[]> {
  const snapshot = await getDocs(divisionRef);
  const divisions: Division[] = [];
  snapshot.forEach((doc: DocumentData) => {
    divisions.push({ id: doc.id, ...doc.data() });
  });
  return divisions;
}

export async function getRoles(): Promise<Role[]> {
  const snapshot = await getDocs(rolesRef);
  const roles: Role[] = [];
  snapshot.forEach((doc: DocumentData) => {
    roles.push({ id: doc.id, ...doc.data() });
  });
  return roles;
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
    createdBy: user?.email ?? '',
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
    deletedBy: user?.email ?? '',
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
    updatedBy: user?.email ?? '',
  });
}

export async function createGroup(group: GroupUpdate, user: User | null): Promise<Group> {
  const now = new Date().toISOString();
  const doc = await addDoc(groupsRef, {
    ...group,
    createdAt: now,
    createdBy: user?.email ?? '',
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
    deletedBy: user?.email ?? '',
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
    updatedBy: user?.email ?? '',
  });
}

export async function createMember(member: MemberUpdate, user: User | null): Promise<Member> {
  const now = new Date().toISOString();
  const doc = await addDoc(membersRef, {
    ...member,
    createdAt: now,
    createdBy: user?.email ?? '',
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
    deletedBy: user?.email ?? '',
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
    createdBy: user?.email ?? '',
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
    deletedBy: user?.email ?? '',
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
    updatedBy: user?.email ?? '',
  });
}

export async function createWarInfo(warInfo: WarUpdate, user: User | null): Promise<War> {
  const now = new Date().toISOString();
  const doc = await addDoc(warsRef, {
    ...warInfo,
    createdAt: now,
    createdBy: user?.email ?? '',
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
    createdBy: user?.email ?? '',
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
    updatedBy: user?.email ?? '',
  });
}

export async function deleteEvent(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "events", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.email ?? '',
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
    createdBy: user?.email ?? '',
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
    deletedBy: user?.email ?? '',
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
    createdBy: user?.email ?? '',
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
    updatedBy: user?.email ?? '',
  });
}

export async function deleteActiveJob(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "jobs", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.email ?? '',
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