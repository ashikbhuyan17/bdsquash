import React from 'react';

// Types
interface NewsArticle {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  category: 'hockey' | 'squash';
}

// Mock Data - This would come from your database/API
const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title:
      "SG Pipers beat Ranchi Royals 2-0 in the opening clash of Women's Hero Hockey India League",
    date: '2025.12.30',
    imageUrl:
      'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=600&fit=crop',
    category: 'hockey',
  },
  {
    id: '2',
    title:
      'Hardik to lead HIL Governing Council Team while Sanjay and Arthur Van Doren name...',
    date: '2025.12.30',
    imageUrl:
      'https://images.unsplash.com/photo-1556817411-58c45dd94e8c?w=800&h=600&fit=crop',
    category: 'hockey',
  },
  {
    id: '3',
    title:
      'Asian Hockey Federation Conducts Executive Board Meeting 28th December 2025',
    date: '2025.12.28',
    imageUrl:
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
    category: 'hockey',
  },
  {
    id: '4',
    title:
      'Historic victory for Bangladesh Hockey team in Asian Champions Trophy',
    date: '2025.12.27',
    imageUrl:
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop',
    category: 'hockey',
  },
  {
    id: '5',
    title:
      'National Squash Championship Finals: Record breaking performances witnessed',
    date: '2025.12.26',
    imageUrl:
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
    category: 'squash',
  },
  {
    id: '6',
    title: 'Youth Hockey Development Program launches across 10 districts',
    date: '2025.12.25',
    imageUrl:
      'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=600&fit=crop',
    category: 'hockey',
  },
  {
    id: '7',
    title:
      'International Squash Federation approves Bangladesh hosting rights for 2026',
    date: '2025.12.24',
    imageUrl:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop',
    category: 'squash',
  },
  {
    id: '8',
    title:
      'Bangladesh Hockey Federation announces new coaching staff for national team',
    date: '2025.12.23',
    imageUrl:
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
    category: 'hockey',
  },
  {
    id: '9',
    title: 'Junior Squash players shine at South Asian Games qualifiers',
    date: '2025.12.22',
    imageUrl:
      'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&h=600&fit=crop',
    category: 'squash',
  },
  {
    id: '10',
    title: 'New state-of-the-art hockey stadium construction begins in Dhaka',
    date: '2025.12.21',
    imageUrl:
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=600&fit=crop',
    category: 'hockey',
  },
  {
    id: '11',
    title: 'Women Squash team secures bronze medal at Commonwealth Games',
    date: '2025.12.20',
    imageUrl:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    category: 'squash',
  },
  {
    id: '12',
    title: 'Hockey World Cup 2026: Bangladesh confirms participation',
    date: '2025.12.19',
    imageUrl:
      'https://images.unsplash.com/photo-1556817411-58c45dd94e8c?w=800&h=600&fit=crop',
    category: 'hockey',
  },
];

// News Card Component
const NewsCard: React.FC<{ article: NewsArticle; className?: string }> = ({
  article,
  className = '',
}) => {
  return (
    <article
      className={`relative overflow-hidden rounded-none group cursor-pointer bg-gray-900 ${className}`}
    >
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
    </article>
  );
};

// Server Component - Main News Grid
const NewsPage: React.FC = () => {
  const renderNewsGrid = (articles: NewsArticle[]) => {
    const gridItems = [];
    let index = 0;
    let groupNumber = 0;

    while (index < articles.length) {
      const isEvenGroup = groupNumber % 2 === 0;

      if (isEvenGroup) {
        // Pattern 1: Left 1 full, Right 2 stacked
        const leftArticle = articles[index];
        const topRightArticle = articles[index + 1];
        const bottomRightArticle = articles[index + 2];

        gridItems.push(
          <div
            key={`group-${groupNumber}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          >
            {/* Left: Full Height Article */}
            {leftArticle && (
              <div className="h-[400px] md:h-[500px] lg:h-[600px]">
                <NewsCard article={leftArticle} className="h-full" />
              </div>
            )}

            {/* Right: Two Stacked Articles */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {topRightArticle && (
                <div className="h-[400px] md:h-[248px] lg:h-[297px]">
                  <NewsCard article={topRightArticle} className="h-full" />
                </div>
              )}
              {bottomRightArticle && (
                <div className="h-[400px] md:h-[248px] lg:h-[297px]">
                  <NewsCard article={bottomRightArticle} className="h-full" />
                </div>
              )}
            </div>
          </div>
        );
      } else {
        // Pattern 2: Left 2 stacked, Right 1 full
        const topLeftArticle = articles[index];
        const bottomLeftArticle = articles[index + 1];
        const rightArticle = articles[index + 2];

        gridItems.push(
          <div
            key={`group-${groupNumber}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          >
            {/* Left: Two Stacked Articles */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {topLeftArticle && (
                <div className="h-[400px] md:h-[248px] lg:h-[297px]">
                  <NewsCard article={topLeftArticle} className="h-full" />
                </div>
              )}
              {bottomLeftArticle && (
                <div className="h-[400px] md:h-[248px] lg:h-[297px]">
                  <NewsCard article={bottomLeftArticle} className="h-full" />
                </div>
              )}
            </div>

            {/* Right: Full Height Article */}
            {rightArticle && (
              <div className="h-[400px] md:h-[500px] lg:h-[600px]">
                <NewsCard article={rightArticle} className="h-full" />
              </div>
            )}
          </div>
        );
      }

      index += 3;
      groupNumber++;
    }

    return gridItems;
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4  pt-[130px]">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Latest News
          </h1>
          <p className="text-gray-400">Hockey & Squash Updates</p>
        </header>

        {/* News Grid */}
        <div className="space-y-4 lg:space-y-6">
          {renderNewsGrid(newsArticles)}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
