import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { seriesProjectMap } from "@/lib/series-data";
import Header from "./components/Header";
import Index from "./pages/Index";
import Series from "./pages/Series";
import SeriesDetail from "./pages/SeriesDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookOrder from "./pages/BookOrder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const sharedPreviewImage =
  "https://res.cloudinary.com/dbkvqqpan/image/upload/v1772976464/Svilen_Nachev_index_41_qatxok.jpg";
const seriesPreviewImage =
  "https://res.cloudinary.com/dbkvqqpan/image/upload/v1772976465/Svilen_Nachev_Futility_01_skrnug.jpg";
const bookPreviewImage =
  "https://res.cloudinary.com/dbkvqqpan/image/upload/v1776795886/Illusion_Book_c0jdem.jpg";

function ImageProtection() {
  useEffect(() => {
    let messageTimeout: number | null = null;
    let messageElement: HTMLDivElement | null = null;

    const removeMessage = () => {
      if (messageTimeout) {
        window.clearTimeout(messageTimeout);
        messageTimeout = null;
      }

      if (messageElement) {
        messageElement.remove();
        messageElement = null;
      }
    };

    const showMessage = (x: number, y: number) => {
      removeMessage();

      const notice = document.createElement("div");
      notice.textContent =
        "This image is copyrighted by © Svilen Nachev. All rights reserved.";
      notice.style.position = "fixed";
      notice.style.left = `${x + 12}px`;
      notice.style.top = `${y + 12}px`;
      notice.style.maxWidth = "280px";
      notice.style.padding = "8px 10px";
      notice.style.background = "rgba(255,255,255,0.98)";
      notice.style.border = "1px solid rgba(0,0,0,0.2)";
      notice.style.color = "#000";
      notice.style.fontSize = "12px";
      notice.style.lineHeight = "1.4";
      notice.style.pointerEvents = "none";
      notice.style.zIndex = "9999";
      notice.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";

      document.body.appendChild(notice);
      messageElement = notice;

      messageTimeout = window.setTimeout(() => {
        removeMessage();
      }, 2200);
    };

    const isImageTarget = (target: EventTarget | null): boolean => {
      return target instanceof HTMLElement && Boolean(target.closest("img"));
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (!isImageTarget(event.target)) return;

      event.preventDefault();
      showMessage(event.clientX, event.clientY);
    };

    const handleDragStart = (event: DragEvent) => {
      if (!isImageTarget(event.target)) return;

      event.preventDefault();
    };

    const handleSelectStart = (event: Event) => {
      if (!isImageTarget(event.target)) return;

      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart", handleDragStart, true);
    document.addEventListener("selectstart", handleSelectStart, true);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart", handleDragStart, true);
      document.removeEventListener("selectstart", handleSelectStart, true);
      removeMessage();
    };
  }, []);

  return null;
}

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const getRouteMeta = (rawPathname: string) => {
      const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/+$/, "") : rawPathname;

      if (pathname.startsWith("/series/") && pathname !== "/series") {
        const projectId = pathname.replace("/series/", "").split("/")[0];
        const project = seriesProjectMap[projectId];

        return {
          title: project
            ? `${project.title} | Svilen Nachev`
            : "Series Detail | Svilen Nachev",
          description: project?.description
            ? project.description.slice(0, 220)
            : "Explore selected photographs from Svilen Nachev's series work.",
          image: project?.image || sharedPreviewImage,
        };
      }

      switch (pathname) {
        case "/":
          return {
            title: "Svilen Nachev | Photographer",
            description:
              "Portfolio of photographer Svilen Nachev featuring street photography series and editorial work.",
            image: sharedPreviewImage,
          };
        case "/series":
          return {
            title: "Series | Svilen Nachev",
            description:
              "Browse photography series by Svilen Nachev, including ongoing and archival projects.",
            image: seriesPreviewImage,
          };
        case "/about":
          return {
            title: "About | Svilen Nachev",
            description:
              "Learn more about Svilen Nachev, his background, publications, and exhibitions.",
            image: sharedPreviewImage,
          };
        case "/contact":
          return {
            title: "Contact | Svilen Nachev",
            description:
              "Get in touch with Svilen Nachev for collaborations, exhibitions, and inquiries.",
            image: sharedPreviewImage,
          };
        case "/book-order":
          return {
            title: "Order Book | Svilen Nachev",
            description:
              "Order The Illusion of Meaning by Svilen Nachev and explore book details.",
            image: bookPreviewImage,
          };
        default:
          return {
            title: "Page Not Found | Svilen Nachev",
            description: "The page you are looking for could not be found.",
            image: sharedPreviewImage,
          };
      }
    };

    const upsertMetaByName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const upsertMetaByProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const { title, description, image } = getRouteMeta(location.pathname);
    const pageUrl = `${window.location.origin}${location.pathname}`;
    const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

    document.title = title;
    upsertMetaByName("description", description);
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", pageUrl);
    upsertMetaByProperty("og:image", imageUrl);
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", imageUrl);

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ImageProtection />
        <RouteMetadata />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 overflow-hidden flex flex-col items-center justify-center">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/series" element={<Series />} />
              <Route path="/series/:id" element={<SeriesDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-order" element={<BookOrder />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
