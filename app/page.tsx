'use client'
import { ProjectMedia } from '@/components/ui/project-media'
import { Spotlight } from '@/components/ui/spotlight'
import Image from 'next/image'
import { Download, Github, Linkedin, Mail, XIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState, useRef, useCallback } from 'react'
import {
  PROJECTS,
  WORK,
  EDUCATION
} from './data'
import { CompactConnectForm } from './components/ui/compact-connect-form'
import { Header } from './header'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function CertificateGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const openAt = useCallback((i: number) => { setCurrent(i); setOpen(true) }, [])

  return (
    <>
      <button
        onClick={() => openAt(0)}
        className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs sm:text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        Certificate
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex flex-col items-center gap-3 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-9 right-0 rounded-full bg-white p-1"
            >
              <XIcon className="h-4 w-4 text-zinc-500" />
            </button>
            <Image
              src={images[current]}
              alt={`Certificate ${current + 1} of ${images.length}`}
              width={800}
              height={1160}
              sizes="(max-width: 640px) 90vw, 384px"
              className="w-full max-h-[60vh] rounded-xl object-contain"
            />
            {images.length > 1 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
                  className="rounded-full bg-white/20 px-4 py-1.5 text-sm text-white hover:bg-white/30"
                >
                  ←
                </button>
                <div className="flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 w-2 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % images.length)}
                  className="rounded-full bg-white/20 px-4 py-1.5 text-sm text-white hover:bg-white/30"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default function Personal() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [expandContactForm, setExpandContactForm] = useState(false)
  const [activeEduTab, setActiveEduTab] = useState<'work' | 'education'>('work')
  const contactRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    setExpandContactForm(true)
    // Small delay to ensure form expands before scrolling
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToEducation = () => {
    educationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Header onEducationClick={scrollToEducation} />
      <motion.main
        className="space-y-16 sm:space-y-24"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:items-start">
            <motion.div
              className="h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-2xl ring-2 ring-zinc-200 dark:ring-zinc-800"
            >
              <Image
                src="/newnewpic.webp"
                alt="Portrait of Elton Mustafaj"
                width={160}
                height={160}
                priority
                sizes="(max-width: 768px) 128px, 160px"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                21-year-old Computer Science Student focusing on Software Engineering. I develop as a Full Stack Web and Mobile Developer,
                handling everything from back-end systems to final user interfaces.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a
                  href="/portfolioAL.pdf"
                  download="portfolioAL.pdf"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 text-base font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <span>Resume</span>
                  <Download className="h-4 w-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/eltonmustafaj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                >
                  <Linkedin className="h-5 w-5" />
                </a>

                <a
                  href="https://github.com/EltonMustafaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                >
                  <Github className="h-5 w-5" />
                </a>

                <a
                  href="mailto:eltoni.mustafaj1@gmail.com"
                  aria-label="Email"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={educationRef}
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h2 className="mb-4 sm:mb-5 text-base sm:text-lg font-medium">Work & Education</h2>

          <div className="mb-4 inline-flex rounded-full bg-zinc-100 p-1 text-xs sm:text-sm font-medium dark:bg-zinc-900">
            {[
              { key: 'work', label: 'Work Experience' },
              { key: 'education', label: 'Education' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveEduTab(tab.key as 'work' | 'education')}
                className={`px-3 sm:px-4 py-1.5 rounded-full transition text-xs sm:text-sm ${activeEduTab === tab.key
                  ? 'bg-white text-zinc-900 shadow dark:bg-zinc-800 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30">
            <Spotlight
              className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
              size={64}
            />
            <div className="relative rounded-2xl bg-white ring-1 ring-zinc-200/70 dark:bg-zinc-950 dark:ring-zinc-800/70 divide-y divide-zinc-100 dark:divide-zinc-800/70">
              {(activeEduTab === 'work' ? WORK : EDUCATION).map((item) => (
                <div
                  className="flex gap-3 sm:gap-4 p-4 sm:p-5 transition hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 first:rounded-t-2xl last:rounded-b-2xl"
                  key={item.id}
                >
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-zinc-200/90 dark:bg-zinc-900 dark:ring-zinc-800/80">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={`${'institution' in item ? item.institution : item.company} logo`}
                        width={64}
                        height={64}
                        sizes="64px"
                        className={('company' in item && (item.company === 'Dreshaj Elite Cars' || item.company === 'Maksutaj Malermeisterbetrieb')) ? 'h-full w-full object-cover' : ('institution' in item && item.institution === 'KO-in-EU Project (Erasmus+)') ? 'h-full w-full object-cover' : 'h-10 w-10 sm:h-14 sm:w-14 object-contain'} 
                      />
                    ) : (
                      <div className="text-xs font-medium text-zinc-500">Logo</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 leading-tight">{'program' in item ? item.program : item.role}</h3>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{'institution' in item ? item.institution : item.company}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">{item.start}{item.start !== item.end ? ` - ${item.end}` : ''}</p>
                    </div>
                    {'details' in item && item.details && (
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.details}</p>
                    )}
                    {'summary' in item && item.summary && (
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.summary}</p>
                    )}
                    <div className="pt-1 flex flex-wrap gap-2">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs sm:text-sm font-medium text-white transition hover:bg-zinc-700"
                        >
                          <span>Web</span>
                          <span aria-hidden="true">-&gt;</span>
                        </a>
                      )}
                      {'certificates' in item && item.certificates && item.certificates.length > 0 && (
                        <CertificateGallery images={item.certificates} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={projectsRef}
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <div className="mb-4 sm:mb-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <h2 className="text-base sm:text-lg font-medium">Projects</h2>
            <Link
              href="/projects"
              className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs sm:w-auto sm:text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              View more projects
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {PROJECTS.slice(0, 2).map((project, index) => (
              <div
                key={project.name}
                className={`space-y-2 pb-6 pt-6 sm:px-6 ${index >= 1 ? 'border-t border-zinc-200 dark:border-zinc-800 sm:border-t-0' : ''} ${index >= 2 ? 'sm:border-t sm:border-zinc-200 sm:dark:border-zinc-800' : ''} ${index % 2 === 1 ? 'sm:border-l sm:border-zinc-200 sm:dark:border-zinc-800' : ''} ${index < 2 ? 'pt-0' : ''}`}
              >
                <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                  <ProjectMedia
                    src={project.media}
                    alt={`${project.name} — project screenshot`}
                    link={project.link}
                    zoom={project.mediaZoom}
                    position={project.mediaPosition}
                    zoomable
                    priority={index === 0}
                  />
                </div>
                <div className="px-1">
                  <a
                    className="font-base group relative inline-block font-[450] text-sm sm:text-base text-zinc-900 dark:text-zinc-50"
                    href={project.link}
                    {...(project.linkTab && { target: "_blank" })}
                  >
                    {project.name}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                  </a>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs sm:text-sm font-medium text-white transition hover:bg-zinc-700"
                    >
                      <span>Web</span>
                      <span aria-hidden="true">-&gt;</span>
                    </a>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs sm:text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      >
                        <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={contactRef}
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h2 className="mb-4 sm:mb-5 text-base sm:text-lg font-medium">📬 Get In Touch</h2>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30">
            <Spotlight
              className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
              size={64}
            />
            <div className="relative h-full w-full rounded-[15px] bg-white p-4 sm:p-6 dark:bg-zinc-950">
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Interested in collaborating on a project or just want to connect?
                Feel free to reach out!
              </p>
              <div className="space-y-4">
                <CompactConnectForm expandOnMount={expandContactForm} alwaysExpanded />
              </div>
            </div>
          </div>
        </motion.section>
      </motion.main>
    </>
  )
}
