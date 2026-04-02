import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleBookOrder } from "./routes/book-order";
import { handleLinkPreview } from "./routes/link-preview";
import { handleContact } from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Book order endpoint
  app.post("/api/book-order", handleBookOrder);

  // Link preview endpoint
  app.get("/api/link-preview", handleLinkPreview);

  // Contact endpoint
  app.post("/api/contact", handleContact);

  return app;
}
