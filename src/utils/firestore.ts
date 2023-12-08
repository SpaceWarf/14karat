import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Unsubscribe, User } from "firebase/auth";
import { Member } from "../state/member";
import { Intel } from "../state/intel";
import { WarClip } from "../state/war";
import { Job, JobInfo, UNCHAINED_JOBS } from "../state/jobs";
import { Division } from "../state/division";

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
  WEBHOOK = "webhooks",
}

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

export function onItemByIdSnapshot<T>(table: DatabaseTable, id: string, cb: (items: T) => void): Unsubscribe {
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

export async function getMembersForGroup(id: string): Promise<Member[]> {
  const items = await getItems<Member>(DatabaseTable.MEMBERS);
  return items.filter(item => item.group === id);
}

export async function getIntelForGroup(id: string): Promise<Intel[]> {
  const items = await getItems<Intel>(DatabaseTable.INTEL);
  return items.filter(item => item.group === id);
}

export async function getIntelForMember(id: string): Promise<Intel[]> {
  const items = await getItems<Intel>(DatabaseTable.INTEL);
  return items.filter(item => item.member === id);
}

export async function getWarClipsForWar(id: string): Promise<WarClip[]> {
  const items = await getItems<WarClip>(DatabaseTable.WAR_CLIPS);
  return items.filter(item => item.war === id);
}

export async function getJobInfosForDivision(division: string): Promise<JobInfo[]> {
  const items = await getItems<JobInfo>(DatabaseTable.JOB_INFO);

  if (division === Division.HANGAROUND || division === Division.SHATEI) {
    return items.filter(item => UNCHAINED_JOBS.includes(item.id))
  }

  return items;
}

export async function getActiveJobs(): Promise<Job[]> {
  const items = await getItems<Job>(DatabaseTable.JOBS);
  return items.filter(item => !item.completed);
}

export function onActiveJobSnapshot(cb: (jobs: Job[]) => void): Unsubscribe {
  return onItemsSnapshot<Job>(DatabaseTable.JOBS, items => {
    cb(items.filter(item => !item.completed));
  })
}
