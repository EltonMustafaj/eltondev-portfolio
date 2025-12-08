'use client'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { Spotlight } from '@/components/ui/spotlight'
import { Github, XIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, useRef } from 'react'
import {
  PROJECTS,
  SOCIAL_LINKS,
  EDUCATION,
  PRACTICE
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

type ProjectMediaProps = {
  src: string
  link?: string
}

function ProjectMedia({ src, link }: ProjectMediaProps) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.indexOf('cloudinary') !== -1;
  const isImage = src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png') || src.endsWith('.gif') || src.endsWith('.webp');

  const mediaElement = isVideo ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="aspect-video w-full rounded-xl"
    />
  ) : isImage ? (
    <img
      src={src}
      alt="Project screenshot"
      className="aspect-video w-full rounded-xl object-cover"
    />
  ) : (
    <div className="aspect-video w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
      No media available
    </div>
  )

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer transition-opacity hover:opacity-90"
      >
        {mediaElement}
      </a>
    )
  }

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className="cursor-zoom-in">
          {mediaElement}
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          {isVideo ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
            />
          ) : isImage ? (
            <img
              src={src}
              alt="Project screenshot"
              className="aspect-video h-[50vh] w-full rounded-xl object-contain md:h-[70vh]"
            />
          ) : (
            <div className="aspect-video h-[50vh] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center md:h-[70vh]">
              No media available
            </div>
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target='_black'
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [expandContactForm, setExpandContactForm] = useState(false)
  const [activeEduTab, setActiveEduTab] = useState<'education' | 'practice'>('education')
  const contactRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    setExpandContactForm(true)
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToEducation = () => {
    educationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Header onContactClick={scrollToContact} onProjectsClick={scrollToProjects} onEducationClick={scrollToEducation} />
      <motion.main
        className="space-y-24"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <motion.img
            src="/profile.png"
            alt="Elton Mustafaj"
            className="h-40 w-40 rounded-2xl object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <div className="flex-1">
            <p className="text-zinc-600 dark:text-zinc-400">
              21-year-old Computer Science Student focusing on Software Engineering. I develop as a Full Stack Web and Mobile Developer,
              handling everything from back-end systems to final user interfaces.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={contactRef}
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">📬 Get In Touch</h3>
        <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30">
          <Spotlight
            className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
            size={64}
          />
          <div className="relative h-full w-full rounded-[15px] bg-white p-6 dark:bg-zinc-950">
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Interested in collaborating on a project or just want to connect?
              Feel free to reach out!
            </p>
            <div className="space-y-4">
              <CompactConnectForm expandOnMount={expandContactForm} />
              <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-500">Connect with me</p>
                <div className="flex items-center justify-start space-x-3">
                  {SOCIAL_LINKS.map((link) => (
                    <MagneticSocialLink key={link.label} link={link.link}>
                      {link.label}
                    </MagneticSocialLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={projectsRef}
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectMedia src={project.media} link={project.link} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  {...(project.linkTab && { target: "_blank" })}
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                {project.githubLink && (
                  <div className="pt-2">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      <Github className="h-4 w-4" />
                      <span>View on GitHub</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        ref={educationRef}
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Education & Practice</h3>

        <div className="mb-4 inline-flex rounded-full bg-zinc-100 p-1 text-sm font-medium dark:bg-zinc-900">
          {[
            { key: 'education', label: 'Education' },
            { key: 'practice', label: 'Practice' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveEduTab(tab.key as 'education' | 'practice')}
              className={`px-4 py-1.5 rounded-full transition text-sm ${
                activeEduTab === tab.key
                  ? 'bg-white text-zinc-900 shadow dark:bg-zinc-800 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {(activeEduTab === 'education' ? EDUCATION : PRACTICE).map((item) => (
            <a
              className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-600/30"
              href={item.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-zinc-200/70 dark:bg-zinc-950 dark:ring-zinc-800/70">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-zinc-200/90 dark:bg-zinc-900 dark:ring-zinc-800/80">
                  {item.logo ? (
                    <img src={item.logo} alt={'institution' in item ? item.institution : item.company} className="h-14 w-14 object-contain" />
                  ) : (
                    <div className="text-xs font-medium text-zinc-500">Logo</div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div>
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{'program' in item ? item.program : item.role}</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{'institution' in item ? item.institution : item.company}</p>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{item.start} - {item.end}</p>
                  </div>
                  {'details' in item && item.details && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.details}</p>
                  )}
                  {'summary' in item && item.summary && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.summary}</p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Accomplishments</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section> */}

      </motion.main>
    </>
  )
}
