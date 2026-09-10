import type { StaticImageData } from "next/image";
import pastorDurojayePhoto from "@/assets/flmi2.jpg";
import pastorFunmiPhoto from "@/assets/flpmi4.jpg";
import promiseAjetunmobiPhoto from "@/assets/prophet-promise-ajetunmobi.jpg";
import pastorAyokunlePhoto from "@/assets/pastor-ayokunle-ashogbon.jpg";

export interface Leader {
  slug: string;
  name: string;
  title: string;
  branch: string;
  bio: string;
  photo: StaticImageData;
  /** CSS object-position for the photo crop. Defaults to "center". */
  photoPosition?: string;
}

// Photos are real ministry photographs. Bios are intentionally short —
// swap in fuller biographies whenever they're ready.
export const LEADERSHIP: Leader[] = [
  {
    slug: "durojaiye-olorunlana",
    name: "Pastor Durojaiye Olorunlana",
    title: "General Overseer",
    branch: "International Headquarters, New York",
    bio: "Oversees Fountain of Light Prayer Ministry from the International Headquarters in New York, with a focus on practical, everyday faith across the diaspora community.",
    photo: pastorDurojayePhoto,
  },
  {
    slug: "funmi-olorunlana",
    name: "Pastor Funmi Olorunlana",
    title: "Co-Pastor",
    branch: "International Headquarters, New York",
    bio: "Shepherds the New York congregation alongside Pastor Durojaiye, with a heart for discipleship, worship, and welcoming the diaspora community.",
    photo: pastorFunmiPhoto,
  },
  {
    slug: "promise-ajetunmobi",
    name: "Prophet Promise Ajetunmobi",
    title: "Resident Pastor",
    branch: "Akure Branch",
    bio: "Leads the Akure congregation, devoted to prayer, the Word, and raising up disciples who carry God's light into their communities.",
    photo: promiseAjetunmobiPhoto,
  },
  {
    slug: "ayokunle-ashogbon",
    name: "Pastor Ayokunle Ashogbon",
    title: "Resident Pastor",
    branch: "Ikorodu, Lagos Branch",
    bio: "Oversees the Lagos branch's outreach and marketplace evangelism, equipping members to live out their faith across Nigeria's commercial capital.",
    photo: pastorAyokunlePhoto,
    photoPosition: "50% 12%",
  },
];
