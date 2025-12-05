'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

type HeaderProps = {
  onContactClick?: () => void
  onProjectsClick?: () => void
  onEducationClick?: () => void
}

export function Header({ onContactClick, onProjectsClick, onEducationClick }: HeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="text-xl font-semibold text-black dark:text-white md:text-2xl lg:text-3xl">
          Elton Mustafaj
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Full-Stack Developer
        </TextEffect>
      </div>
      <nav className="flex items-center gap-4 text-sm md:gap-6">
        <button
          onClick={onProjectsClick}
          className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Projects
        </button>
        <button
          onClick={onEducationClick}
          className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Education & Practice
        </button>
        <button
          onClick={onContactClick}
          className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Contact
        </button>
      </nav>
    </header>
  )
}
