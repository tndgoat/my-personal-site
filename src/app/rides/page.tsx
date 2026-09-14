// src/app/rides/page.tsx
import ridesData from '@/data/rides.json';
import RideCard from '@/components/RideCard';
import { Ride } from '@/types/ride';

export default function RidesPage() {
    const rides = ridesData as Ride[];

    return (
        <div className="space-y-12 mx-auto max-w-4xl">
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