import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from 'sonner'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://eltonmustafaj.com'),
  title: {
    default: 'Elton Mustafaj — Full-Stack Developer',
    template: '%s | Elton Mustafaj',
  },
  description:
    'Elton Mustafaj is a Full-Stack Developer from Prishtina, Kosovo, specializing in React, Next.js, Node.js, and React Native. Available for freelance web and mobile projects.',
  keywords: [
    'Elton Mustafaj',
    'Full-Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js',
    'Node.js',
    'React Native',
    'Prishtina',
    'Kosovo',
    'Freelance Developer',
    'Software Engineer',
  ],
  authors: [{ name: 'Elton Mustafaj', url: 'https://eltonmustafaj.com' }],
  creator: 'Elton Mustafaj',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eltonmustafaj.com',
    siteName: 'Elton Mustafaj',
    title: 'Elton Mustafaj — Full-Stack Developer',
    description:
      'Full-Stack Developer from Prishtina, Kosovo. Building modern web and mobile applications with React, Next.js, and Node.js.',
    images: [
      {
        url: '/newnewpic.png',
        width: 1200,
        height: 630,
        alt: 'Elton Mustafaj — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elton Mustafaj — Full-Stack Developer',
    description:
      'Full-Stack Developer from Prishtina, Kosovo. Building modern web and mobile applications.',
    images: ['/newnewpic.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://eltonmustafaj.com',
  },
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Elton Mustafaj',
              url: 'https://eltonmustafaj.com',
              image: 'https://eltonmustafaj.com/newnewpic.png',
              jobTitle: 'Full-Stack Developer',
              description:
                'Full-Stack Developer from Prishtina, Kosovo, specializing in React, Next.js, Node.js, and React Native.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Prishtina',
                addressCountry: 'XK',
              },
              sameAs: [
                'https://github.com/EltonMustafaj',
                'https://www.linkedin.com/in/eltonmustafaj/',
              ],
              knowsAbout: ['React', 'Next.js', 'Node.js', 'React Native', 'TypeScript', 'Supabase', 'PostgreSQL'],
            }),
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-BBMKZLXSYK`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BBMKZLXSYK');
            `,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <Analytics />
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-3 sm:px-4 pt-12 sm:pt-20">
              {children}
              <Footer />
            </div>
          </div>
          <Toaster richColors closeButton position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
