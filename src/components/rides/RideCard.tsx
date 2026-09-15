'use client';

import { useState } from 'react';
import type { Ride } from '@/types';
import { renderSvgPolyline } from '@/lib/utils';
import RideModal from './RideModal';

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group flex cursor-pointer flex-col items-center transition-transform duration-200 hover:scale-105"
      >
        <div className="mb-3 text-center">
          <h3 className="text-lg font-bold tracking-wide text-zinc-100 sm:text-xl">
            {ride.title}
          </h3>
          <p className="mt-1 whitespace-nowrap text-sm text-zinc-400 sm:text-base">
            {ride.distance} miles • {ride.avgSpeed} mph • {ride.elevationGain} ft
          </p>
        </div>

        <div className="relative flex h-44 w-full items-center justify-center sm:h-48 lg:h-56">
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

      {isModalOpen && (
        <RideModal ride={ride} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
