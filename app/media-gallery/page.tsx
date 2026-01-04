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
}

// Sample media data - in production, this would come from a database or API
const mediaData: MediaItem[] = [
  {
    id: 1,
    title: 'Womens u18 asia cup 2025.',
    image: '/Squash-Sports.jpg',
    count: 130,
    type: 'photo',
  },
  {
    id: 2,
    title: 'Mens u18 asia cup 2025',
    image: '/Squash-Sports.jpg',
    count: 218,
    type: 'photo',
  },
  {
    id: 3,
    title: 'Womens AHF Cup 2025',
    image: '/Squash-Sports.jpg',
    count: 130,
    type: 'photo',
  },
  {
    id: 4,
    title: 'Mens AHF Cup 2025',
    image: '/Squash-Sports.jpg',
    count: 62,
    type: 'photo',
  },
  {
    id: 5,
    title: "Dhofar Municipality Men's Junior Asia Cup 2023",
    image: '/Squash-Sports.jpg',
    count: 85,
    type: 'photo',
  },
  {
    id: 6,
    title: "INDIA Women's Junior Asia Cup 2023 CHAMPIONS",
    image: '/Squash-Sports.jpg',
    count: 120,
    type: 'photo',
  },
  {
    id: 7,
    title: "Women's Hockey Match Highlights",
    image: '/Squash-Sports.jpg',
    count: 45,
    type: 'video',
  },
  {
    id: 8,
    title: 'Thailand Team Match Coverage',
    image: '/Squash-Sports.jpg',
    count: 30,
    type: 'video',
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
