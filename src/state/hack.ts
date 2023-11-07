import { FirestoreEntity } from "../utils/firestore";

export interface Hack extends FirestoreEntity {
  id: string;
  name: string;
  url?: string;
  embed?: string;
  notes?: string;
}