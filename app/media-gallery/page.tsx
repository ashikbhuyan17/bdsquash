import React from 'react';
import { Metadata } from 'next';
import MediaGalleryClient from './MediaGalleryClient';

export const metadata: Metadata = {
  title: 'Media Gallery | Bangladesh Squash Rackets Federation',
  description:
    'Browse photos and videos from matches, events, and media coverage',
};

interface MediaItem {
  id: number;
  title: string;
  image: string;
  count: number;
  type: 'photo' | 'video';
  externalLink?: string;
}

// Sample media data - in production, this would come from a database or API
const mediaData: MediaItem[] = [
  {
    id: 1,
    title: '6th Bangladesh International Squash Open 2025 concludes',
    image: '/news-01.jpg',
    count: 150,
    type: 'photo',
    externalLink:
      'https://www.daily-sun.com/printversion/details/816743?utm_source=chatgpt.com',
  },
  {
    id: 2,
    title:
      'Victory Day Squash Championship signals strong revival of Squash in Bangladesh',
    image: '/news-02.jpg',
    count: 120,
    type: 'photo',
    externalLink:
      'https://www.daily-sun.com/sports/847914?utm_source=chatgpt.com',
  },
  {
    id: 3,
    title: "IUB's Monika and Raihan shine in Victory Day Squash Tournament",
    image: '/news-03.jpg',
    count: 95,
    type: 'photo',
    externalLink:
      'https://www.dhakatribune.com/bangladesh/event/370623/iub%E2%80%99s-monika-and-raihan-shine-in-victory-day?utm_source=chatgpt.com',
  },
  {
    id: 4,
    title: '5th National Squash Championship 2025 trophy unveiled',
    image: '/hero-02.jpg',
    count: 180,
    type: 'photo',
    externalLink:
      'https://www.daily-sun.com/printversion/details/832493?utm_source=chatgpt.com',
  },
  {
    id: 5,
    title: 'IUB shines bright in National Squash Championship 2024',
    image: '/news-05.jpg',
    count: 110,
    type: 'photo',
    externalLink:
      'https://www.tbsnews.net/economy/corporates/iub-shines-bright-national-squash-championship-2024-839501?utm_source=chatgpt.com',
  },
];

export default async function MediaGalleryPage({
  searchParams,
}: {
  searchParams: { mt?: string };
}) {
  const mt = searchParams.mt;
  const mediaType = mt === 'video' ? 'video' : mt === 'photo' ? 'photo' : 'all';

  return (
    <MediaGalleryClient mediaData={mediaData} defaultMediaType={mediaType} />
  );
}
