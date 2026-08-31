import { Metadata } from 'next'
import { PROJECTS } from '@/app/data'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { ProjectMedia } from '@/components/ui/project-media'
import { OG_DEFAULTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A collection of web and mobile projects built by Elton Mustafaj — including full-stack apps, business websites, and interactive UIs.',
  alternates: {
    canonical: 'https://eltonmustafaj.com/projects',
  },
  openGraph: {
    ...OG_DEFAULTS,
    title: 'Projects | Elton Mustafaj',
    description:
      'A collection of web and mobile projects built by Elton Mustafaj — full-stack apps, business websites, and interactive UIs.',
    url: 'https://eltonmustafaj.com/projects',
  },
}


export default function ProjectsPage() {
  return (
    <main className="space-y-6">
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold">All Projects</h1>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-700 sm:w-auto sm:text-sm"
        >
          Back to home
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
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
                priority={index < 2}
              />
            </div>
            <div className="px-1">
              <h2 className="text-sm sm:text-base font-[450]">
                <a
                  className="font-base group relative inline-block text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  {...(project.linkTab && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
              </h2>
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
    </main>
  )
}
