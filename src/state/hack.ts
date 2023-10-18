import { FirestoreEntity } from "../utils/firestore";

export interface Hack extends FirestoreEntity {
  id: string;
  name: string;
  order: number;
  url?: string;
  embed?: string;
  notes?: string;
}