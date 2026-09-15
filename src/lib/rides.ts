import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ridesData from '@/data/rides.json';
import type { Ride } from '@/types';

const ridesDirectory = path.join(process.cwd(), 'src/content/rides');

export function getAllRides(): Ride[] {
  return (ridesData as Omit<Ride, 'content' | 'images'>[]).map((rideItem) => {
    const fullPath = path.join(ridesDirectory, `${rideItem.id}.md`);

    let content = '';
    let images: string[] = [];

    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content: markdownContent } = matter(fileContents);

      content = markdownContent || '';
      images = Array.isArray(data.images) ? data.images : [];
    }

    return {
      ...rideItem,
      content,
      images,
    };
  });
}

export function getRideById(id: number): Ride | undefined {
  return getAllRides().find((ride) => ride.id === id);
}
