'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type HeaderProps = {
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

export function Header({ onEducationClick }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between sm:block">
          <div>
            <h1 className="text-xl font-semibold text-black md:text-2xl lg:text-3xl dark:text-white">
              <Link href="/">Elton Mustafaj</Link>
            </h1>
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
        <div className="flex w-full items-center justify-start gap-4 sm:w-auto sm:justify-between sm:gap-6">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:gap-4 sm:text-sm md:gap-6">
            <Link
              href="/projects"
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Projects
            </Link>
            <button
              onClick={onEducationClick}
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Work & Education
            </button>
            <Link
              href="/contact"
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Contact
            </Link>
          </nav>
          <div className="hidden sm:block">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}
