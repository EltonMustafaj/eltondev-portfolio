'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type HeaderProps = {
  onContactClick?: () => void
  onProjectsClick?: () => void
  onEducationClick?: () => void
}


function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
      type="button"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  )
}

export function Header({ onContactClick, onProjectsClick, onEducationClick }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between sm:block">
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
          <div className="sm:hidden">
            <ThemeSwitch />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <nav className="flex items-center gap-3 text-sm sm:gap-4 md:gap-6">
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
              Work & Education
            </button>
            <button
              onClick={onContactClick}
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Contact
            </button>
          </nav>
          <div className="hidden sm:block">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}
