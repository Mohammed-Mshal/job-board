import { getSiteUrl } from "@/lib/siteUrl";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*/admin", "/*/profile", "/*/login", "/*/signup"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
