import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { ProfileInfo } from "../redux/reducers/profile";
import { Unsubscribe, User } from "firebase/auth";
import { Division } from "../redux/reducers/divisions";
import { Role } from "../redux/reducers/roles";
import { DriverStrat, DriverStratUpdate } from "../redux/reducers/driverStrats";
import { Neighbourhood } from "../redux/reducers/neighbourhoods";
import { Group, GroupUpdate } from "../state/groups";
import { Member, MemberUpdate } from "../state/members";
import { Intel, IntelUpdate } from "../state/intel";

export interface FirestoreEntity {
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  deleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

const profilesRef = collection(db, "profiles");
const rolesRef = collection(db, "roles");
const divisionRef = collection(db, "divisions");
const driverStratsRef = collection(db, "driver-strats");
const neighbourhoodsRef = collection(db, "neighbourhoods");
const groupsRef = collection(db, "groups");
const membersRef = collection(db, "members");
const intelRef = collection(db, "intel");

export async function getProfiles(): Promise<ProfileInfo[]> {
  const snapshot = await getDocs(profilesRef);
  const profiles: ProfileInfo[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      profiles.push({ id: doc.id, ...doc.data() });
    }
  });
  return profiles;
}

export function onProfilesSnapshot(cb: (profile: ProfileInfo[]) => void): Unsubscribe {
  return onSnapshot(profilesRef, {}, snapshot => {
    const profiles: ProfileInfo[] = [];
    snapshot.forEach((doc: DocumentData) => {
      if (!doc.data().deleted) {
        profiles.push({ id: doc.id, ...doc.data() });
      }
    });
    cb(profiles);
  });
}

export async function getProfileById(id: string): Promise<ProfileInfo> {
  const snapshot = await getDoc(doc(db, "profiles", id));
  return { id: snapshot.id, ...snapshot.data() } as ProfileInfo;
}

export function onProfileByIdSnapshot(id: string, cb: (profile: ProfileInfo) => void): Unsubscribe {
  return onSnapshot(doc(db, "profiles", id), {}, snapshot => {
    cb({ id: snapshot.id, ...snapshot.data() } as ProfileInfo);
  });
}

export async function updateProfileInfo(id: string, profile: ProfileInfo, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  const update: Partial<ProfileInfo> = { ...profile };
  delete update.id;
  await updateDoc(doc(db, "profiles", id), {
    ...update,
    updatedAt: now,
    updatedBy: user?.email ?? "",
  });
}

export async function getIsAdmin(id: string): Promise<boolean> {
  const snapshot = await getDoc(doc(db, "profiles", id));
  return snapshot.data()?.admin;
}

export async function getDivisions(): Promise<Division[]> {
  const snapshot = await getDocs(divisionRef);
  const divisions: Division[] = [];
  snapshot.forEach((doc: DocumentData) => {
    divisions.push({ id: doc.id, ...doc.data() });
  });
  return divisions;
}

export async function getRoles(): Promise<Role[]> {
  const snapshot = await getDocs(rolesRef);
  const roles: Role[] = [];
  snapshot.forEach((doc: DocumentData) => {
    roles.push({ id: doc.id, ...doc.data() });
  });
  return roles;
}

export async function getDriverStrats(): Promise<DriverStrat[]> {
  const snapshot = await getDocs(driverStratsRef);
  const driverStrats: DriverStrat[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      driverStrats.push({ id: doc.id, ...doc.data() });
    }
  });
  return driverStrats;
}

export async function createDriverStrat(strat: DriverStratUpdate, user: User | null): Promise<DriverStrat> {
  const now = new Date().toISOString();
  const doc = await addDoc(driverStratsRef, {
    ...strat,
    createdAt: now,
    createdBy: user?.email ?? '',
  });
  return {
    id: doc.id,
    ...strat,
    createdAt: now,
  };
}

export async function getNeighbourhoods(): Promise<Neighbourhood[]> {
  const snapshot = await getDocs(neighbourhoodsRef);
  const neighbourhoods: Neighbourhood[] = [];
  snapshot.forEach((doc: DocumentData) => {
    neighbourhoods.push({ id: doc.id, ...doc.data() });
  });
  return neighbourhoods;
}

export async function getGroups(): Promise<Group[]> {
  const snapshot = await getDocs(groupsRef);
  const groups: Group[] = [];
  snapshot.forEach((doc: DocumentData) => {
    if (!doc.data().deleted) {
      groups.push({ id: doc.id, ...doc.data() });
    }
  });
  return groups;
}

export async function updateGroup(id: string, group: GroupUpdate, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "groups", id), {
    ...group,
    updatedAt: now,
    updatedBy: user?.email ?? '',
  });
}

export async function createGroup(group: GroupUpdate, user: User | null): Promise<Group> {
  const now = new Date().toISOString();
  const doc = await addDoc(groupsRef, {
    ...group,
    createdAt: now,
    createdBy: user?.email ?? '',
  });
  return {
    id: doc.id,
    ...group,
  }
}

export async function deleteGroup(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "groups", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.email ?? '',
  });
}

export async function getMembersForGroup(id: string): Promise<Member[]> {
  const snapshot = await getDocs(membersRef);
  const members: Member[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && data.group === id) {
      members.push({ id: doc.id, ...data });
    }
  });
  return members;
}

export async function updateMember(id: string, member: MemberUpdate, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "members", id), {
    ...member,
    updatedAt: now,
    updatedBy: user?.email ?? '',
  });
}

export async function createMember(member: MemberUpdate, user: User | null): Promise<Member> {
  const now = new Date().toISOString();
  const doc = await addDoc(membersRef, {
    ...member,
    createdAt: now,
    createdBy: user?.email ?? '',
  });
  return {
    id: doc.id,
    ...member,
  }
}

export async function deleteMember(id: string, user: User | null): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(doc(db, "members", id), {
    deleted: true,
    deletedAt: now,
    deletedBy: user?.email ?? '',
  });
}

export async function getIntelForGroup(id: string): Promise<Intel[]> {
  const snapshot = await getDocs(intelRef);
  const intel: Intel[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && data.group === id) {
      intel.push({ id: doc.id, ...data });
    }
  });
  return intel;
}

export async function getIntelForMember(id: string): Promise<Intel[]> {
  const snapshot = await getDocs(intelRef);
  const intel: Intel[] = [];
  snapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    if (!data.deleted && data.member === id) {
      intel.push({ id: doc.id, ...data });
    }
  });
  return intel;
}

export async function createIntel(intel: IntelUpdate, user: User | null): Promise<Intel> {
  const now = new Date().toISOString();
  const doc = await addDoc(intelRef, {
    ...intel,
    createdAt: now,
    createdBy: user?.email ?? '',
  });
  return {
    id: doc.id,
    ...intel,
  }
}