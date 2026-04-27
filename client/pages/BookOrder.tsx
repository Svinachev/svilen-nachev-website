import { useEffect, useState } from "react";

const bookImages = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775161080/Svilen_Nachev_book_01_lunj6f.jpg",
    alt: "Book Image 01",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775161079/Svilen_Nachev_book_03_nj0c7q.jpg",
    alt: "Book Image 03",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775161079/Svilen_Nachev_book_04_xwxcgy.jpg",
    alt: "Book Image 04",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775161080/Svilen_Nachev_book_05_pbsgxp.jpg",
    alt: "Book Image 05",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775161080/Svilen_Nachev_book_06_j9hgjv.jpg",
    alt: "Book Image 06",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775161080/Svilen_Nachev_book_07_nrjtpb.jpg",
    alt: "Book Image 07",
  },
];

const mediaLogos = [
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155796/images_exen1q.png",
    alt: "Media Logo 1",
  },
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155795/images_3_wsskgw.png",
    alt: "Media Logo 2",
  },
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155785/images_2_jirrw3.png",
    alt: "Media Logo 3",
  },
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155775/Eyeshot-Open-Call-2022_uanrdf.jpg",
    alt: "Eyeshot",
  },
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155775/GommaGrant2018Logo_rox0g2.jpg",
    alt: "Gomma Grant",
  },
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155774/8631-contest-lensculture-logo01_kjbifb.jpg",
    alt: "LensCulture",
  },
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155775/EDITEDephemere-mainPNG-1_yl0331.jpg",
    alt: "Ephemere",
  },
  {
    src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775155775/images_1_hyfpmy.png",
    alt: "Media Logo 4",
  },
];

export default function BookOrder() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      {/* Book Information */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Book Cover/Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="aspect-square overflow-hidden mb-4">
              <img
                src={bookImages[selectedImageIndex].src}
                alt={bookImages[selectedImageIndex].alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="w-full flex gap-3">
              {bookImages.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-1 aspect-square overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-foreground opacity-100"
                      : "border-border opacity-60 hover:opacity-80"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Book Description */}
          <div className="mb-8">
            <blockquote className="text-base leading-relaxed mb-6 italic text-muted">
              "Abandoned, broken-down spaces and objects appear, biblical and totalitarian symbols alternate, and in this book they seem to paint a picture of the same metaphysical order. They tell a story of searching for meaning in a post-Christian, post-totalitarian, post-apocalyptic land that still carries the secret of the universe. The author turns us, the viewers, into flâneurs and wanderers, leading us through the muffled spaces of this in-between land. All of this, however, is only one possible depiction of this story. Which raises the question: is there even a right or wrong reading of this book?"
            </blockquote>
            <p className="text-sm font-semibold mb-4">Penko Skumov</p>

            <blockquote className="text-base leading-relaxed mb-6 italic text-muted">
              "Svilen’s approach is strong precisely in its sequencing, through which he shifts attention from the story to the way it is being told. At the same time, this approach carries a risk. When the lack of context becomes a consistent method, it can begin to function more as a predictable style than as an open strategy. The ambiguity becomes expected and loses its element of surprise. In this sense, for me, the more interesting question the book raises is not what we see, but how we become used to looking. Do the images expand our perception of the everyday, or do they simply keep us in a constant state of searching for meaning?"
            </blockquote>
            <p className="text-sm font-semibold">Arslan Ahmedov</p>
          </div>

          {/* Book Details */}
          <div>
            <h1 className="text-2xl font-bold mb-4">The Illusion of Meaning</h1>
            <p className="text-base leading-relaxed mb-4 text-muted">
              First Edition, 2026
            </p>

            <div className="space-y-2 mb-8">
              <p className="text-sm">
                <span className="font-semibold">Format:</span> 30 x 28.5 cm
              </p>
              <p className="text-sm">
                <span className="font-semibold">Pages:</span> 112
              </p>
              <p className="text-sm">
                <span className="font-semibold">Photographs:</span> 57
              </p>
              <p className="text-sm">
                <span className="font-semibold">Cover:</span> Hardcover, pregè on cloth
              </p>
              <p className="text-sm">
                <span className="font-semibold">Language:</span> Bulgarian, English
              </p>
              <p className="text-sm">
                <span className="font-semibold">Published by:</span> Need for Color
              </p>
              <p className="text-sm">
                <span className="font-semibold">ISBN:</span> 978-619-7323-08-5
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.open("https://buy.stripe.com/cNidRbedV6eBan2c1M5ZC00", "_blank")}
                className="px-8 py-3 bg-foreground text-background font-semibold text-base hover:opacity-80 transition-opacity"
              >
                Order Now
              </button>
              <p className="text-sm text-muted">
                €40.00 per copy + shipping
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-12 hidden">
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ckPpy3rqrPU"
            title="Book Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      <div className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-center">
          {[
            {
              filename: "1.contest-lensculture-logo01_tkfu4x",
              src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775160795/1.contest-lensculture-logo01_tkfu4x.jpg",
              alt: "LensCulture contest logo",
            },
            {
              filename: "2.GommaGrant2018Logo_gksxb1",
              src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775160796/2.GommaGrant2018Logo_gksxb1.jpg",
              alt: "Gomma Grant 2018 logo",
            },
            {
              filename: "3.images_1_b3bead",
              src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775160796/3.images_1_b3bead.png",
              alt: "Images 1 logo",
            },
            {
              filename: "4.38808539_443975594835376_6152723884876105181_n_rsn28x",
              src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775160801/4.38808539_443975594835376_6152723884876105181_n_rsn28x.jpg",
              alt: "38808539 logo",
            },
            {
              filename: "5.333226772_1315962138967872_1273215977538980622_n_sj6ugj",
              src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775160802/5.333226772_1315962138967872_1273215977538980622_n_sj6ugj.jpg",
              alt: "333226772 logo",
            },
            {
              filename: "6.EDITEDephemere-mainPNG-1_q06owm",
              src: "https://res.cloudinary.com/dbkvqqpan/image/upload/v1775160807/6.EDITEDephemere-mainPNG-1_q06owm.jpg",
              alt: "EDITEDephemere main logo",
            },
          ]
            .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: "base" }))
            .map((logo, idx) => (
              <div
                key={idx}
                className="border border-border px-4 py-6 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-20 w-auto object-contain opacity-70 md:h-24"
                  loading="lazy"
                  decoding="async"
                />
            </div>
          ))}
        </div>
      </div>

      <div className="pb-8">
        <p className="text-base leading-relaxed mb-4 text-muted text-center">
          „Проектът се реализира в България с финансовата подкрепа на НФ "Култура".“
        </p>
        <div className="flex justify-center">
          <img
            src="https://assets.jobs.bg/assets/logo/2023-04-03/b_d7c1e81aaa26f6e52c993a38a5ad2d25.png"
            alt="НФ Култура"
            className="h-20 w-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
