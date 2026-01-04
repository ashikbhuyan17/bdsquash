import GalleryCarousel from '@/components/GalleryCarousel';
import HockeySquashNewsGrid from '@/components/NewsCard';

export default function Home() {
  return (
    <div className="pt-[90px]">
      <GalleryCarousel />
      <HockeySquashNewsGrid />
    </div>
  );
}
