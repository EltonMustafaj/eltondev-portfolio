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
  certificates?: string[]
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
    name: 'Dreshaj Elite Cars',
    description: 'Designed an automated data pipeline using a custom scraper to fetch Encar.com listings, storing them in a Supabase database and displaying them via a high-performance Next.js UI.',
    link: 'https://www.dreshajelitecars.com/',
    linkTab: true,
    media: '/assets/dreshaj.webp',
    mediaType: 'image',
    id: 'project-dreshaj',
  },
  {
    name: 'Maler Maksutaj',
    description: 'A modern and professional website for painting services, featuring a clean design and responsive interface.',
    link: 'https://www.maler-maksutaj.at/',
    linkTab: true,
    media: '/assets/maler.webp',
    mediaType: 'image',
    id: 'project-maler',
  },
  {
    name: 'Veturaime',
    description: 'Modern web platform for Veturaime with a clean browsing experience and responsive interface.',
    link: 'https://veturaime.online',
    linkTab: true,
    media: '/assets/veturaime.webp',
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
    media: '/assets/fronbar.webp',
    mediaType: 'image',
    id: 'project2',
  }
]

export const WORK: PracticeItem[] = [
  {
    company: 'Dreshaj Elite Cars',
    role: 'Full Stack Web Developer',
    start: 'Apr 2026',
    end: 'May 2026',
    link: 'https://www.dreshajelitecars.com/',
    logo: '/assets/dreshaj.webp',
    summary: 'Built a custom full-stack web application for an auto dealership importing cars from Korea. Designed an automated data pipeline using a custom scraper to fetch Encar.com listings, storing them in a Supabase database and displaying them via a high-performance Next.js UI.',
    id: 'work-dreshaj',
  },
  {
    company: 'Maksutaj Malermeisterbetrieb',
    role: 'Web Developer',
    start: 'May 2026',
    end: 'May 2026',
    link: 'https://www.maler-maksutaj.at/',
    logo: '/assets/maler.webp',
    summary: 'A modern and professional website for painting services, featuring a clean design and responsive interface.',
    id: 'work-maler',
  },
  {
    company: 'QKUK (Main University Clinical Center of Kosovo)',
    role: 'Software Developer (Patient Management System)',
    start: 'Jun 2025',
    end: 'Mar 2026',
    link: 'https://shskuk.rks-gov.net/',
    logo: '/assets/qkuk.webp',
    summary: 'Developing a Patient Management System for QKUK using React (Vite) and Node.js.',
    id: 'work-qkuk',
  },
]

export const EDUCATION: EducationItem[] = [
  {
    institution: 'AAB College',
    program: 'Computer Science - Software Engineering',
    start: '2023',
    end: '2026',
    link: 'https://www.aab-edu.net/',
    logo: '/assets/aab.webp',
    details: "Bachelor's degree in Computer Science with a focus on Software Engineering, built on coursework and hands-on projects.",
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
  {
    institution: 'KO-in-EU Project (Erasmus+)',
    program: 'Assistant Tech — EU Integration Hackathon',
    start: 'May 2026',
    end: 'May 2026',
    logo: '/assets/erasmus-logo.webp',
    details: 'Assisted as tech support during a 3-day hackathon co-funded by Erasmus+. Mixed teams of CS and Public Administration students built web solutions on Kosovo\'s EU integration.',
    certificates: ['/assets/certificate-2.webp'],
    id: 'edu-erasmus',
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
    link: '/portfolioAL.pdf',
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

