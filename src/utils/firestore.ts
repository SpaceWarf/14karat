import { DocumentData, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { ProfileInfo } from "../redux/reducers/profile";
import { Unsubscribe } from "firebase/auth";
import { Division } from "../redux/reducers/divisions";
import { Role } from "../redux/reducers/roles";
import { DriverStrat } from "../redux/reducers/driverStrats";
import { Neighbourhood } from "../redux/reducers/neighbourhoods";
import { Group } from "../redux/reducers/groups";

const profilesRef = collection(db, "profiles");
const rolesRef = collection(db, "roles");
const divisionRef = collection(db, "divisions");
const driverStratsRef = collection(db, "driver-strats");
const neighbourhoodsRef = collection(db, "neighbourhoods");
const groupsRef = collection(db, "groups");

export async function getProfiles(): Promise<ProfileInfo[]> {
  const snapshot = await getDocs(profilesRef);
  const profiles: ProfileInfo[] = [];
  snapshot.forEach((doc: DocumentData) => {
    profiles.push({ id: doc.id, ...doc.data() });
  });
  return profiles;
}

export function onProfilesSnapshot(cb: (profile: ProfileInfo[]) => void): Unsubscribe {
  return onSnapshot(profilesRef, {}, snapshot => {
    const profiles: ProfileInfo[] = [];
    snapshot.forEach((doc: DocumentData) => {
      profiles.push({ id: doc.id, ...doc.data() });
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

export async function updateProfileInfo(id: string, profile: ProfileInfo): Promise<void> {
  const update: Partial<ProfileInfo> = { ...profile };
  delete update.id;
  await updateDoc(doc(db, "profiles", id), { ...update });
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
    driverStrats.push({ id: doc.id, ...doc.data() });
  });
  return driverStrats;
}

export async function createDriverStrat(neighbourhood: string, embed: string): Promise<DriverStrat> {
  const now = new Date().toISOString();
  const doc = await addDoc(driverStratsRef, { neighbourhood, embed, createdAt: now });
  return {
    neighbourhood,
    embed,
    createdAt: now,
    id: doc.id
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
    groups.push({ id: doc.id, ...doc.data() });
  });
  return groups;
}

export async function updateGroup(id: string, group: Partial<Group>): Promise<void> {
  await updateDoc(doc(db, "groups", id), { ...group });
}