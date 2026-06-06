import type { GalleryCategory } from '@/lib/types/media-gallery'

export type NewsFilterCategory = 'All' | GalleryCategory

export type NewsArticle = {
  id: number
  cat: string
  filter: GalleryCategory
  title: string
  date: string
  image: string
  link: string
  featured?: boolean
}

/** @deprecated Static seed data — public pages use API via lib/news/public-news.ts */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    cat: 'TOURNAMENT',
    filter: 'Tournaments',
    title: '6th Bangladesh International Squash Open 2025 Concludes',
    date: '30 JUL 2025',
    image: '/news-01.jpg',
    link: 'https://www.daily-sun.com/printversion/details/816743',
    featured: true,
  },
  {
    id: 2,
    cat: 'NATIONAL',
    filter: 'NationalTeam',
    title: '5th National Squash Championship Crowns New Champions',
    date: '12 JUN 2025',
    image: '/news-02.jpg',
    link: 'https://www.daily-sun.com/printversion/details/832493',
  },
  {
    id: 3,
    cat: 'TRAINING',
    filter: 'Training',
    title: 'Junior Squash Camp Expands to Three New Districts',
    date: '28 MAY 2025',
    image: '/news-03.jpg',
    link: '/news',
  },
  {
    id: 4,
    cat: 'NATIONAL',
    filter: 'NationalTeam',
    title:
      'Victory Day Squash Championship Signals Strong Revival of Squash in Bangladesh',
    date: '24 DEC 2025',
    image: '/news-02.jpg',
    link: 'https://www.daily-sun.com/sports/847914',
  },
  {
    id: 5,
    cat: 'TOURNAMENT',
    filter: 'Tournaments',
    title: 'IUB’s Monika and Raihan Shine in Victory Day Squash Tournament',
    date: '12 JAN 2025',
    image: '/news-03.jpg',
    link: 'https://www.dhakatribune.com/bangladesh/event/370623/iub%E2%80%99s-monika-and-raihan-shine-in-victory-day',
  },
  {
    id: 6,
    cat: 'NATIONAL',
    filter: 'NationalTeam',
    title: '5th National Squash Championship 2025 Trophy Unveiled',
    date: '12 OCT 2025',
    image: '/hero-02.jpg',
    link: 'https://www.daily-sun.com/printversion/details/832493',
  },
  {
    id: 7,
    cat: 'EVENTS',
    filter: 'Events',
    title: 'IUB Shines Bright in National Squash Championship 2024',
    date: '29 APR 2024',
    image: '/news-05.jpg',
    link: 'https://www.tbsnews.net/economy/corporates/iub-shines-bright-national-squash-championship-2024-839501',
  },
]

export const NEWS_FEATURED =
  NEWS_ARTICLES.find((article) => article.featured) ?? NEWS_ARTICLES[0]
