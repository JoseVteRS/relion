import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/es",
        "/en",
        "/es/sign-in/",
        "/en/sign-in/",
        "/es/sign-up/",
        "/en/sign-up/",
        "/es/blog/",
        "/es/blog/*",
      ],
      disallow: ["/api/", "/dashboard/"],
    },
    sitemap: "https://relion.app/sitemap.xml",
  };
}
