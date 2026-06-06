'use client';

import { useEffect } from 'react';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import { HomeNavbar } from '@/components/home/sections/home-navbar';
import { HomeHero } from '@/components/home/sections/home-hero';
import { HomeStats } from '@/components/home/sections/home-stats';
import { HomeNews } from '@/components/home/sections/home-news';
import { HomeEvents } from '@/components/home/sections/home-events';
import { HomeAbout } from '@/components/home/sections/home-about';
import { HomePresident } from '@/components/home/sections/home-president';
import { HomeCommittee } from '@/components/home/sections/home-committee';
import { HomeGallery } from '@/components/home/sections/home-gallery';
import { HomePlayers } from '@/components/home/sections/home-players';
import { HomeFooter } from '@/components/home/sections/home-footer';
import type { PublicGalleryItem } from '@/lib/media-gallery/public-gallery';
import type { HomeEventCard } from '@/lib/home/public-events';
import type { HomeHeroSlide } from '@/lib/home/hero-gallery';
import type { PublicCommitteeMember } from '@/lib/officials/public-officials.types';
import type { HomeFeaturedPlayer } from '@/lib/players/public-players.types';
import type { NewsArticle } from '@/lib/news/data';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

type BsrfHomeProps = {
  heroSlides: HomeHeroSlide[];
  newsFeatured: NewsArticle;
  newsSide: NewsArticle[];
  upcomingEvents: HomeEventCard[];
  galleryItems: PublicGalleryItem[];
  featuredPlayers: HomeFeaturedPlayer[];
  committeeMembers: PublicCommitteeMember[];
};

export function BsrfHome({
  heroSlides,
  newsFeatured,
  newsSide,
  upcomingEvents,
  galleryItems,
  featuredPlayers,
  committeeMembers,
}: BsrfHomeProps) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      document.querySelectorAll('[data-fade-up]').forEach((el) => {
        const styles = getComputedStyle(el);
        if (parseFloat(styles.opacity) < 1) {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        }
      });
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`overflow-x-clip bg-bsrf-primary font-dm-sans text-[#F5F5F5] antialiased ${bebasNeue.variable} ${dmSans.variable}`}
    >
      <a
        className="absolute left-3 top-[-60px] z-[200] rounded bg-bsrf-green px-[18px] py-2.5 text-[13px] font-bold text-black transition-[top] duration-200 focus:top-3"
        href="#main"
      >
        Skip to content
      </a>
      <HomeNavbar />
      <main id="main">
        <HomeHero slides={heroSlides} />
        <HomeStats />
        <HomeAbout />
        <HomePresident />
        <HomeNews featured={newsFeatured} side={newsSide} />
        <HomeEvents events={upcomingEvents} />
        <HomeCommittee members={committeeMembers} />
        <HomeGallery items={galleryItems} />
        <HomePlayers players={featuredPlayers} />
      </main>
      <HomeFooter />
    </div>
  );
}
