// src/types/ride.ts
export interface Ride {
    id: number;
    title: string;
    distance: number; // in miles (or km)
    avgSpeed: number; // in mph (or km/h)
    elevationGain: number; // in ft (or m)
    date: string;
    // Normalized or raw GPS coordinate pairs: [x, y] or [lng, lat]
    coordinates: [number, number][];
}