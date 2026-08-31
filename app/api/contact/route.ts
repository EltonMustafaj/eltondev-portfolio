import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { env } from '@/app/env'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

const MAX_EMAIL = 254
const MAX_NAME = 100
const MAX_MESSAGE = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Escape user input before it is interpolated into HTML or Discord markdown. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot: a real user never fills a hidden field. Accept silently so bots
    // cannot tell they were rejected.
    if (typeof data?.website === 'string' && data.website.trim() !== '') {
      return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
    }

    const email = typeof data?.email === 'string' ? data.email.trim() : ''
    const name = typeof data?.name === 'string' ? data.name.trim() : ''
    const message = typeof data?.message === 'string' ? data.message.trim() : ''

    if (!email || !EMAIL_RE.test(email) || email.length > MAX_EMAIL) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }
    if (name.length > MAX_NAME || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 })
    }

    const webhookUrl = env.DISCORD_WEBHOOK_URL
    const emailTo = env.EMAIL_TO
    const resendFrom = env.RESEND_FROM || 'Contact Form <onboarding@resend.dev>'

    if (!webhookUrl && !resend) {
      console.error('No notification method configured (DISCORD_WEBHOOK_URL or RESEND_API_KEY)')
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    let discordOk = false
    let emailOk = false

    if (webhookUrl) {
      try {
        const content = [
          '**New Contact Form Submission**',
          `**Email:** ${email}`,
          name && `**Name:** ${name}`,
          message && `**Message:**\n${message}`,
        ]
          .filter(Boolean)
          .join('\n')

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content,
            username: 'Contact Form',
            // Stop a submitted @everyone / @here from pinging the channel.
            allowed_mentions: { parse: [] },
          }),
        })

        if (response.ok) {
          discordOk = true
        } else {
          console.error('Discord API error:', response.status)
        }
      } catch (error) {
        console.error('Discord webhook error:', error)
      }
    }

    if (resend && emailTo) {
      try {
        await resend.emails.send({
          from: resendFrom,
          to: emailTo,
          replyTo: email,
          subject: `New Contact Form: ${name || email}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${name ? `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` : ''}
            ${message ? `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
          `,
          text: [`Email: ${email}`, name && `Name: ${name}`, message && `Message:\n${message}`]
            .filter(Boolean)
            .join('\n'),
        })
        emailOk = true
      } catch (error) {
        console.error('Email sending error:', error)
      }
    }

    if (!discordOk && !emailOk) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
