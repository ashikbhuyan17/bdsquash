import type { About, Banner, Gallery, News, Player } from "@/types/admin"
import { IMG_PLACEHOLDER_ALT, IMG_PLACEHOLDER_PNG } from "@/lib/admin/constants"

export const seedBanners: Banner[] = [
  {
    id: "b1",
    active: true,
    image: IMG_PLACEHOLDER_ALT,
    title: "National Open 2025",
    description: "Register for the annual championship hosted in Dhaka.",
    bannerLink: "https://example.com/open-2025",
  },
  {
    id: "b2",
    active: true,
    image: IMG_PLACEHOLDER_PNG,
    title: "Youth development",
    description: "We are building the next generation of players nationwide.",
    bannerLink: "/events",
  },
]

export const seedNews: News[] = [
  {
    id: "n1",
    active: true,
    newsDate: "2025-04-18",
    image: IMG_PLACEHOLDER_PNG,
    title: "BSRF announces new training calendar",
    description: "Regional camps will run through June — coaches invited to apply.",
    newsLink: "https://example.com/calendar",
  },
  {
    id: "n2",
    active: false,
    newsDate: "2025-03-22",
    image: IMG_PLACEHOLDER_ALT,
    title: "Team Bangladesh — Asian Games prep",
    description: "Squad list and friendly fixtures to be published next week.",
    newsLink: "https://example.com/team",
  },
]

export const seedPlayers: Player[] = [
  {
    id: "p1",
    active: true,
    name: "Rahman Karim",
    profileImage: IMG_PLACEHOLDER_ALT,
    ranking: 1,
    country: "Bangladesh",
    bio: "Top-ranked national player, focused on front-court control.",
  },
  {
    id: "p2",
    active: true,
    name: "Nadia Islam",
    profileImage: IMG_PLACEHOLDER_PNG,
    ranking: 2,
    country: "Bangladesh",
    bio: "Rising talent with a strong all-court game and fitness base.",
  },
  {
    id: "p3",
    active: true,
    name: "Omar Hossain",
    profileImage: IMG_PLACEHOLDER_PNG,
    ranking: 5,
    country: "Bangladesh",
    bio: "Veteran competitor mentoring junior squads.",
  },
]

export const seedGallery: Gallery[] = [
  {
    id: "g1",
    active: true,
    image: IMG_PLACEHOLDER_ALT,
    title: "Finals 2024",
    galleryLink: "https://example.com/gallery/finals",
  },
  {
    id: "g2",
    active: true,
    image: IMG_PLACEHOLDER_PNG,
    title: "Youth camp",
    galleryLink: "/media-gallery",
  },
]

const defaultHistory =
  "<p>The Bangladesh Squash Rackets Federation was formed to develop and govern the sport at the national level.</p>"
const defaultPres =
  "<p>We are committed to professional standards, fair play, and growing participation across the country.</p>"

export const seedAbout: About[] = [
  {
    id: "a1",
    active: true,
    history: defaultHistory,
    presidentMessage: defaultPres,
    mission: "Promote excellence in squash and expand access to facilities.",
    vision: "A thriving national squash community recognized across Asia.",
  },
]
