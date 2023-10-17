import { FirestoreEntity } from "../utils/firestore";

export interface Job extends FirestoreEntity {
  id: string;
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

export interface JobInfo {
  id: string;
  name: string;
  squadMax: number;
  squadMin: number;
  hostages: number;
  payout: number;
  gear: Map<string, number>;
  cards: string[];
  usbs: string[];
  hacks: string[];
}