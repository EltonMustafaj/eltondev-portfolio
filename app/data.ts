type Project = {
  name: string
  description: string
  link: string
  githubLink?: string
  linkTab?: boolean
  media: string
  mediaType?: 'image' | 'video'
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
    name: 'JobPlatform',
    description: 'A mobile job platform built with React Native, Supabase, and Expo Go. Connects job seekers with employers seamlessly.',
    link: 'https://github.com/EltonMustafaj/JobPlatform',
    githubLink: 'https://github.com/EltonMustafaj/JobPlatform',
    linkTab: true,
    media: '/assets/jobplatform.jpg',
    mediaType: 'image',
    id: 'project1',
  },
  {
    name: 'DigitalCar',
    description: 'Digital car documentation app using React Native, Supabase, and Expo Go. Manage vehicle documents on the go.',
    link: 'https://github.com/EltonMustafaj/DigitalCar',
    githubLink: 'https://github.com/EltonMustafaj/DigitalCar',
    linkTab: true,
    media: '/assets/digitalcar.jpg',
    mediaType: 'image',
    id: 'project2',
  },
  {
    name: 'Weather Web',
    description: 'A weather web application built with React and JavaScript. Get real-time weather updates for any location.',
    link: 'https://weatherapp-xi-inky.vercel.app/',
    githubLink: 'https://github.com/EltonMustafaj/weatherapp',
    linkTab: true,
    media: '/assets/weather.jpg',
    mediaType: 'image',
    id: 'project3',
  },
  {
    name: 'KosovaBestPlace',
    description: 'Tourism website showcasing the best places in Kosovo. Built with React featuring interactive maps and galleries.',
    link: 'https://turizmikosova.netlify.app/',
    githubLink: 'https://github.com/EltonMustafaj/weatherapp',
    linkTab: true,
    media: '/assets/kosovo.jpg',
    mediaType: 'image',
    id: 'project4',
  },
  {
    name: 'NikeShoes',
    description: 'Full-stack e-commerce platform for Nike shoes. Built with React and Supabase with complete shopping functionality.',
    link: 'https://agent-6934811a86dfbe44e5e6a875--nikeshoes123.netlify.app/',
    githubLink: 'https://github.com/EltonMustafaj/weatherapp',
    linkTab: true,
    media: '/assets/nike.jpg',
    mediaType: 'image',
    id: 'project5',
  },
  {
    name: 'Pepsi Albania',
    description: 'Modern, interactive product showcase website for Pepsi with smooth animations and engaging user experience.',
    link: 'https://pepsi-peach.vercel.app/',
    githubLink: 'https://github.com/EltonMustafaj/Pepsi',
    linkTab: true,
    media: '/assets/pepsi.jpg',
    mediaType: 'image',
    id: 'project6',
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
    link: 'https://www.linkedin.com/in/elton-mustafaj-355ba5397/',
  },
  {
    label: 'Email',
    link: 'mailto:eltoni.mustafaj1@gmail.com',
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

