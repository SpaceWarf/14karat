import { FirestoreEntity } from "../utils/firestore";

export interface Job extends FirestoreEntity {
  job: string;
  crew: { [key: string]: string[] };
  gearChecklist: Checklist;
  cardsChecklist: Checklist;
  usbsChecklist: Checklist;
  radio: string;
  notes: string;
  completed: boolean;
  name: string;
  index: number;
  icon: string;
}

export interface JobUpdate {
  job: string;
  crew: { [key: string]: string[] };
  gearChecklist: Checklist;
  cardsChecklist: Checklist;
  usbsChecklist: Checklist;
  radio: string;
  notes: string;
  completed: boolean;
  name: string;
  index: number;
  icon: string;
}

export interface Checklist {
  [key: string]: {
    quantity: number,
    checked: boolean,
  }
}

export interface JobInfo extends FirestoreEntity {
  name: string;
  icon: string;
  squadMax: number;
  squadMin: number;
  hostages: number;
  payout: number;
  crew: { [key: string]: number };
  gear: { [key: string]: number };
  cards: { [key: string]: number };
  usbs: { [key: string]: number };
  hacks: string[];
  order: number;
  colour: string;
}

export interface Card extends FirestoreEntity {
  name: string;
  url: string;
  type: CardType;
}

export enum CardType {
  BANK = "bank",
  SECURITY = "security",
  HUMANE = "humane",
}

export interface Gear extends FirestoreEntity {
  name: string;
  url: string;
}

export interface Usb extends FirestoreEntity {
  name: string;
  url: string;
}

export const CrewRoleMap: { [key: string]: string } = {
  "hacker": "Hackers",
  "driver": "Drivers",
  "hostages-top": "Hostages - Top",
  "hostages-side": "Hostages - Side",
  "hostages-front": "Hostages - Front",
  "hostages-back": "Hostages - Back",
  "hostages": "Hostages",
  "driller": "Drillers",
  "jewelry": "Jewelry",
  "cleaner": "Cleaners",
  "shooter": "Shooters",
  "crates": "Crates",
}