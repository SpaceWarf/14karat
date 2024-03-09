import { FirestoreEntity } from "../utils/firestore";

export interface Radio extends FirestoreEntity {
  id: string;
  channel: string;
  type: RadioType;
  burned: boolean;
  burnTime?: string;
  job?: string;
}

export interface RadioUpdate {
  channel: string;
  type: RadioType;
  burned: boolean;
  burnTime?: string;
  job?: string;
}

export enum RadioType {
  MAIN = "main",
  SLIDE = "slide",
  FRIENDS = "friends",
  JOB = "job",
}