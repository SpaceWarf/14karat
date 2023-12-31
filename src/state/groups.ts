import { FirestoreEntity } from "../utils/firestore";

export interface Group extends FirestoreEntity {
  id: string;
  name: string;
  allies: string[];
  enemies: string[];
  hq: string;
  flag: string;
  identifiers: string;
  notes: string;
  cardColor: string;
  type: GroupType;
}

export interface GroupUpdate {
  name: string;
  allies: string[];
  enemies: string[];
  hq: string;
  flag: string;
  identifiers: string;
  notes: string;
  cardColor: string;
  type: GroupType;
}

export enum GroupType {
  ILLEGAL = "Illegal",
  LEGAL = "Legal",
  MC = "MC",
  OTHER = "Other",
}