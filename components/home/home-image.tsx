'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type HomeImageProps = {
  src: string;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
};

const placeholderClass =
  'flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#1f1f1f_0_10px,#232323_10px_20px)] text-xs uppercase tracking-[0.15em] text-bsrf-muted';

export function HomeImage({
  src,
  alt,
  fallbackLabel = 'Photo',
  className = '',
  fill = true,
  priority = false,
}: HomeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className={cn(placeholderClass, className)}>{fallbackLabel}</div>;
  }

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className="object-cover"
        onError={() => setHasError(true)}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
