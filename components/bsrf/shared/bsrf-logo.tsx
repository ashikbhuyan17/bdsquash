import Image from 'next/image';
import { cn } from '@/lib/utils';

type BsrfLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BsrfLogo({ className, priority = false }: BsrfLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Bangladesh Squash Rackets Federation"
      width={96}
      height={36}
      priority={priority}
      className={cn('h-8 w-auto sm:h-9', className)}
    />
  );
}
