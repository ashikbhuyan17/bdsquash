'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Image as ImageIcon, Video, ChevronDown } from 'lucide-react';

interface MediaItem {
  id: number;
  title: string;
  image: string;
  count: number;
  type: 'photo' | 'video';
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

  const getDropdownLabel = () => {
    if (mediaType === 'photo') return 'Photo';
    if (mediaType === 'video') return 'Video';
    return 'All';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[90px]">
      {/* Header Section - Dark Gray */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: Dropdown (All/Photo/Video) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                <span>{getDropdownLabel()}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-gray-700 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => handleMediaTypeChange('all')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors rounded-t-md ${
                      mediaType === 'all' ? 'bg-gray-600' : ''
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleMediaTypeChange('photo')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors ${
                      mediaType === 'photo' ? 'bg-gray-600' : ''
                    }`}
                  >
                    Photo
                  </button>
                  <button
                    onClick={() => handleMediaTypeChange('video')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors rounded-b-md ${
                      mediaType === 'video' ? 'bg-gray-600' : ''
                    }`}
                  >
                    Video
                  </button>
                </div>
              )}
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-md mx-auto md:mx-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Image Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <Link
              key={item.id}
              href={`/media-gallery/${item.id}`}
              className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
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
            </Link>
          ))}
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
