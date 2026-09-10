import type { StaticImageData } from "next/image";
import crusadeTentPhoto from "@/assets/PHOTO-2026-03-19-18-43-58.jpg";
import prayerPhoto from "@/assets/flpmi6.jpg";
import bibleStudyPhoto from "@/assets/bible-study-prayerchain.jpg";

export interface ChurchEvent {
  slug: string;
  title: string;
  date: string; // ISO date
  time: string;
  location: string;
  description: string;
  details: string;
  image: StaticImageData;
  featured?: boolean;
  zoomUrl?: string;
  zoomMeetingId?: string;
  zoomPassword?: string;
}

// Sample dates — replace with your real calendar before launch.
export const EVENTS: ChurchEvent[] = [
  {
    slug: "annual-crusade",
    title: "Annual Tent Crusade",
    date: "2026-11-14",
    time: "5:00 PM – 9:00 PM",
    location: "Akure Branch",
    description:
      "Three nights of open-air worship, the Word, and prayer for our city — everyone is welcome.",
    details:
      "Our annual crusade brings together believers and first-time guests from across Akure for three nights of worship, teaching, and prayer under the big tent. Refreshments and children's activities are provided each evening.",
    image: crusadeTentPhoto,
    featured: true,
  },
  {
    slug: "prophetic-programme",
    title: "Prophetic Programme",
    date: "2026-09-09",
    time: "Every Wednesday · 6:00 PM – 7:30 PM WAT",
    location: "All Branches",
    description:
      "A time of prayer and prophetic ministration every Wednesday, leading straight into our Bible Study.",
    details:
      "Join us every Wednesday from 6:00 PM to 7:30 PM WAT (Nigeria time) for our Prophetic Programme — a time of prayer and prophetic ministration as we prepare our hearts for the Word, leading directly into our Bible Study.",
    image: prayerPhoto,
  },
  {
    slug: "bible-study",
    title: "Bible Study",
    date: "2026-09-09",
    time: "Every Wednesday · 7:30 PM EST",
    location: "Online via Zoom",
    description:
      "Join us every Wednesday for Bible Study — study the Word together and grow in the faith, live on Zoom.",
    details:
      "Fountain Of Light Prayer Ministries International invites you to join us every Wednesday at 7:30 PM EST (New York time) for our Bible Study. 2 Timothy 2:15 says: \"Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.\" Come with your Bible and writing materials. @ FLPMI we conquer on our knees. Click below to join our live stream.",
    image: bibleStudyPhoto,
    zoomUrl: "https://us02web.zoom.us/j/4471581282?pwd=ZkJBcTJKTXJ3aWFEeUZDaFkvUThLZz09",
    zoomMeetingId: "447 158 1282",
    zoomPassword: "5vtZKY",
  },
  {
    slug: "friday-prayer",
    title: "Friday Prayer",
    date: "2026-09-11",
    time: "Every Friday · 7:30 PM EST",
    location: "Online via Zoom",
    description:
      "Join us every Friday for a time of united prayer, live on Zoom — same link as our Bible Study.",
    details:
      "Fountain Of Light Prayer Ministries International invites you to join us every Friday at 7:30 PM EST (New York time) for a time of prayer, live on Zoom — same meeting link as our Wednesday Bible Study. @ FLPMI we conquer on our knees. Click below to join our live stream.",
    image: prayerPhoto,
    zoomUrl: "https://us02web.zoom.us/j/4471581282?pwd=ZkJBcTJKTXJ3aWFEeUZDaFkvUThLZz09",
    zoomMeetingId: "447 158 1282",
    zoomPassword: "5vtZKY",
  },
];
