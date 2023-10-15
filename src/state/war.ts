import { FirestoreEntity } from "../utils/firestore";

export interface War extends FirestoreEntity {
  id: string;
  endedAt?: string;
  group: string;
  kills: number;
  deaths: number;
  asset?: string;
  ourSlide?: string;
  theirSlide?: string;
}

export interface WarUpdate {
  endedAt?: string;
  group: string;
  kills: number;
  deaths: number;
  asset?: string;
  ourSlide?: string;
  theirSlide?: string;
}

export interface WarClip extends FirestoreEntity {
  id: string;
  war: string;
  embed: string;
  notes: string;
  tags: string[];
}

export interface WarClipUpdate {
  war: string;
  embed: string;
  notes: string;
  tags: string[];
}

export enum WarClipTag {
  OUR_SLIDE = "our slide",
  THEIR_SLIDE = "their slide",
}