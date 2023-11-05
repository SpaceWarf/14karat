import { FirestoreEntity } from "../utils/firestore";

export interface Quote extends FirestoreEntity {
  id: string;
  quote: string;
  by: string;
}
