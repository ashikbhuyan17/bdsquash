export const NEWS_FILTER_CATEGORIES = [
  'All',
  'Tournaments',
  'National',
  'Development',
  'International',
] as const

export type NewsFilterCategory = (typeof NEWS_FILTER_CATEGORIES)[number]

export type NewsArticle = {
  cat: string
  filter: Exclude<NewsFilterCategory, 'All'>
  title: string
  date: string
  image: string
  link: string
  featured?: boolean
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    cat: 'TOURNAMENT',
    filter: 'Tournaments',
    title: '6th Bangladesh International Squash Open 2025 Concludes',
    date: '30 JUL 2025',
    image: '/news-01.jpg',
    link: 'https://www.daily-sun.com/printversion/details/816743',
    featured: true,
  },
  {
    cat: 'NATIONAL',
    filter: 'National',
    title: '5th National Squash Championship Crowns New Champions',
    date: '12 JUN 2025',
    image: '/news-02.jpg',
    link: 'https://www.daily-sun.com/printversion/details/832493',
  },
  {
    cat: 'DEVELOPMENT',
    filter: 'Development',
    title: 'Junior Squash Camp Expands to Three New Districts',
    date: '28 MAY 2025',
    image: '/news-03.jpg',
    link: '/news',
  },
  {
    cat: 'NATIONAL',
    filter: 'National',
    title:
      'Victory Day Squash Championship Signals Strong Revival of Squash in Bangladesh',
    date: '24 DEC 2025',
    image: '/news-02.jpg',
    link: 'https://www.daily-sun.com/sports/847914',
  },
  {
    cat: 'TOURNAMENT',
    filter: 'Tournaments',
    title: 'IUB’s Monika and Raihan Shine in Victory Day Squash Tournament',
    date: '12 JAN 2025',
    image: '/news-03.jpg',
    link: 'https://www.dhakatribune.com/bangladesh/event/370623/iub%E2%80%99s-monika-and-raihan-shine-in-victory-day',
  },
  {
    cat: 'NATIONAL',
    filter: 'National',
    title: '5th National Squash Championship 2025 Trophy Unveiled',
    date: '12 OCT 2025',
    image: '/hero-02.jpg',
    link: 'https://www.daily-sun.com/printversion/details/832493',
  },
  {
    cat: 'INTERNATIONAL',
    filter: 'International',
    title: 'IUB Shines Bright in National Squash Championship 2024',
    date: '29 APR 2024',
    image: '/news-05.jpg',
    link: 'https://www.tbsnews.net/economy/corporates/iub-shines-bright-national-squash-championship-2024-839501',
  },
]

export const NEWS_FEATURED =
  NEWS_ARTICLES.find((article) => article.featured) ?? NEWS_ARTICLES[0]
