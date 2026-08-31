import type { Metadata } from 'next'
import { OG_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Elton Mustafaj — Full-Stack Developer in Prishtina, Kosovo. Available for freelance web and mobile projects.',
  alternates: {
    canonical: 'https://eltonmustafaj.com/contact',
  },
  openGraph: {
    ...OG_DEFAULTS,
    title: 'Contact | Elton Mustafaj',
    description:
      'Get in touch with Elton Mustafaj — Full-Stack Developer in Prishtina, Kosovo.',
    url: 'https://eltonmustafaj.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
