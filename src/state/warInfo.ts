export interface WarInfo {
  id: string;
  endedAt?: string;
  group: string;
  kills: number;
  deaths: number;
  asset?: string;
  ourSlide?: string;
  theirSlide?: string;
}