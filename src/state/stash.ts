import { FirestoreEntity } from "../utils/firestore";

export interface Stash extends FirestoreEntity {
  id: string;
  name: string;
  order: number;
}

export interface StashUpdate {
  name: string;
  order: number;
}