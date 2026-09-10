// Central site content. Edit these values to update copy across the site —
// no CMS in this build, so this file is the single source of truth.

export const SITE = {
  name: "Fountain of Light Prayer Ministry International",
  shortName: "Fountain of Light",
  tagline: "A place to belong. A light to follow.",
  description:
    "A warm, Christ-centered community across New York, Lagos, and Akure — gathered around prayer, the Word, and each other.",
  url: "https://fountainoflight.org",
  email: "info@fountainoflight.org",
  founded: 1998,
  social: {
    youtube: "https://youtube.com/@FountainOfLightMinistry",
    facebook: "https://facebook.com/FountainOfLightMinistry",
    instagram: "https://instagram.com/folpministry",
    twitter: "https://twitter.com/folpministry",
  },
};

export interface ChurchLocation {
  id: string;
  name: string;
  isHQ?: boolean;
  address: string;
  mapQuery: string;
  phone: string;
  email: string;
  services: { day: string; time: string }[];
  prayerMeetings: { day: string; time: string }[];
  parking?: string;
  pastor: string;
}

export const LOCATIONS: ChurchLocation[] = [
  {
    id: "new-york",
    name: "New York — International Headquarters",
    isHQ: true,
    address: "546 Liberty Avenue, Brooklyn, NY 11207",
    mapQuery: "546 Liberty Avenue, Brooklyn, NY 11207",
    phone: "+1 718 812 9816",
    email: "newyork@fountainoflight.org",
    services: [{ day: "Sunday", time: "10:00 AM & 6:00 PM EST" }],
    prayerMeetings: [{ day: "Wednesday", time: "6:00 PM – 8:00 PM EST" }],
    parking: "Street parking on Liberty Avenue.",
    pastor: "Pastor Durojaiye Olorunlana (General Overseer)",
  },
  {
    id: "akure",
    name: "Akure Branch",
    address: "Iloro, Akure, Ondo State, Nigeria",
    mapQuery: "Akure, Ondo State, Nigeria",
    phone: "+234 803 810 8585",
    email: "akure@fountainoflight.org",
    services: [
      { day: "Sunday", time: "7:00 AM & 5:00 PM" },
    ],
    prayerMeetings: [
      { day: "Daily", time: "5:00 AM & 9:00 PM" },
      { day: "Wednesday", time: "6:00 PM – 8:00 PM WAT" },
    ],
    parking: "Free on-site parking available.",
    pastor: "Prophet Promise Ajetunmobi",
  },
  {
    id: "lagos",
    name: "Ikorodu, Lagos Branch",
    address: "Ikorodu, Lagos State, Nigeria",
    mapQuery: "Ikorodu, Lagos State, Nigeria",
    phone: "+234 803 478 8324",
    email: "lagos@fountainoflight.org",
    services: [{ day: "Sunday", time: "9:00 AM WAT" }],
    prayerMeetings: [
      { day: "Thursday", time: "8:00 – 10:00 AM WAT" },
      { day: "Wednesday", time: "6:00 PM – 8:00 PM WAT" },
    ],
    pastor: "Pastor Ayokunle Ashogbon",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/watch", label: "Watch" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/connect", label: "Connect" },
  { href: "/give", label: "Give" },
];
