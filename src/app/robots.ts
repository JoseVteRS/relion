import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/es",
        "/en",
        "/es/sign-in/",
        "/en/sign-in/",
        "/es/sign-up/",
        "/en/sign-up/",
        "/es/listas/boda",
        "/es/listas/cumpleanos",
        "/es/listas/navidad",
      ],
      disallow: ["/api/", "/api/*", "/dashboard/", "/dashboard/*"],
    },
    sitemap: "https://relion.app/sitemap.xml",
    host: "https://relion.app/",
  };
}
