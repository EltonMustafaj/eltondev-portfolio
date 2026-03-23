type Project = {
  name: string
  description: string
  link: string
  githubLink?: string
  linkTab?: boolean
  media: string
  mediaType?: 'image' | 'video'
  mediaZoom?: number
  mediaPosition?: string
  id: string
}

type EducationItem = {
  institution: string
  program: string
  start: string
  end: string
  link?: string
  logo?: string
  details?: string
  id: string
}

type PracticeItem = {
  company: string
  role: string
  start: string
  end: string
  link?: string
  logo?: string
  summary?: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type CaseStudy = {
  title: string
  description: string
  link: string
  image: string
  tags: string[]
  id: string
}

type SocialLink = {
  label: string
  link: string
}

type Skill = {
  name: string
  category: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Veturaime',
    description: 'Modern web platform for Veturaime with a clean browsing experience and responsive interface.',
    link: 'https://veturaime.online',
    linkTab: true,
    media: '/assets/veturaime.jpg',
    mediaType: 'image',
    mediaZoom: 1.4,
    mediaPosition: '58% center',
    id: 'project1',
  },
  {
    name: 'FronBar',
    description: 'A modern, interactive website for Fron Bar, a local business in Istog, Kosovo. Features a digital menu, smooth animations, and an optimized mobile experience.',
    link: 'https://fronbar.vercel.app/',
    githubLink: 'https://github.com/EltonMustafaj/Fron',
    linkTab: true,
    media: '/assets/fronbar.png',
    mediaType: 'image',
    id: 'project2',
  },
  {
    name: 'Pepsi Albania',
    description: 'Modern, interactive product showcase website for Pepsi with smooth animations and engaging user experience.',
    link: 'https://pepsi-peach.vercel.app/',
    githubLink: 'https://github.com/EltonMustafaj/Pepsi',
    linkTab: true,
    media: '/assets/pepsi.jpg',
    mediaType: 'image',
    id: 'project3',
  }
]

export const WORK: PracticeItem[] = [
  {
    company: 'QKUK (Main University Clinical Center of Kosovo)',
    role: 'Software Developer (Patient Management System)',
    start: 'Jun 2025',
    end: 'Present',
    link: 'https://shskuk.rks-gov.net/',
    logo: '/assets/qkuk.jpg',
    summary: 'Developing a Patient Management System for QKUK using React (Vite) and Node.js.',
    id: 'work-qkuk',
  },
]

export const EDUCATION: EducationItem[] = [
  {
    institution: 'AAB College',
    program: 'Computer Science - Software Engineering (Year 3)',
    start: '2023',
    end: '2026',
    link: 'https://www.aab-edu.net/',
    logo: '/assets/aab.jpg',
    details: 'Bachelor studies focused on Software Engineering coursework and projects.',
    id: 'edu-aab',
  },
  {
    institution: 'Tectigon Academy',
    program: 'Full Stack Web Development (3-month bootcamp)',
    start: '15 Dec 2024',
    end: '15 Mar 2025',
    link: 'https://tectigonacademy.com',
    logo: '/assets/tectigon.jpg',
    details: 'Completed a full-stack program covering frontend, backend, deployment; certified in Full Stack.',
    id: 'edu-tectigon',
  },
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Pepsi Albania - Interactive Product Showcase',
    description: 'Modern, interactive product showcase website for Pepsi with smooth animations and engaging user experience.',
    link: '/case-studies/pepsi',
    image: '/assets/pepsi-showcase.jpg',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    id: 'case-pepsi',
  },
  {
    title: 'Stock Desk - Internal Stock Management System',
    description: 'Internal stock lookup and booking system for a multi-store furniture brand to solve stock coordination issues.',
    link: '/case-studies/stock-desk',
    image: '/assets/F3/ScreenShot4.png',
    tags: ['React', 'Node.js', 'ERP Integration'],
    id: 'case-stock',
  },
  {
    title: 'FFreed - Account Abstraction SDK',
    description: 'Developer-friendly SDK for Ethereum account abstraction with wallet-less onboarding and gas sponsorship.',
    link: '/case-studies/ffreed',
    image: '/assets/ffreed-image.jpg',
    tags: ['Web3', 'ERC-4337', 'SDK'],
    id: 'case-ffreed',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Built dev tools for deploying contracts without gas or keys',
    description: 'Integrated OAuth-based private key schemes',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Built cross-chain tools using PolygonZkEVM, EVM bridges',
    description: 'Worked on security hooks for Hyperlane',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'Deployed ERC721/1155 contracts, built governance + relayers',
    description: 'Built React token grid UI for on-chain collections',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    link: 'https://github.com/EltonMustafaj',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/eltonmustafaj/',
  },
  {
    label: 'Email',
    link: 'mailto:eltoni.mustafaj1@gmail.com',
  },
  {
    label: 'Resume',
    link: '/portfolioAL%20(3).pdf',
  },
]

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'React Native', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },

  // Backend & Database
  { name: 'Supabase', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },

  // Mobile Development
  { name: 'Expo Go', category: 'Mobile' },
  { name: 'React Native', category: 'Mobile' },

  // Tools & Others
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
]

