import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: Array<{ src: string; alt: string; title?: string }>;
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 40;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionDirection('left');
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionDirection(null);
    }, 200);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionDirection('right');
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionDirection(null);
    }, 200);
  };

  const currentImage = images[currentIndex];

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) {
      return;
    }

    const swipeDistance = touchStartXRef.current - touchEndXRef.current;

    if (Math.abs(swipeDistance) < SWIPE_THRESHOLD) {
      return;
    }

    if (swipeDistance > 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white/95 flex flex-col items-center justify-center animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-black hover:opacity-70 transition-opacity z-10"
      >
        <X size={24} />
      </button>

      <div className="flex-1 flex items-center justify-center w-full px-0 sm:px-0">
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="hidden md:block absolute left-2 sm:left-4 p-2 text-black hover:opacity-70 transition-opacity disabled:opacity-50"
        >
          <ChevronLeft size={32} />
        </button>

        <div
          key={currentIndex}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`transition-all duration-200 w-screen md:w-[65vw] h-auto flex items-center justify-center touch-pan-y ${
          isTransitioning
            ? transitionDirection === 'right'
              ? 'translate-x-4 opacity-0'
              : transitionDirection === 'left'
              ? '-translate-x-4 opacity-0'
              : 'opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-auto max-h-[75vh] md:max-h-[65vh] object-contain"            loading="lazy"
            decoding="async"          />
        </div>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="hidden md:block absolute right-2 sm:right-4 p-2 text-black hover:opacity-70 transition-opacity disabled:opacity-50"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
