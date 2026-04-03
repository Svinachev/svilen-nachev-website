import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import * as cheerio from "cheerio";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const handleBookOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      quantity,
      gdprConsent,
      submittedAt
    } = req.body;
    if (!fullName || !email || !address || !city || !postalCode || !country || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }
    if (!gdprConsent) {
      return res.status(400).json({
        success: false,
        message: "GDPR consent is required"
      });
    }
    const emailRegex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex2.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    console.log("Book order received:", {
      orderId,
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      country,
      quantity,
      submittedAt
    });
    const emailContent = `
      <h2>Book Order Confirmation</h2>
      <p>Order ID: ${orderId}</p>
      <p>Submitted: ${new Date(submittedAt).toLocaleString()}</p>
      
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      
      <h3>Shipping Address</h3>
      <p>${address}<br>${city}, ${postalCode}<br>${country}</p>
      
      <h3>Order Details</h3>
      <p><strong>Product:</strong> Street Photography Series Book</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Price per unit:</strong> €85.00</p>
      <p><strong>Total:</strong> €${(parseInt(quantity) * 85).toFixed(2)}</p>
      
      <h3>Compliance</h3>
      <p>GDPR Consent: Yes</p>
      <p>Data Processing Agreement: Accepted</p>
    `;
    console.log("Would send email to:", email);
    console.log("Email content:", emailContent);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return res.json({
      success: true,
      message: "Order submitted successfully. Confirmation email will be sent shortly.",
      orderId
    });
  } catch (error) {
    console.error("Book order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process order. Please try again."
    });
  }
};
const handleLinkPreview = async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL parameter is required" });
  }
  try {
    const urlObj = new URL(url);
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)"
      },
      signal: AbortSignal.timeout(5e3)
      // 5 second timeout
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const title = $('meta[property="og:title"]').attr("content") || $('meta[name="twitter:title"]').attr("content") || $("title").text() || urlObj.hostname;
    const description = $('meta[property="og:description"]').attr("content") || $('meta[name="twitter:description"]').attr("content") || $('meta[name="description"]').attr("content") || "";
    const image = $('meta[property="og:image"]').attr("content") || $('meta[name="twitter:image"]').attr("content") || "";
    const preview = {
      title: title.substring(0, 100),
      // Limit title length
      description: description.substring(0, 200),
      // Limit description
      image,
      url
    };
    res.json(preview);
  } catch (error) {
    console.error("Link preview error:", error);
    res.status(500).json({
      error: "Failed to fetch link preview",
      title: "Preview unavailable",
      description: "Could not load preview for this link",
      image: "",
      url
    });
  }
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalizeInput = (value) => value.replace(/\s+/g, " ").trim();
const handleContact = async (req, res) => {
  try {
    const body = req.body;
    const name = normalizeInput(body.name ?? "");
    const email = normalizeInput(body.email ?? "").toLowerCase();
    const message = normalizeInput(body.message ?? "");
    const website = normalizeInput(body.website ?? "");
    if (website.length > 0) {
      return res.json({
        success: true,
        message: "Message submitted successfully."
      });
    }
    if (name.length < 2 || name.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 120 characters."
      });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
      });
    }
    if (message.length < 10 || message.length > 2e3) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 2000 characters."
      });
    }
    console.log("Contact message received", {
      name,
      email,
      submittedAt: body.submittedAt,
      messageLength: message.length
    });
    return res.json({
      success: true,
      message: "Thank you! Your message has been sent."
    });
  } catch (error) {
    console.error("Contact endpoint error", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message right now. Please try again."
    });
  }
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.post("/api/book-order", handleBookOrder);
  app2.get("/api/link-preview", handleLinkPreview);
  app2.post("/api/contact", handleContact);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname$1 = import.meta.dirname;
const distPath = path.join(__dirname$1, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
