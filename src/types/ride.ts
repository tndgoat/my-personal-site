export interface Ride {
  id: number;
  title: string;
  distance: number;
  avgSpeed: number;
  elevationGain: number;
  date: string;
  coordinates: [number, number][];
  images?: string[];
  content?: string;
}