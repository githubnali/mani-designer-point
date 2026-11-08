import type { ImageAsset } from '../../types'
import { cn } from '../../utils/cn'

type ResponsiveImageProps = {
  image: ImageAsset
  alt?: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  width?: number
  height?: number
}

export function ResponsiveImage({
  image,
  alt,
  className,
  imgClassName,
  sizes = '100vw',
  priority = false,
  width,
  height,
}: ResponsiveImageProps) {
  return (
    <picture className={cn('block', className)}>
      <source
        type="image/avif"
        srcSet={`${image.base}-640.avif 640w, ${image.base}-1280.avif 1280w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${image.base}-640.webp 640w, ${image.base}-1280.webp 1280w`}
        sizes={sizes}
      />
      <img
        src={`${image.base}-1280.webp`}
        alt={alt ?? image.alt}
        width={width ?? image.width}
        height={height ?? image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('block h-full w-full object-cover', imgClassName)}
      />
    </picture>
  )
}
