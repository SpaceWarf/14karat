import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Unsubscribe, User } from "firebase/auth";
import { Member } from "../state/member";
import { Intel } from "../state/intel";
import { WarClip } from "../state/war";
import { Card, Gear, Job, Usb } from "../state/jobs";
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
  WEBHOOK = "webhooks",
}

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

export async function getActiveJobs(): Promise<Job[]> {
  const items = await getItems<Job>(DatabaseTable.JOBS);
  return items.filter(item => !item.completed);
}

export function onActiveJobSnapshot(cb: (jobs: Job[]) => void): Unsubscribe {
  return onItemsSnapshot<Job>(DatabaseTable.JOBS, items => {
    cb(items.filter(item => !item.completed));
  })
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