"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { toast } from "sonner"
import emailjs from '@emailjs/browser'

// EmailJS Configuration - loaded from environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

type CompactConnectFormProps = {
  expandOnMount?: boolean
}

export function CompactConnectForm({ expandOnMount = false }: CompactConnectFormProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(expandOnMount)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (expandOnMount) {
      setIsExpanded(true)
      // Focus on email input when expanded
      setTimeout(() => {
        emailInputRef.current?.focus()
      }, 150)
    }
  }, [expandOnMount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!email.trim()) {
      toast.error("Ju lutem vendosni email adresën tuaj")
      setIsSubmitting(false)
      return
    }

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY)

      // Template parameters - these names must match your EmailJS template
      const templateParams = {
        from_name: name.trim() || 'Anonymous',
        from_email: email.trim(),
        message: message.trim() || 'No message provided',
        to_name: 'Elton Mustafaj',
      }

      console.log('Sending email with params:', templateParams)

      // Send email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      console.log('EmailJS response:', response)

      if (response.status === 200) {
        toast.success(isExpanded ? "Mesazhi juaj u dërgua me sukses!" : "U lidhët me sukses! Do t'ju kontaktoj së shpejti.")
        setEmail("")
        setName("")
        setMessage("")
        setIsExpanded(false)
      } else {
        toast.error("Dështoi dërgimi i mesazhit. Ju lutem provoni përsëri.")
      }
    } catch (error: any) {
      console.error('EmailJS error details:', error)

      if (error?.status === 412) {
        toast.error("Gabim në konfigurimin e template-it. Ju lutem kontaktoni administratorin.", {
          description: "Template-i në EmailJS nuk është konfiguruar saktë."
        })
      } else if (error?.text) {
        toast.error("Gabim në dërgimin e emailit", {
          description: error.text
        })
      } else {
        toast.error("Ndodhi një gabim i papritur. Ju lutem provoni përsëri.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isExpanded ? (
          <div className="flex items-center space-x-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
            />
            <div className="flex items-center">
              <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-1 rounded-xl bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {isSubmitting ? "Sending..." : "Connect"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                onClick={() => setIsExpanded(true)}
              >
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                <span className="sr-only">Add more details</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                className="rounded-xl px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                onClick={() => setIsExpanded(false)}
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                <span>Back</span>
              </Button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs text-zinc-600 dark:text-zinc-400">
                  Email
                </Label>
                <Input
                  ref={emailInputRef}
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs text-zinc-600 dark:text-zinc-400">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs text-zinc-600 dark:text-zinc-400">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="What would you like to discuss?"
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="min-h-[80px] rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
} 