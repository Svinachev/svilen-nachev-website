import { Link } from "react-router-dom";

interface SeriesCardProps {
  id: string;
  title: string;
  year?: string;
  image: string;
  description?: string;
  aspectRatio?: string;
}

export default function SeriesCard({
  id,
  title,
  year,
  image,
  description,
  aspectRatio = "aspect-square",
}: SeriesCardProps) {
  return (
    <Link to={`/series/${id}`} className="series-card-link">
      <div className={`overflow-hidden ${aspectRatio} mb-4`}>
        <img
          src={image}
          alt={title}
          className="series-card-image w-full h-full object-cover transition-transform duration-300"
        />
      </div>
      <h3 className="text-sm lg:text-base font-semibold tracking-wide mb-1">
        {title}
      </h3>
      {year && <p className="text-xs text-muted">{year}</p>}
    </Link>
  );
}
