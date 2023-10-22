import { FirestoreEntity } from "../utils/firestore";

export interface Job extends FirestoreEntity {
  job: string;
  roles: Map<string, string[]>;
  checklist: Map<string, boolean>;
  radio: string;
  notes: string;
  completed: boolean;
}

export interface JobUpdate {
  job: string;
  roles: Map<string, string[]>;
  checklist: Map<string, boolean>;
  radio: string;
  notes: string;
  completed: boolean;
}

export interface JobInfo extends FirestoreEntity {
  name: string;
  icon: string;
  squadMax: number;
  squadMin: number;
  hostages: number;
  payout: number;
  gear: Map<string, number>;
  cards: Map<string, number>;
  usbs: Map<string, number>;
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