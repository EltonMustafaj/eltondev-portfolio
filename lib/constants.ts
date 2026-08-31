export const WEBSITE_URL = 'https://eltonmustafaj.com'

/**
 * Next.js replaces the whole `openGraph` object when a child page defines one —
 * it does not merge with the root layout. Spread these into every page that sets
 * its own `openGraph`, or the share card loses its image.
 */
export const OG_DEFAULTS = {
  type: 'website' as const,
  locale: 'en_US',
  siteName: 'Elton Mustafaj',
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Elton Mustafaj — Full-Stack Developer',
    },
  ],
}
