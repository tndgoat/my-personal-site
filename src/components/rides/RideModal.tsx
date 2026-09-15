'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Ride } from '@/types';

interface RideModalProps {
  ride: Ride;
  onClose: () => void;
}

export default function RideModal({ ride, onClose }: RideModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ride.images ?? [];
  const hasImages = images.length > 0;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasImages && images.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && hasImages && images.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasImages, images.length, onClose]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-10"
      onClick={onClose}
    >
      <div
        className="relative flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 cursor-pointer p-2 text-zinc-400 transition hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="group relative flex h-64 w-full items-center justify-center bg-black md:h-full md:w-[70%]">
          {hasImages ? (
            <>
              <Image
                src={images[currentIndex]}
                alt={`${ride.title} - Image ${currentIndex + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-contain"
              />

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-black/80 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-black/80 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 flex gap-1.5">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-zinc-600">No images available</p>
          )}
        </div>

        <div className="flex h-full w-full flex-col border-t border-zinc-900 bg-zinc-950 md:w-[30%] md:border-t-0 md:border-l">
          <div className="shrink-0 border-b border-zinc-900 p-5">
            <h2 className="mb-2 text-xl font-bold text-zinc-100">{ride.title}</h2>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-400">
              <span className="rounded-md bg-zinc-900 px-2 py-1">{ride.distance} mi</span>
              <span className="rounded-md bg-zinc-900 px-2 py-1">{ride.avgSpeed} mph</span>
              <span className="rounded-md bg-zinc-900 px-2 py-1">{ride.elevationGain} ft</span>
            </div>
            <p className="mt-3 text-xs text-zinc-500">{ride.date}</p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none flex-1 overflow-y-auto p-5">
            {ride.content ? (
              <ReactMarkdown>{ride.content}</ReactMarkdown>
            ) : (
              <p className="italic text-zinc-600">No description written for this ride.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
