import { FirestoreEntity } from "../utils/firestore";

export interface Intel extends FirestoreEntity {
  id: string;
  group?: string;
  member?: string;
  url?: string;
  embed?: string;
  notes: string;
}