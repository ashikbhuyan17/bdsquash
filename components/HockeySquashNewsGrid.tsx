import React from 'react';

// Types
interface NewsArticle {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  category: 'hockey' | 'squash';
  externalLink?: string;
}

// Mock Data - This would come from your database/API
const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: '6th Bangladesh International Squash Open 2025 concludes',
    date: '30 Jul 2025',
    imageUrl: '/news-01.jpg',
    category: 'hockey',
    externalLink:
      'https://www.daily-sun.com/printversion/details/816743?utm_source=chatgpt.com',
  },
  {
    id: '2',
    title:
      'Victory Day Squash Championship signals strong revival of Squash in Bangladesh',
    date: '24 Dec 2025',
    imageUrl: '/news-02.jpg',
    category: 'hockey',
    externalLink:
      'https://www.daily-sun.com/sports/847914?utm_source=chatgpt.com',
  },
  {
    id: '3',
    title: 'IUB’s Monika and Raihan shine in Victory Day Squash Tournament',
    date: '12 Jan 2025',
    imageUrl: '/news-03.jpg',
    category: 'hockey',
    externalLink:
      'https://www.dhakatribune.com/bangladesh/event/370623/iub%E2%80%99s-monika-and-raihan-shine-in-victory-day?utm_source=chatgpt.com',
  },
  {
    id: '4',
    title: '5th National Squash Championship 2025 trophy unveiled',
    date: '12 Oct 2025',
    imageUrl: '/hero-02.jpg',
    category: 'hockey',
    externalLink:
      'https://www.daily-sun.com/printversion/details/832493?utm_source=chatgpt.com',
  },
  {
    id: '5',
    title: 'IUB shines bright in National Squash Championship 2024',
    date: '29 April, 2024',
    imageUrl: '/news-05.jpg',
    category: 'squash',
    externalLink:
      'https://www.tbsnews.net/economy/corporates/iub-shines-bright-national-squash-championship-2024-839501?utm_source=chatgpt.com',
  },
];

// News Card Component
const NewsCard: React.FC<{ article: NewsArticle; className?: string }> = ({
  article,
  className = '',
}) => {
  const cardContent = (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <time className="text-xs font-medium tracking-wide opacity-90 block mb-2">
          {article.date}
        </time>
        <h3 className="text-lg font-semibold leading-tight line-clamp-3 transition-colors group-hover:text-blue-400">
          {article.title}
        </h3>
      </div>
    </>
  );

  if (article.externalLink) {
    return (
      <a
        href={article.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative overflow-hidden rounded-none group cursor-pointer bg-gray-900 block ${className}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article
      className={`relative overflow-hidden rounded-none group cursor-pointer bg-gray-900 ${className}`}
    >
      {cardContent}
    </article>
  );
};

// Server Component - Main News Grid
const HockeySquashNewsGrid: React.FC = () => {
  const renderNewsGrid = (articles: NewsArticle[]) => {
    const gridItems = [];
    let index = 0;

    while (index < articles.length) {
      const leftArticle = articles[index];
      const rightArticle = articles[index + 1];

      gridItems.push(
        <div
          key={`row-${index}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
        >
          {/* Left Card */}
          {leftArticle && (
            <div className="h-[400px] md:h-[500px] lg:h-[600px]">
              <NewsCard article={leftArticle} className="h-full" />
            </div>
          )}

          {/* Right Card */}
          {rightArticle && (
            <div className="h-[400px] md:h-[500px] lg:h-[600px]">
              <NewsCard article={rightArticle} className="h-full" />
            </div>
          )}
        </div>
      );

      index += 2;
    }

    return gridItems;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            News & Announcements
          </h1>
        </header>

        {/* News Grid */}
        <div className="space-y-4 lg:space-y-6">
          {renderNewsGrid(newsArticles)}
        </div>
      </div>
    </div>
  );
};

export default HockeySquashNewsGrid;
