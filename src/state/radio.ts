import { FirestoreEntity } from "../utils/firestore";

export interface Radio extends FirestoreEntity {
  id: string;
  channel: string;
  main: boolean;
  slide: boolean;
  burned: boolean;
  burnTime?: string;
  job?: string;
}

export interface RadioUpdate {
  channel: string;
  main: boolean;
  slide: boolean;
  burned: boolean;
  burnTime?: string;
  job?: string;
}