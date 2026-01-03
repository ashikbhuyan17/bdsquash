import GalleryCarousel from '@/components/GalleryCarousel';

export default function Home() {
  return (
    <div className="pt-[65px]  space-y-[100px]">
      <GalleryCarousel />
      <GalleryCarousel />
      <GalleryCarousel />
    </div>
  );
}
