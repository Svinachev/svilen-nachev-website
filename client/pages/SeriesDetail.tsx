import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import ImageGrid from "@/components/ImageGrid";
import { seriesProjectMap } from "@/lib/series-data";

export default function SeriesDetail() {
  const { id = "" } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const series = seriesProjectMap[id];

  if (!series) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <Link
          to="/series"
          className="inline-flex items-center gap-2 text-sm mb-8 touch-safe-hover"
        >
          <ChevronLeft size={16} />
          Back to Series
        </Link>
        <div className="text-center py-12">
          <p className="text-muted">Series not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Back Button - Above Gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-3">
        <Link
          to="/series"
          className="inline-flex items-center gap-2 text-sm mb-8 touch-safe-hover"
        >
          <ChevronLeft size={16} />
          Back to Series
        </Link>
      </div>

      {/* Image Gallery First */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 lg:mb-12">
        <ImageGrid columns="3" gap="6">
          {series.images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              className="overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain cursor-pointer"
              />
            </button>
          ))}
        </ImageGrid>
      </div>

      {/* Project Text - At the Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-6">
          <h1 className="mb-3">{series.title}</h1>
          {series.detailLabel && (
            <p className="text-muted text-base">{series.detailLabel}</p>
          )}
        </div>

        {series.description && (
          <div>
            <p className="text-base leading-relaxed whitespace-pre-line max-w-3xl">{series.description}</p>
          </div>
        )}

        {id === "the-illusion-of-meaning" && (
          <div className="mt-8">
            <Link
              to="/book-order"
              className="inline-flex items-center justify-center px-6 py-3 border border-foreground text-sm font-semibold touch-safe-hover"
            >
              View the Book
            </Link>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={series.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
