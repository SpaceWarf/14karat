import { FirestoreEntity } from "../utils/firestore";

export interface Asset extends FirestoreEntity {
  id: string;
  name: string;
  url: string;
}