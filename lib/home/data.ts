export const HOME_NAV = [
  { label: 'The BSRF', href: '#thebsrf' },
  { label: 'Committee', href: '#committee' },
  { label: 'News', href: '#news' },
  { label: 'Events', href: '#events' },
  { label: 'Players', href: '#players' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

export const HOME_COMMITTEE = [
  { role: 'President', name: 'Full Name', lead: true },
  { role: 'Senior Vice President', name: 'Full Name' },
  { role: 'General Secretary', name: 'Full Name', lead: true },
  { role: 'Treasurer', name: 'Full Name' },
  { role: 'Vice President', name: 'Full Name' },
  { role: 'Joint Secretary', name: 'Full Name' },
  { role: 'Assistant Secretary', name: 'Full Name' },
  { role: 'Executive Member', name: 'Full Name' },
] as const;

export const HOME_NEWS_SIDE = [
  {
    cat: 'NATIONAL',
    title: '5th National Squash Championship Crowns New Champions',
    date: '12 JUN 2025',
    image: '/news-02.jpg',
    link: 'https://www.daily-sun.com/printversion/details/832493',
  },
  {
    cat: 'DEVELOPMENT',
    title: 'Junior Squash Camp Expands to Three New Districts',
    date: '28 MAY 2025',
    image: '/news-03.jpg',
    link: '/news',
  },
] as const;

export const HOME_FEATURED_NEWS = {
  cat: 'Tournament',
  title: '6th Bangladesh International Squash Open 2025 Concludes',
  date: '30 JUL 2025',
  image: '/news-01.jpg',
  link: 'https://www.daily-sun.com/printversion/details/816743',
} as const;

export const HOME_EVENTS = [
  {
    d: '15',
    m: 'NOV',
    name: '6th Bangladesh International Squash Open',
    loc: 'Squash Complex, Gulshan, Dhaka',
  },
  {
    d: '06',
    m: 'DEC',
    name: 'Victory Day Squash Championship 2025',
    loc: 'BSRF Courts, Dhaka',
  },
  {
    d: '20',
    m: 'JAN',
    name: 'National Junior Ranking Series — Leg 1',
    loc: 'Gulshan-1, Dhaka',
  },
] as const;

export const HOME_PLAYERS = [
  { rank: '#1', name: 'Tahmid Rahman', cat: "MEN'S" },
  { rank: '#2', name: 'Nabila Hossain', cat: "WOMEN'S" },
  { rank: '#3', name: 'Imran Kabir', cat: "MEN'S" },
  { rank: '#4', name: 'Sadia Akter', cat: "WOMEN'S" },
  { rank: '#5', name: 'Rafiq Ahmed', cat: "MEN'S" },
] as const;

export const HOME_HERO_SHOTS = [
  { title: 'Match Point', caption: 'Tournament Action' },
  { title: 'National Team', caption: 'Team Bangladesh' },
  { title: 'Centre Court', caption: 'Glass Court, Dhaka' },
  { title: 'Champions', caption: 'Awards Night' },
] as const;

export const HOME_STATS = [
  { num: '5TH', lbl: 'National Championship' },
  { num: '10+', lbl: 'International Players' },
  { num: '3', lbl: 'Active Clubs' },
  { num: '1980s', lbl: 'Est. Year' },
] as const;

export const HOME_TICKER =
  '6TH BANGLADESH INTERNATIONAL SQUASH OPEN 2025      5TH NATIONAL SQUASH CHAMPIONSHIP 2025      VICTORY DAY SQUASH CHAMPIONSHIP 2025      REGISTER FOR UPCOMING EVENTS      ';

export const HOME_FOOTER_LINKS = [
  { t: 'About BSRF', h: '#thebsrf' },
  { t: "President's Message", h: '#president' },
  { t: 'Managing Committee', h: '/committee' },
  { t: 'News', h: '/news' },
  { t: 'Events', h: '/events' },
  { t: 'Players & Rankings', h: '/players-rankings' },
  { t: 'Media Gallery', h: '/media-gallery' },
  { t: 'Contact Us', h: '/contact' },
] as const;
