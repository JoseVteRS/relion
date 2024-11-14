import { MetadataRoute } from 'next';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://relion.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: "https://relion.app/sign-up",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://relion.app/sign-in",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}

