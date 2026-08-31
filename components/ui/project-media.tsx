'use client'

import Image from 'next/image'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { XIcon } from 'lucide-react'

type ProjectMediaProps = {
  src: string
  /** Descriptive alt text — pass the project name, not "Project screenshot". */
  alt: string
  link?: string
  zoom?: number
  position?: string
  /** Wrap in a zoom dialog when there is no external link. */
  zoomable?: boolean
  /** Set on the first card so Next.js preloads it as the LCP candidate. */
  priority?: boolean
}

const IMAGE_SIZES = '(max-width: 640px) 100vw, 320px'

export function ProjectMedia({
  src,
  alt,
  link,
  zoom = 1,
  position = 'center',
  zoomable = false,
  priority = false,
}: ProjectMediaProps) {
  const isVideo =
    src.endsWith('.mp4') || src.endsWith('.webm') || src.indexOf('cloudinary') !== -1
  const isImage = /\.(jpe?g|png|gif|webp|avif)$/.test(src)

  const mediaClassName = 'rounded-xl object-cover object-center'

  const mediaElement = isVideo ? (
    <div className="aspect-video w-full overflow-hidden rounded-xl">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`h-full w-full ${mediaClassName}`}
        style={{ transform: `scale(${zoom})`, objectPosition: position }}
      />
    </div>
  ) : isImage ? (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={IMAGE_SIZES}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className={mediaClassName}
        style={{ transform: `scale(${zoom})`, objectPosition: position }}
      />
    </div>
  ) : (
    <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800">
      No media available
    </div>
  )

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer transition-opacity hover:opacity-90"
        aria-label={`${alt} — open live site in a new tab`}
      >
        {mediaElement}
      </a>
    )
  }

  if (!zoomable) {
    return mediaElement
  }

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className="cursor-zoom-in">{mediaElement}</div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          {isVideo ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
            />
          ) : isImage ? (
            <div className="relative aspect-video h-[50vh] w-full md:h-[70vh]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="90vw"
                className="rounded-xl object-contain"
              />
            </div>
          ) : (
            <div className="flex aspect-video h-[50vh] w-full items-center justify-center rounded-xl bg-zinc-200 md:h-[70vh] dark:bg-zinc-800">
              No media available
            </div>
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
