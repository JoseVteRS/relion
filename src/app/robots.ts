import { MetadataRoute } from "next";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/sign-in/", "/sign-up/"],
      disallow: ["/api/", "/dashboard/"],
    },
    sitemap: "https://relion.app/sitemap.xml",
  };
}
