import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { EVENTS } from "@/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/watch",
    "/ministries",
    "/events",
    "/connect",
    "/give",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));

  const eventRoutes = EVENTS.map((event) => ({
    url: `${SITE.url}/events/${event.slug}`,
    lastModified: new Date(event.date),
  }));

  return [...staticRoutes, ...eventRoutes];
}
