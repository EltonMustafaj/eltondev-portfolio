import { MetadataRoute } from 'next'

/**
 * Update the date for a route when its content actually changes. Using
 * `new Date()` here would stamp every deploy as a content change, and Google
 * stops trusting `lastmod` once it always says "just now".
 */
const ROUTES = [
  { path: '', lastModified: '2026-08-31', changeFrequency: 'monthly', priority: 1 },
  { path: '/projects', lastModified: '2026-08-31', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', lastModified: '2026-08-31', changeFrequency: 'yearly', priority: 0.5 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `https://eltonmustafaj.com${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  }))
}
