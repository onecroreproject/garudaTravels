'use client';

import Image from 'next/image';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 75,
  priority = false,
  className = '',
  ...props
}) {
  // Extract the base path and extension
  const [basePath, extension] = src.split('.');
  const avifSrc = `${basePath}.avif`;
  const webpSrc = `${basePath}.webp`;
  const fallbackSrc = `${basePath}.${extension}`;

  return (
    <picture>
      {/* AVIF format (best compression) */}
      <source
        srcSet={`${avifSrc}?w=${width}&q=${quality}&format=avif`}
        type="image/avif"
      />
      {/* WebP format (good compression, wider support) */}
      <source
        srcSet={`${webpSrc}?w=${width}&q=${quality}&format=webp`}
        type="image/webp"
      />
      {/* Fallback to original format */}
      <Image
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        className={className}
        {...props}
      />
    </picture>
  );
}
