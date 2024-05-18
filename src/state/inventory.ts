import { FirestoreEntity } from "../utils/firestore";

export enum InventoryCategory {
  JOBS = "Jobs",
  DRUGS = "Drugs",
  WEAPONS = "Weapons",
  ARMOUR = "Armour",
  CRAFTING = "Crafting",
  OTHER = "Other",
}

export enum InventoryTags {
  JOBS = "jobs",
  GEAR = "gear",
  HACKING = "hacking",
  CARDS = "cards",
  USBS = "usbs",
  DRUGS = "drugs",
  INGREDIENTS = "ingredients",
  PRODUCT = "product",
  WEAPONS = "weapons",
  GUNS = "guns",
  C1 = "c1",
  C2 = "c2",
  C3 = "c3",
  AMMO = "ammo",
  PARTS = "parts",
  ATTACHEMENTS = "attachements",
  POLICE = "police",
  GOVERNMENT = "government",
  ARMOUR = "armour",
  CRAFTING = "crafting",
  METALS = "metals",
  ELECTRONICS = "electronics",
  INGOTS = "ingots",
  ORES = "ores",
  MELEE = "melee",
}

export interface InventoryItem extends FirestoreEntity {
  id: string;
  name: string;
  quantity: { [key: string]: number };
  category: string;
  tags: string[];
  showAsCard: boolean;
  isMonetary: boolean;
}

export interface InventoryItemUpdate {
  name: string;
  quantity: { [key: string]: number };
  category: string;
  tags: string[];
}