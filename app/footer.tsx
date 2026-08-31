'use client'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-center">
        <a
          href="https://github.com/EltonMustafaj"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Elton Mustafaj.
          </span>
        </a>
      </div>
    </footer>
  )
}
