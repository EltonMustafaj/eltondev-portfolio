'use client'

import { CompactConnectForm } from '@/app/components/ui/compact-connect-form'
import { Spotlight } from '@/components/ui/spotlight'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <>
      <header className="mb-8 flex items-center justify-end">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Back to home
        </Link>
      </header>
      <main className="space-y-8">
        <section>
          <h1 className="mb-4 text-xl sm:text-2xl font-semibold">📬 Get In Touch</h1>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30">
            <Spotlight
              className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
              size={64}
            />
            <div className="relative h-full w-full rounded-[15px] bg-white p-4 sm:p-6 dark:bg-zinc-950">
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Interested in collaborating on a project or just want to connect? Feel free to reach out!
              </p>
              <CompactConnectForm alwaysExpanded />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
