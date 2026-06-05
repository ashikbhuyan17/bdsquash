import Link from 'next/link';
import { cn } from '@/lib/utils';

const GALLERY_TILES = ['Photo', 'Photo', 'Photo', 'Photo', 'Photo'] as const;

export function HomeGallery() {
  return (
    <section className="px-4 py-12 sm:px-[5%] md:px-[8%] md:py-20" id="gallery">
      <div className="mb-10 text-center">
        <h2 className="font-bebas text-[38px] leading-none tracking-wide text-white min-[981px]:text-5xl">
          Media Gallery
        </h2>
      </div>

      {/* Same grid as BSRF Homepage.html: 2fr 1fr 1fr × 200px 200px, first tile spans 2 rows */}
      <div
        className={cn(
          'grid gap-3',
          'min-[981px]:grid-cols-[2fr_1fr_1fr] min-[981px]:[grid-template-rows:200px_200px]',
          'max-[980px]:grid-cols-2 max-[980px]:[grid-template-rows:repeat(3,180px)]',
          'max-md:grid-cols-1 max-md:[grid-template-rows:repeat(6,180px)]'
        )}
      >
        {GALLERY_TILES.map((label, index) => (
          <div
            key={index}
            className={cn(
              'group relative cursor-pointer overflow-hidden bg-bsrf-card',
              index === 0 && 'min-[981px]:row-span-2',
              index === 0 && 'max-[980px]:col-span-2 max-[980px]:row-span-1',
              index === 0 && 'max-md:col-span-1'
            )}
          >
            <div
              className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#1f1f1f_0_10px,#232323_10px_20px)] text-xs uppercase tracking-[0.15em] text-bsrf-muted transition-transform duration-300 group-hover:scale-[1.04]"
            >
              {label}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgba(200,244,0,0.12)] opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 text-center">
        <Link
          className="inline-block whitespace-nowrap border border-bsrf-green bg-transparent px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-bsrf-green transition-all hover:bg-bsrf-green hover:text-black"
          href="/media-gallery"
        >
          Explore Full Gallery
        </Link>
      </div>
    </section>
  );
}
