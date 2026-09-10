export interface Ministry {
  slug: string;
  name: string;
  description: string;
  ageGroup: string;
  meeting: string;
  leader: string;
  icon: "sprout" | "flame" | "users" | "shield" | "heart" | "globe";
}

export const MINISTRIES: Ministry[] = [
  {
    slug: "children",
    name: "Children's Ministry",
    description:
      "A safe, joyful space where kids discover God's love through age-appropriate teaching, worship, and play.",
    ageGroup: "Ages 0–11",
    meeting: "Sundays, during main service",
    leader: "Ask at the welcome desk",
    icon: "sprout",
  },
  {
    slug: "youth",
    name: "Youth Ministry",
    description:
      "Helping teenagers wrestle honestly with faith and grow into young men and women grounded in Christ.",
    ageGroup: "Ages 12–17",
    meeting: "Sundays, 4:00 PM",
    leader: "Ask at the welcome desk",
    icon: "flame",
  },
  {
    slug: "young-adults",
    name: "Young Adults",
    description:
      "A community for students and young professionals navigating career, calling, and faith together.",
    ageGroup: "Ages 18–30",
    meeting: "Fridays, 7:00 PM",
    leader: "Ask at the welcome desk",
    icon: "users",
  },
  {
    slug: "men",
    name: "Men's Fellowship",
    description:
      "Building men of integrity through accountability, prayer, and honest conversation about faith and life.",
    ageGroup: "All men",
    meeting: "Second Saturday, monthly",
    leader: "Ask at the welcome desk",
    icon: "shield",
  },
  {
    slug: "women",
    name: "Women's Fellowship",
    description:
      "Encouraging women in every season of life through Bible study, prayer, and genuine community.",
    ageGroup: "All women",
    meeting: "Third Saturday, monthly",
    leader: "Ask at the welcome desk",
    icon: "heart",
  },
  {
    slug: "outreach",
    name: "Outreach & Missions",
    description:
      "Carrying the Gospel and practical care beyond our walls — crusades, missions trips, and community service.",
    ageGroup: "All ages",
    meeting: "Quarterly campaigns",
    leader: "Pastor Ayokunle Ashogbon",
    icon: "globe",
  },
];
