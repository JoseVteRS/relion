import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://relion.app",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://relion.app/es",
          en: "https://relion.app/en",
        },
      },
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://relion.app/es/sign-in",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://relion.app/es/sign-in",
          en: "https://relion.app/en/sign-in",
        },
      },
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://relion.app/es/sign-up",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://relion.app/es/sign-up",
          en: "https://relion.app/en/sign-up",
        },
      },
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://relion.app/es/listas/",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://relion.app/es/listas/",
          en: "https://relion.app/en/listas/",
        },
      },
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://relion.app/es/listas/boda",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://relion.app/es/listas/boda",
          en: "https://relion.app/en/listas/boda",
        },
      },
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://relion.app/es/listas/navidad",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://relion.app/es/listas/navidad",
          en: "https://relion.app/en/listas/navidad",
        },
      },
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
