"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { toast } from "sonner"

type CompactConnectFormProps = {
  expandOnMount?: boolean
  alwaysExpanded?: boolean
}

export function CompactConnectForm({ expandOnMount = false, alwaysExpanded = false }: CompactConnectFormProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  // Honeypot — hidden from users, filled in by most bots.
  const [website, setWebsite] = useState("")
  const [isExpanded, setIsExpanded] = useState(expandOnMount || alwaysExpanded)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (expandOnMount || alwaysExpanded) {
      setIsExpanded(true)
      // Focus on email input when expanded
      setTimeout(() => {
        emailInputRef.current?.focus({ preventScroll: true })
      }, 150)
    }
  }, [expandOnMount, alwaysExpanded])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!email.trim()) {
      toast.error("Please enter your email address")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || "Anonymous",
          email: email.trim(),
          message: message.trim() || "No message provided",
          website,
        }),
      })

      const result = await response.json().catch(() => null)

      if (response.ok) {
        toast.success(
          isExpanded
            ? "Your message was sent successfully!"
            : "Thanks for connecting — I'll get back to you soon.",
        )
        setEmail("")
        setName("")
        setMessage("")
        setWebsite("")
        if (!alwaysExpanded) {
          setIsExpanded(false)
        }
      } else {
        const errorMessage = result?.error || "Could not send your message. Please try again."
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error("FormSubmit error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
          />
        </div>
        {!isExpanded ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <Input
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              aria-label="Email address"
              placeholder="your@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full flex-1 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
            />
            <div className="flex w-full items-center sm:w-auto">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:flex-none dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {isSubmitting ? "Sending..." : "Connect"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                onClick={() => setIsExpanded(true)}
              >
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                <span className="sr-only">Add more details</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {!alwaysExpanded && (
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isSubmitting}
                  className="rounded-xl px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  onClick={() => setIsExpanded(false)}
                >
                  <span>Back</span>
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs text-zinc-600 dark:text-zinc-400">
                  Email
                </Label>
                <Input
                  ref={emailInputRef}
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs text-zinc-600 dark:text-zinc-400">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs text-zinc-600 dark:text-zinc-400">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="What would you like to discuss?"
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="min-h-[100px] rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
} 