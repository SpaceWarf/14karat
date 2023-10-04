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
}