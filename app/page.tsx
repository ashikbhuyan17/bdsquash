import type { Metadata } from 'next';
import { BsrfHome } from '@/components/home/bsrf-home';
import {
  getFallbackHeroSlides,
  HERO_GALLERY_SLIDE_COUNT,
  mapGalleryItemsToHeroSlides,
} from '@/lib/home/hero-gallery';
import { fetchPublicMediaGallery } from '@/lib/media-gallery';

export const metadata: Metadata = {
  title:
    'Bangladesh Squash Rackets Federation (BSRF) — National Squash Body',
  description:
    'The Bangladesh Squash Rackets Federation (BSRF) is the national governing body for squash in Bangladesh, affiliated with the World Squash Federation — developing players, hosting national & international tournaments, rankings, events and news.',
  keywords: [
    'Bangladesh Squash',
    'BSRF',
    'Squash Rackets Federation',
    'squash Bangladesh',
    'squash tournament Dhaka',
    'national squash championship',
    'squash rankings',
    'World Squash Federation',
  ],
};

async function loadHeroSlides() {
  try {
    const gallery = await fetchPublicMediaGallery({
      pageNumber: 1,
      pageSize: HERO_GALLERY_SLIDE_COUNT,
      galleryType: 'GalleryImage',
    });
    const slides = mapGalleryItemsToHeroSlides(gallery.data);
    return slides.length > 0 ? slides : getFallbackHeroSlides();
  } catch {
    return getFallbackHeroSlides();
  }
}

export default async function Home() {
  const heroSlides = await loadHeroSlides();
  return <BsrfHome heroSlides={heroSlides} />;
}
