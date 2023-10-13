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