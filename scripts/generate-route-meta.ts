import { promises as fs } from "node:fs";
import path from "node:path";
import { seriesProjects } from "../client/lib/series-data";

const SITE_URL = "https://svilen-nachev.com";
const OUTPUT_DIR = path.resolve(process.cwd(), "dist/spa");

const sharedPreviewImage =
  "https://res.cloudinary.com/dbkvqqpan/image/upload/v1772976464/Svilen_Nachev_index_41_qatxok.jpg";
const seriesPreviewImage =
  "https://res.cloudinary.com/dbkvqqpan/image/upload/v1772976465/Svilen_Nachev_Futility_01_skrnug.jpg";
const bookPreviewImage =
  "https://res.cloudinary.com/dbkvqqpan/image/upload/v1776795886/Illusion_Book_c0jdem.jpg";

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  image: string;
};

const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim();

const escapeHtmlAttribute = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const upsertTag = (html: string, matcher: RegExp, tag: string) => {
  if (matcher.test(html)) {
    return html.replace(matcher, tag);
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
};

const applyMetaToHtml = (html: string, meta: RouteMeta) => {
  const pageUrl = new URL(meta.route === "/" ? "/" : meta.route, SITE_URL).toString();

  let result = html;

  result = result.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtmlAttribute(meta.title)}</title>`,
  );

  result = upsertTag(
    result,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeHtmlAttribute(meta.description)}" />`,
  );

  result = upsertTag(
    result,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtmlAttribute(pageUrl)}" />`,
  );

  result = upsertTag(
    result,
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtmlAttribute(meta.title)}" />`,
  );

  result = upsertTag(
    result,
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtmlAttribute(meta.description)}" />`,
  );

  result = upsertTag(
    result,
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeHtmlAttribute(pageUrl)}" />`,
  );

  result = upsertTag(
    result,
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${escapeHtmlAttribute(meta.image)}" />`,
  );

  result = upsertTag(
    result,
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtmlAttribute(meta.title)}" />`,
  );

  result = upsertTag(
    result,
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtmlAttribute(meta.description)}" />`,
  );

  result = upsertTag(
    result,
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${escapeHtmlAttribute(meta.image)}" />`,
  );

  return result;
};

const staticRoutes: RouteMeta[] = [
  {
    route: "/",
    title: "Svilen Nachev | Photographer",
    description:
      "Portfolio of photographer Svilen Nachev featuring street photography series and editorial work.",
    image: sharedPreviewImage,
  },
  {
    route: "/series",
    title: "Series | Svilen Nachev",
    description:
      "Browse photography series by Svilen Nachev, including ongoing and archival projects.",
    image: seriesPreviewImage,
  },
  {
    route: "/about",
    title: "About | Svilen Nachev",
    description:
      "Learn more about Svilen Nachev, his background, publications, and exhibitions.",
    image: sharedPreviewImage,
  },
  {
    route: "/contact",
    title: "Contact | Svilen Nachev",
    description:
      "Get in touch with Svilen Nachev for collaborations, exhibitions, and inquiries.",
    image: sharedPreviewImage,
  },
  {
    route: "/book-order",
    title: "Order Book | Svilen Nachev",
    description:
      "Order The Illusion of Meaning by Svilen Nachev and explore book details.",
    image: bookPreviewImage,
  },
];

const projectRoutes: RouteMeta[] = seriesProjects.map((project) => ({
  route: `/series/${project.id}`,
  title: `${project.title} | Svilen Nachev`,
  description: project.description
    ? normalizeText(project.description).slice(0, 220)
    : "Explore selected photographs from Svilen Nachev's series work.",
  image: project.image,
}));

const routeMeta = [...staticRoutes, ...projectRoutes];

async function writeRoutePages() {
  const indexPath = path.join(OUTPUT_DIR, "index.html");
  const baseHtml = await fs.readFile(indexPath, "utf8");

  for (const meta of routeMeta) {
    const html = applyMetaToHtml(baseHtml, meta);

    if (meta.route === "/") {
      await fs.writeFile(indexPath, html, "utf8");
      continue;
    }

    const routeFilePath = path.join(
      OUTPUT_DIR,
      meta.route.replace(/^\//, ""),
      "index.html",
    );

    await fs.mkdir(path.dirname(routeFilePath), { recursive: true });
    await fs.writeFile(routeFilePath, html, "utf8");
  }
}

writeRoutePages().catch((error) => {
  console.error("Failed generating route meta pages", error);
  process.exitCode = 1;
});
