import { ReactNode } from "react";

interface ImageGridProps {
  children: ReactNode;
  columns?: "2" | "3";
  gap?: "3" | "4" | "6" | "8";
}

export default function ImageGrid({
  children,
  columns = "3",
  gap = "4",
}: ImageGridProps) {
  const colClass = {
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  const gapClass = {
    "3": "gap-3",
    "4": "gap-4",
    "6": "gap-6",
    "8": "gap-8",
  };

  return (
    <div className={`grid ${colClass[columns]} ${gapClass[gap]}`}>
      {children}
    </div>
  );
}
