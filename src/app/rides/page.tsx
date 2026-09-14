// src/app/rides/page.tsx
import ridesData from '@/data/rides.json';
import RideCard from '@/components/RideCard';
import { Ride } from '@/types/ride';

export default function RidesPage() {
    const rides = ridesData as Ride[];

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="mx-auto max-w-3xl text-center space-y-6">
                <h1 className="font-[family-name:var(--font-marker)] text-5xl sm:text-6xl lg:text-7xl tracking-wider">
                    Tung Nguyen
                </h1>
                <p className="text-xl sm:text-2xl text-zinc-300 leading-relaxed">
                    I love riding my bike. Below are all the routes I&apos;ve taken.
                    There are many more miles ahead, catch you out there!
                </p>
                <p className="text-lg text-zinc-400">
                    If you want to get in touch, email me at{' '}
                    <a
                        href="mailto:tungnd.goat@gmail.com"
                        className="underline underline-offset-8 hover:text-white transition-colors"
                    >
                        tungnd.goat@gmail.com
                    </a>
                </p>
            </div>

            {/* Divider */}
            <hr className="border-zinc-800 my-10" />

            {/* Rides Grid: 1 column on mobile, scalable to 5 on large desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                {rides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} />
                ))}
            </div>
        </div>
    );
}