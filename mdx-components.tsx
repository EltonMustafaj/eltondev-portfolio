import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="mx-auto h-auto max-h-[420px] w-full rounded-xl object-contain"
          />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
  }
}
