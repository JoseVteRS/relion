import { MetadataRoute } from 'next';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://relion.app/es/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://relion.app/en/',
      lastModified: new Date(), 
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: "https://relion.app/es/sign-up",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://relion.app/en/sign-up",
      lastModified: new Date(),
      changeFrequency: "monthly", 
      priority: 0.8,
    },
    {
      url: "https://relion.app/es/sign-in",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://relion.app/en/sign-in",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://relion.app/es/listas/boda",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://relion.app/es/listas/navidad",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
