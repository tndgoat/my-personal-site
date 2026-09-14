// src/app/rides/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ridesData from '@/data/rides.json';
import RideCard from '@/components/RideCard';
import { Ride } from '@/types/ride';

/**
 * Helper function to merge JSON data with Markdown files.
 * It reads the rides.json and looks for a matching {id}.md in src/content/rides/
 */
function getRides(): Ride[] {
    const ridesDirectory = path.join(process.cwd(), 'src/content/rides');

    const rides: Ride[] = ridesData.map((rideItem) => {
        // Assume markdown file is named after the ride ID, e.g., "426.md"
        const fullPath = path.join(ridesDirectory, `${rideItem.id}.md`);

        let content = '';
        let images: string[] = [];

        // Check if a markdown file exists for this ride
        if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            // Parse frontmatter and markdown content
            const { data, content: markdownContent } = matter(fileContents);

            content = markdownContent || '';
            // Ensure images is always an array
            images = data.images || [];
        }

        return {
            ...rideItem,
            content,
            images,
        } as Ride;
    });

    return rides;
}

export default function RidesPage() {
    // Fetch and merge the data on the server
    const rides = getRides();

    return (
        <div className="space-y-12 mx-auto max-w-4xl p-4 md:p-0">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h1 className="font-[family-name:var(--font-marker)] text-5xl sm:text-6xl tracking-wider">
                    Cycling Logs
                </h1>
                <p className="text-xl text-zinc-400">
                    Records of routes, miles, and life on two wheels.
                </p>
            </div>

            {/* Divider */}
            <hr className="border-zinc-800" />

            {/* Rides Grid: 1 column on mobile, scalable to 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {rides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} />
                ))}
            </div>
        </div>
    );
}