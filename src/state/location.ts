import { FirestoreEntity } from "../utils/firestore";

export interface Location extends FirestoreEntity {
  id: string,
  name: string,
  description: string,
  assets: string[],
}