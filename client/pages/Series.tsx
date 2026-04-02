import { useEffect } from "react";
import SeriesCard from "@/components/SeriesCard";
import ImageGrid from "@/components/ImageGrid";
import { seriesProjects } from "@/lib/series-data";

export default function Series() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <ImageGrid columns="3" gap="8">
        {seriesProjects.map((series) => (
          <SeriesCard key={series.id} {...series} aspectRatio="aspect-square" />
        ))}
      </ImageGrid>
    </div>
  );
}
