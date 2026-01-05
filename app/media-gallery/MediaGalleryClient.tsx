'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Image as ImageIcon, Video, ChevronDown } from 'lucide-react';

interface MediaItem {
  id: number;
  title: string;
  image: string;
  count: number;
  type: 'photo' | 'video';
  externalLink?: string;
}

interface MediaGalleryClientProps {
  mediaData: MediaItem[];
  defaultMediaType: 'all' | 'photo' | 'video';
}

export default function MediaGalleryClient({
  mediaData,
  defaultMediaType,
}: MediaGalleryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState<'all' | 'photo' | 'video'>(
    defaultMediaType
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update media type when URL param changes
  useEffect(() => {
    const mt = searchParams.get('mt');
    if (mt === 'video') {
      setMediaType('video');
    } else if (mt === 'photo') {
      setMediaType('photo');
    } else {
      setMediaType('all');
    }
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter media items
  const filteredMedia = useMemo(() => {
    return mediaData.filter((item) => {
      const matchesType = mediaType === 'all' || item.type === mediaType;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [mediaData, mediaType, searchQuery]);

  const handleMediaTypeChange = (type: 'all' | 'photo' | 'video') => {
    setMediaType(type);
    setIsDropdownOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'all') {
      params.delete('mt');
    } else {
      params.set('mt', type);
    }
    router.push(
      `/media-gallery${params.toString() ? `?${params.toString()}` : ''}`
    );
  };

  const categories = ['all', 'Photo', 'Video'];

  return (
    <div className="min-h-screen bg-gray-50 pt-[90px]">
      {/* Header Section - Dark Gray */}

      <div className="flex gap-2 justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              handleMediaTypeChange(
                cat.toLowerCase() as 'all' | 'photo' | 'video'
              )
            }
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              mediaType === cat.toLowerCase()
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Main Content - Image Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => {
            const cardContent = (
              <>
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Info Section */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {/* Icon */}
                    <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center shrink-0">
                      {item.type === 'photo' ? (
                        <ImageIcon className="w-4 h-4 text-white" />
                      ) : (
                        <Video className="w-4 h-4 text-white" />
                      )}
                    </div>
                    {/* Count */}
                    <span className="text-sm font-semibold text-gray-700">
                      {item.count}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </>
            );

            if (item.externalLink) {
              return (
                <a
                  key={item.id}
                  href={item.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer block"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              {mediaType === 'photo' ? (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              ) : mediaType === 'video' ? (
                <Video className="w-8 h-8 text-gray-400" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-gray-500 text-lg">
              No{' '}
              {mediaType === 'all'
                ? 'media'
                : mediaType === 'photo'
                ? 'photos'
                : 'videos'}{' '}
              found
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
