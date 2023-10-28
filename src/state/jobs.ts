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