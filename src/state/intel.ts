import { FirestoreEntity } from "../utils/firestore";

export interface Intel extends FirestoreEntity {
  id: string;
  group?: string;
  member?: string;
  url?: string;
  embed?: string;
  notes: string;
  tags: string[];
}
export interface IntelUpdate {
  group?: string;
  member?: string;
  url?: string;
  embed?: string;
  notes: string;
  tags: string[];
}

export enum IntelType {
  VIDEO = "video",
  IMAGE = "image",
}

export enum IntelTag {
  BLOCK = "block",
  VEHICLE = "vehicles",
  PEOPLE = "people",
}