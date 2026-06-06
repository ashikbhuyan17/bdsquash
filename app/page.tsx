import type { Metadata } from 'next';
import { BsrfHome } from '@/components/home/bsrf-home';
import {
  getFallbackHeroSlides,
  HERO_GALLERY_SLIDE_COUNT,
  mapGalleryItemsToHeroSlides,
} from '@/lib/home/hero-gallery';
import { fetchPublicMediaGallery } from '@/lib/media-gallery';
import { loadHomeUpcomingEvents } from '@/lib/home/public-events';
import { loadHomeGallery } from '@/lib/media-gallery/public-gallery';
import { loadCommitteeMembers } from '@/lib/officials/public-officials';
import { loadHomeFeaturedPlayers } from '@/lib/players/public-players';
import { loadHomeNews } from '@/lib/news/public-news';

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
  const [heroSlides, homeNews, upcomingEvents, galleryItems, featuredPlayers, committeeMembers] =
    await Promise.all([
      loadHeroSlides(),
      loadHomeNews(),
      loadHomeUpcomingEvents(),
      loadHomeGallery(),
      loadHomeFeaturedPlayers(),
      loadCommitteeMembers(),
    ]);

  return (
    <BsrfHome
      heroSlides={heroSlides}
      newsFeatured={homeNews.featured}
      newsSide={homeNews.side}
      upcomingEvents={upcomingEvents}
      galleryItems={galleryItems}
      featuredPlayers={featuredPlayers}
      committeeMembers={committeeMembers}
    />
  );
}
