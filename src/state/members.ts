import { FirestoreEntity } from "../utils/firestore";

export interface Member extends FirestoreEntity {
  id: string;
  name: string;
  group: string;
  position: string;
  phone: string;
  identifiers: string;
  notes: string;
  leader: boolean;
  dead: boolean;
}

export interface MemberUpdate {
  name: string;
  group: string;
  position: string;
  phone: string;
  identifiers: string;
  notes: string;
  leader: boolean;
  dead: boolean;
}