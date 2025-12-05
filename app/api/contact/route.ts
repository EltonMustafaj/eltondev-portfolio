import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from '@/app/lib/rate-limiter'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'anonymous'
    const rateLimitResult = rateLimiter.isRateLimited(ip)

    if (rateLimitResult.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const data = await request.json()
    const { email, name, message } = data

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if at least one notification method is configured
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    const emailTo = process.env.EMAIL_TO
    
    if (!webhookUrl && !resend) {
      console.error('No notification method configured (DISCORD_WEBHOOK_URL or RESEND_API_KEY)')
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    const errors: string[] = []

    // Send via Discord webhook if configured
    if (webhookUrl) {
      try {
        const content = [
          `**New Contact Form Submission**`,
          `**Email:** ${email}`,
          name && `**Name:** ${name}`,
          message && `**Message:**\n${message}`,
        ]
          .filter(Boolean)
          .join('\n')

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            username: 'Contact Form',
            avatar_url: 'https://iamzub.in/favicon.ico',
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Discord API Error:', errorData)
          errors.push('Discord notification failed')
        }
      } catch (error) {
        console.error('Discord webhook error:', error)
        errors.push('Discord notification failed')
      }
    }

    // Send via email if configured
    if (resend && emailTo) {
      try {
        await resend.emails.send({
          from: 'Contact Form <onboarding@resend.dev>',
          to: emailTo,
          replyTo: email,
          subject: `New Contact Form: ${name || email}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Email:</strong> ${email}</p>
            ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
            ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
          `,
        })
      } catch (error) {
        console.error('Email sending error:', error)
        errors.push('Email notification failed')
      }
    }

    // If all methods failed, return error
    if (errors.length > 0 && (!webhookUrl || errors.includes('Discord notification failed')) && (!resend || errors.includes('Email notification failed'))) {
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        remaining: rateLimitResult.remaining
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 