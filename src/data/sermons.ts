export interface Sermon {
  id: string;
  videoId: string;
  title: string;
  speaker: string;
  series: string;
  topic: string;
  date: string; // ISO date
  duration: string;
  description: string;
}

export const SERMONS: Sermon[] = [
  {
    id: "hq-001",
    videoId: "y3fGYla-ytE",
    title: "The Power of Persistent Prayer",
    speaker: "Pastor Durojaiye Olorunlana",
    series: "Prayer Warriors",
    topic: "Prayer & Intercession",
    date: "2026-08-16",
    duration: "1:45:30",
    description:
      "Understanding the biblical foundation of persistent prayer and its transformative power in daily life.",
  },
  {
    id: "hq-002",
    videoId: "JNrHByCyAUE",
    title: "Unity in Diversity: Our Global Vision",
    speaker: "Pastor Durojaiye Olorunlana",
    series: "Vision & Leadership",
    topic: "Vision & Leadership",
    date: "2026-07-26",
    duration: "52:15",
    description:
      "God's heart for a global ministry family — maintaining unity across cultures and continents.",
  },
  {
    id: "lg-001",
    videoId: "1t3V7eFSXIw",
    title: "Marketplace Evangelism: Reaching Lagos",
    speaker: "Pastor Ayokunle Ashogbon",
    series: "Faith at Work",
    topic: "Evangelism",
    date: "2026-08-02",
    duration: "42:10",
    description:
      "Practical strategies for effective evangelism in Nigeria's bustling commercial environment.",
  },
  {
    id: "ny-001",
    videoId: "jw_5VzBZL3U",
    title: "Faith in the City",
    speaker: "Pastor Funmi Olorunlana",
    series: "Faith at Work",
    topic: "Christian Living",
    date: "2026-08-09",
    duration: "38:45",
    description:
      "Navigating faith and ministry in the contemporary American context while staying rooted in truth.",
  },
  {
    id: "hq-003",
    videoId: "t-Wktk89be0",
    title: "Walking in God's Light",
    speaker: "Prophet Promise Ajetunmobi",
    series: "Prayer Warriors",
    topic: "Christian Living",
    date: "2026-06-14",
    duration: "28:45",
    description: "Start your week with this inspiring devotional message on walking in the light.",
  },
];

export const SPEAKERS = Array.from(new Set(SERMONS.map((s) => s.speaker)));
export const SERIES = Array.from(new Set(SERMONS.map((s) => s.series)));
export const TOPICS = Array.from(new Set(SERMONS.map((s) => s.topic)));

export const LIVE_STREAM = {
  isLive: false,
  channelUrl: "https://www.youtube.com/@flpmi1631",
  schedule: [
    { label: "Sunday Service", time: "10:00 AM EST · 9:00 AM WAT" },
    { label: "Prophetic Programme", time: "Every Wednesday · 6:00 PM – 7:30 PM WAT" },
    { label: "Bible Study", time: "Every Wednesday · 7:30 PM EST" },
    { label: "Friday Prayer", time: "Every Friday · 7:30 PM EST" },
  ],
};
