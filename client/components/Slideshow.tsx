import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideShowImage {
  src: string;
  title: string;
  year: string;
  location?: string;
}

interface SlideshowProps {
  images: SlideShowImage[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

const TRANSITION_DURATION_MS = 700;

export default function Slideshow({
  images,
  autoplay = true,
  autoplayInterval = 5000,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionIndex, setTransitionIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [currentZone, setCurrentZone] = useState<'left' | 'center' | 'right'>('center');
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const preloadedSourcesRef = useRef(new Set<string>());

  const preloadImage = async (src: string) => {
    if (preloadedSourcesRef.current.has(src)) return;

    const image = new Image();
    image.src = src;

    try {
      if (typeof image.decode === "function") {
        await image.decode();
      } else {
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error("Failed to preload image"));
        });
      }
      preloadedSourcesRef.current.add(src);
    } catch {
      // Keep slideshow moving even if one preload fails.
    }
  };

  const navigateTo = async (nextIndex: number) => {
    if (isTransitioning || nextIndex === currentIndex) return;

    const nextImage = images[nextIndex];
    if (!nextImage) return;

    setIsTransitioning(true);
    await preloadImage(nextImage.src);

    setTransitionIndex(nextIndex);

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex(nextIndex);
      setTransitionIndex(null);
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);
  };

  useEffect(() => {
    if (images.length === 0) return;

    void preloadImage(images[currentIndex].src);
    const lookAheadIndex = (currentIndex + 1) % images.length;
    void preloadImage(images[lookAheadIndex].src);
  }, [currentIndex, images]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (!autoplay || isTransitioning || images.length <= 1) return;

    const timer = window.setTimeout(() => {
      void goToNext();
    }, autoplayInterval);

    return () => window.clearTimeout(timer);
  }, [autoplay, autoplayInterval, currentIndex, isTransitioning, images.length]);

  const goToPrevious = () => {
    const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    void navigateTo(nextIndex);
  };

  const goToNext = async () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    await navigateTo(nextIndex);
  };

  const handleManualPrevious = () => {
    goToPrevious();
  };

  const handleManualNext = () => {
    void goToNext();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleManualPrevious();
      if (e.key === "ArrowRight") handleManualNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseX(x);
    setMouseY(y);
    
    const width = rect.width;
    const zoneWidth = width / 3;
    if (x < zoneWidth) {
      setCurrentZone('left');
    } else if (x < zoneWidth * 2) {
      setCurrentZone('center');
    } else {
      setCurrentZone('right');
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (currentZone === 'left') {
      handleManualPrevious();
    } else if (currentZone === 'right') {
      handleManualNext();
    }
  };

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];
  const nextImage = transitionIndex !== null ? images[transitionIndex] : null;

  return (
    <div className="w-full flex flex-col items-center justify-center m-auto px-6 lg:px-8">
      {/* Main Image */}
      <div 
        ref={imageContainerRef}
        className="relative w-full max-w-2xl aspect-[3/2] overflow-hidden mb-6 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img
          src={currentImage.src}
          alt={currentImage.title}
          className="absolute inset-0 w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />

        {nextImage && (
          <img
            src={nextImage.src}
            alt={nextImage.title}
            className="absolute inset-0 w-full h-full object-contain animate-fade-in"
            loading="lazy"
            decoding="async"
          />
        )}
        
        {/* Cursor-Following Icons */}
        {isHovered && (
          <div 
            className="hidden md:block absolute pointer-events-none text-white opacity-80"
            style={{ left: mouseX - 16, top: mouseY - 16 }}
          >
            {currentZone === 'left' && <ChevronLeft size={32} />}
            {currentZone === 'right' && <ChevronRight size={32} />}
          </div>
        )}
      </div>
    </div>
  );
}
