import { FirestoreEntity } from "../utils/firestore";

export interface Radio extends FirestoreEntity {
  id: string;
  channel: string;
  main: boolean;
  burned: boolean;
  burnTime?: string;
  job?: string;
}

export interface RadioUpdate {
  channel: string;
  main: boolean;
  burned: boolean;
  burnTime?: string;
  job?: string;
}