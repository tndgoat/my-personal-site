// src/components/RideModal.tsx
"use client";

import { useState, useEffect } from 'react';
import { Ride } from '@/types/ride';
import ReactMarkdown from 'react-markdown'; // Optional: Use any markdown parser you prefer

interface RideModalProps {
    ride: Ride;
    onClose: () => void;
}

export default function RideModal({ ride, onClose }: RideModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lock background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const hasImages = ride.images && ride.images.length > 0;

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasImages) {
            setCurrentIndex((prev) => (prev + 1) % ride.images!.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasImages) {
            setCurrentIndex((prev) => (prev - 1 + ride.images!.length) % ride.images!.length);
        }
    };

    return (
        // Backdrop overlay
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-10"
            onClick={onClose}
        >
            {/* Modal Container */}
            <div
                className="flex flex-col md:flex-row w-full max-w-6xl h-[85vh] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                {/* Close Button (Top right corner) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-zinc-400 hover:text-white transition cursor-pointer"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* LEFT: 70% Area - Image Carousel */}
                <div className="w-full md:w-[70%] h-64 md:h-full bg-black relative flex items-center justify-center group">
                    {hasImages ? (
                        <>
                            <img
                                src={ride.images![currentIndex]}
                                alt={`${ride.title} - Image ${currentIndex + 1}`}
                                className="object-contain w-full h-full max-h-full"
                            />

                            {/* Prev Button */}
                            {ride.images!.length > 1 && (
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 backdrop-blur-md"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {/* Next Button */}
                            {ride.images!.length > 1 && (
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 backdrop-blur-md"
                                    aria-label="Next image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* Indicators (Dots) */}
                            {ride.images!.length > 1 && (
                                <div className="absolute bottom-4 flex gap-1.5">
                                    {ride.images!.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-3' : 'bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-zinc-600">No images available</p>
                    )}
                </div>

                {/* RIGHT: 30% Area - Thread-like content */}
                <div className="w-full md:w-[30%] flex flex-col h-full bg-zinc-950 border-l border-zinc-900">
                    {/* Header: Title & Metrics */}
                    <div className="p-5 border-b border-zinc-900 shrink-0">
                        <h2 className="text-xl font-bold text-zinc-100 mb-2">{ride.title}</h2>
                        <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-400">
                            <span className="bg-zinc-900 px-2 py-1 rounded-md">{ride.distance} mi</span>
                            <span className="bg-zinc-900 px-2 py-1 rounded-md">{ride.avgSpeed} mph</span>
                            <span className="bg-zinc-900 px-2 py-1 rounded-md">{ride.elevationGain} ft</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-3">{ride.date}</p>
                    </div>

                    {/* Content: Markdown scrollable area */}
                    <div className="p-5 overflow-y-auto flex-1 prose prose-invert prose-sm max-w-none">
                        {ride.content ? (
                            <ReactMarkdown>{ride.content}</ReactMarkdown>
                        ) : (
                            <p className="text-zinc-600 italic">No description written for this ride.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}