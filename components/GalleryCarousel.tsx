'use client';
import React, { useState, useEffect } from 'react';
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

// Types
interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// Gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: '/hero-01.jpg',
    title:
      'Victory Day Squash Championship signals strong revival of Squash in Bangladesh',
    description:
      'AirAsia, in partnership with the Asian Hockey Federation (AHF), is set to launch the Dare to Dream Youth Leadership Forum, taking place from 22–24 December 2025 in Kuala Lumpur.',
    buttonText: 'READ MORE',
    buttonLink: '/news/airasia-ahf-forum',
  },
  {
    id: 2,
    image: '/hero-02.jpg',
    title: '5th National Squash Championship 2025 trophy unveiled',
    description:
      'The trophy unveiling and press conference for the 5th National Squash Championship 2025 were held in style at Bashundhara Sports City on Saturday.',
    buttonText: 'READ MORE',
    buttonLink: '/news/bangladesh-victory',
  },
  // {
  //   id: 3,
  //   image:
  //     'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop',
  //   title: 'International Hockey Championship 2025',
  //   description:
  //     'Join us for the most anticipated hockey event of the year. Teams from across Asia will compete for glory.',
  //   buttonText: 'READ MORE',
  //   buttonLink: '/news/championship-2025',
  // },
  // {
  //   id: 4,
  //   image:
  //     'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=600&fit=crop',
  //   title: 'Youth Training Camp',
  //   description:
  //     'Empowering the next generation of hockey players through intensive training and mentorship programs.',
  //   buttonText: 'READ MORE',
  //   buttonLink: '/news/youth-training',
  // },
];

// Gallery Carousel Component
const GalleryCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {galleryItems.map((item) => (
            <CarouselItem key={item.id}>
              <div className="border-0 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0 min-h-[500px] lg:min-h-[600px]">
                    {/* Left Side - Content */}
                    <div className="bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 p-6 sm:p-8 md:p-10 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full translate-x-20 translate-y-20"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon/Logo */}
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                            <span className="text-xl md:text-2xl">✈️</span>
                          </div>
                          <span className="text-yellow-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                            News & Announcements
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Button */}
                        {/* <a
                          href={item.buttonLink}
                          className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold text-sm md:text-base uppercase tracking-wider hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                          {item.buttonText}
                        </a> */}
                      </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-2 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white border-0 shadow-xl">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </CarouselPrevious>
        <CarouselNext className="right-2 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white border-0 shadow-xl">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </CarouselNext>
      </Carousel>
    </section>
  );
};

export default GalleryCarousel;
