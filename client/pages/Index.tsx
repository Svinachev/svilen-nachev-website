import { useEffect } from "react";
import Slideshow from "@/components/Slideshow";
import { homepageImages } from "@/lib/homepage-images";

export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden md:overflow-auto flex flex-col items-center justify-center py-12 lg:py-16">
      <Slideshow
        images={homepageImages}
        autoplay={true}
        autoplayInterval={4500}
      />
    </div>
  );
}
