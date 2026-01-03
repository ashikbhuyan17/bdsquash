'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

// Gallery data structure
const galleryItems = [
  {
    id: 1,
    image: '/logo.png',
    title: 'AirAsia x AHF | Dare to Dream Youth Leadership Forum',
    description:
      'AirAsia, in partnership with the Asian Hockey Federation (AHF), is set to launch the Dare to Dream Youth Leadership Forum, taking place from 22–24 December 2025 in Kuala Lumpur.',
    buttonText: 'READ MORE',
    buttonLink: '/news/airasia-ahf-forum',
  },
  {
    id: 2,
    image: '/logo.png',
    title: 'Bangladesh Hockey Team Victory',
    description:
      'Celebrating the triumphant victory of Bangladesh Hockey Team in the regional championship. A moment of pride for the nation.',
    buttonText: 'READ MORE',
    buttonLink: '/news/bangladesh-victory',
  },
  {
    id: 3,
    image: '/logo.png',
    title: 'International Hockey Championship 2025',
    description:
      'Join us for the most anticipated hockey event of the year. Teams from across Asia will compete for glory.',
    buttonText: 'READ MORE',
    buttonLink: '/news/championship-2025',
  },
  {
    id: 4,
    image: '/logo.png',
    title: 'Youth Training Camp',
    description:
      'Empowering the next generation of hockey players through intensive training and mentorship programs.',
    buttonText: 'READ MORE',
    buttonLink: '/news/youth-training',
  },
];

const GalleryCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Auto-play plugin
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full ">
      <div className="">
        {/* Carousel */}
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {galleryItems.map((item) => (
              <CarouselItem key={item.id}>
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left Side - Content */}
                      <div className="bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full translate-x-20 translate-y-20"></div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon/Logo */}
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">✈️</span>
                            </div>
                            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                              Latest News
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Button */}
                          <a
                            href={item.buttonLink}
                            className="inline-block px-8 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold uppercase tracking-wider hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                          >
                            {item.buttonText}
                          </a>
                        </div>
                      </div>

                      {/* Right Side - Image */}
                      <div className="relative h-[400px] md:h-full min-h-[500px]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="left-4 w-12 h-12 bg-white/90 hover:bg-white border-0 shadow-xl">
            <ChevronLeft className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext className="right-4 w-12 h-12 bg-white/90 hover:bg-white border-0 shadow-xl">
            <ChevronRight className="w-6 h-6" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default GalleryCarousel;
