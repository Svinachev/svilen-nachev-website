import { RequestHandler } from "express";
import * as cheerio from "cheerio";

export interface LinkPreview {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const handleLinkPreview: RequestHandler = async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Validate URL
    const urlObj = new URL(url);

    // Fetch the page
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)",
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract Open Graph data
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text() ||
      urlObj.hostname;

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";

    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";

    const preview: LinkPreview = {
      title: title.substring(0, 100), // Limit title length
      description: description.substring(0, 200), // Limit description
      image,
      url,
    };

    res.json(preview);
  } catch (error) {
    console.error("Link preview error:", error);
    res.status(500).json({
      error: "Failed to fetch link preview",
      title: "Preview unavailable",
      description: "Could not load preview for this link",
      image: "",
      url,
    });
  }
};