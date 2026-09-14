// src/components/RideCard.tsx
import { Ride } from '@/types/ride';

interface RideCardProps {
    ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
    // Normalize GPS coordinates to fit into an SVG viewport
    const renderSvgPolyline = (coords: [number, number][]) => {
        if (!coords || coords.length === 0) return '';

        const xs = coords.map(([x]) => x);
        const ys = coords.map(([, y]) => y);

        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const padding = 16;
        const width = 240 - padding * 2;
        const height = 240 - padding * 2;

        const scaleX = width / (maxX - minX || 1);
        const scaleY = height / (maxY - minY || 1);

        return coords
            .map(([x, y]) => {
                const scaledX = padding + (x - minX) * scaleX;
                // Invert Y-axis since SVG origin (0, 0) starts from the top-left corner
                const scaledY = 240 - (padding + (y - minY) * scaleY);
                return `${scaledX.toFixed(1)},${scaledY.toFixed(1)}`;
            })
            .join(' ');
    };

    return (
        <div className="group flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105">
            {/* Title and Metrics */}
            <div className="text-center mb-3">
                <h3 className="text-lg sm:text-xl font-bold tracking-wide text-zinc-100">
                    {ride.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 mt-1 whitespace-nowrap">
                    {ride.distance} miles • {ride.avgSpeed} mph • {ride.elevationGain} ft
                </p>
            </div>

            {/* SVG Canvas with Increased Viewport */}
            <div className="relative h-44 sm:h-48 lg:h-56 w-full flex items-center justify-center">
                <svg
                    viewBox="0 0 240 240"
                    className="h-full w-full stroke-white transition-opacity duration-200 group-hover:opacity-80"
                >
                    <polyline
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={renderSvgPolyline(ride.coordinates)}
                    />
                </svg>
            </div>
        </div>
    );
}