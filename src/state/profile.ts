import { FirestoreEntity } from "../utils/firestore";

export interface ProfileInfo extends FirestoreEntity {
  id: string;
  name: string;
  phone: string;
  bleeter: string;
  email: string;
  bank: string;
  admin: boolean;
  pfp: string;
  division: string;
  roles: string[];
  discord: string;
  ssn: string;
  nickname?: string;
  hidden?: boolean;
}