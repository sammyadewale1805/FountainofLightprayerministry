// YouTube utility functions and configuration

// ========================================
// YOUTUBE CHANNEL CONFIGURATION
// Replace these with your actual YouTube channel IDs
// ========================================
export const YOUTUBE_CHANNELS = {
  main: {
    channelId: "UCxxxxxxxxxxxxxxxx", // Replace with your main channel ID
    channelHandle: "@FountainOfLightMinistry", // Your YouTube handle
    channelUrl: "https://www.youtube.com/@flpmi1631",
    name: "Fountain of Light Prayer Ministry",
  },
  headquarters: {
    channelId: "UCxxxxxxxxxxxxxxxx",
    channelHandle: "@FOLPMAkure",
    channelUrl: "https://www.youtube.com/@FOLPMAkure",
    name: "FOLPM Headquarters - Akure",
  },
  lagos: {
    channelId: "UCxxxxxxxxxxxxxxxx",
    channelHandle: "@FOLPMLagos",
    channelUrl: "https://www.youtube.com/@FOLPMLagos",
    name: "FOLPM Lagos",
  },
  newyork: {
    channelId: "UCxxxxxxxxxxxxxxxx",
    channelHandle: "@FOLPMNYC",
    channelUrl: "https://www.youtube.com/@FOLPMNYC",
    name: "FOLPM New York",
  },
};

// ========================================
// LIVE STREAM CONFIGURATION
// You can manually set this to true when going live,
// or integrate with YouTube Data API for automatic detection
// ========================================
export interface LiveStreamConfig {
  isLive: boolean;
  videoId: string | null;
  title: string;
  startTime?: string;
  viewerCount?: number;
  channelKey: keyof typeof YOUTUBE_CHANNELS;
}

// Manual live stream toggle - Update this when going live
// In production, you'd want to use YouTube Data API or a backend service
export const LIVE_STREAM_CONFIG: LiveStreamConfig = {
  isLive: false, // Set to true when streaming live
  videoId: null, // Your live stream video ID when live (e.g., "abc123xyz")
  title: "Sunday Service Live",
  startTime: undefined,
  viewerCount: undefined,
  channelKey: "main",
};

// Service schedule for automatic "likely live" detection
export const SERVICE_SCHEDULE = [
  { day: 0, hour: 10, duration: 120, title: "Sunday Service", timezone: "America/New_York" }, // Sunday 10 AM EST
  { day: 0, hour: 9, duration: 120, title: "Sunday Service", timezone: "Africa/Lagos" }, // Sunday 9 AM WAT
  { day: 3, hour: 19, duration: 90, title: "Wednesday Bible Study", timezone: "America/New_York" }, // Wed 7 PM EST
  { day: 5, hour: 18, duration: 60, title: "Friday Prayer Meeting", timezone: "Africa/Lagos" }, // Fri 6 PM WAT
];

// Check if current time is during a scheduled service
export const isScheduledServiceTime = (): { isLive: boolean; title: string } | null => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  
  for (const service of SERVICE_SCHEDULE) {
    if (service.day === currentDay) {
      const serviceEndHour = service.hour + Math.floor(service.duration / 60);
      if (currentHour >= service.hour && currentHour < serviceEndHour) {
        return { isLive: true, title: service.title };
      }
    }
  }
  
  return null;
};

// ========================================
// URL & EMBED UTILITIES
// ========================================
export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/live\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

export const getYouTubeEmbedUrl = (videoId: string, autoplay = false): string => {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    fs: "1",
    ...(autoplay && { autoplay: "1", mute: "1" }),
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

export const getYouTubeLiveEmbedUrl = (channelId: string): string => {
  return `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`;
};

export const getYouTubeThumbnail = (
  videoId: string, 
  quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'
): string => {
  const qualityMap = {
    default: 'default.jpg',
    medium: 'mqdefault.jpg', 
    high: 'hqdefault.jpg',
    maxres: 'maxresdefault.jpg'
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatViewCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

// ========================================
// YOUR ACTUAL CHURCH VIDEOS
// Updated with your real video ID: y3fGYla-ytE
// ========================================
export interface VideoData {
  id: string;
  title: string;
  duration: string;
  views: string;
  uploadDate: string;
  description: string;
  thumbnail?: string;
}

export const sampleVideos: Record<string, VideoData[]> = {
  headquarters: [
    {
      id: "y3fGYla-ytE", // Your actual video ID
      title: "Sunday Service: The Power of Persistent Prayer",
      duration: "1:45:30",
      views: "15.3K",
      uploadDate: "2024-08-18",
      description: "Join us for this powerful Sunday service message on persistent prayer.",
      thumbnail: getYouTubeThumbnail("y3fGYla-ytE", "high")
    },
    {
      id: "JNrHByCyAUE", // This is still a placeholder - replace with your next video
      title: "Wednesday Bible Study: Faith and Works",
      duration: "52:15",
      views: "8.9K", 
      uploadDate: "2024-08-14",
      description: "Deep dive into the relationship between faith and works in Christian living.",
      thumbnail: getYouTubeThumbnail("JNrHByCyAUE", "high")
    },
    {
      id: "1t3V7eFSXIw", // This is still a placeholder - replace with your next video
      title: "Morning Devotion: Walking in God's Light",
      duration: "28:45",
      views: "5.2K",
      uploadDate: "2024-08-10",
      description: "Start your day with this inspiring devotional message.",
      thumbnail: getYouTubeThumbnail("1t3V7eFSXIw", "high")
    }
  ],
  lagos: [
    {
      id: "jw_5VzBZL3U", // You can use the same video or different ones per location
      title: "Youth Revival: Next Generation Ministry", 
      duration: "1:12:20",
      views: "22.5K",
      uploadDate: "2024-08-16",
      description: "Empowering young people to be world-changers in their generation.",
      thumbnail: getYouTubeThumbnail("jw_5VzBZL3U", "high")
    },
    {
      id: "t-Wktk89be0", // Placeholder - replace with your Lagos video
      title: "Community Outreach Highlights",
      duration: "15:30",
      views: "3.8K",
      uploadDate: "2024-08-12",
      description: "See how our Lagos branch is impacting the community.",
      thumbnail: getYouTubeThumbnail("t-Wktk89be0", "high")
    }
  ],
  newyork: [
    {
      id: "y3fGYla-ytE", // You can use the same video or different ones per location
      title: "Faith in the City: Ministry in Modern America",
      duration: "58:45", 
      views: "7.2K",
      uploadDate: "2024-08-15",
      description: "Navigating faith and ministry in contemporary American context.",
      thumbnail: getYouTubeThumbnail("y3fGYla-ytE", "high")
    },
    {
      id: "QH2-TGUlwu4", // Placeholder - replace with your New York video
      title: "The Immigrant's Faith Journey",
      duration: "42:30",
      views: "5.9K",
      uploadDate: "2024-08-10",
      description: "Encouragement for believers navigating life in a new country.",
      thumbnail: getYouTubeThumbnail("QH2-TGUlwu4", "high")
    }
  ]
};

// Get featured/recent videos across all channels
export const getFeaturedVideos = (limit = 6): VideoData[] => {
  const allVideos = Object.values(sampleVideos).flat();
  return allVideos
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, limit);
};

// Helper function to get video details from YouTube (optional)
// This would require YouTube API but shows how to get actual data
export const getVideoDetails = async (videoId: string) => {
  // You would need YouTube API key for this
  // For now, return the manual data
  return {
    id: videoId,
    embedUrl: getYouTubeEmbedUrl(videoId),
    thumbnail: getYouTubeThumbnail(videoId, 'high'),
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`
  };
};

// Example usage in your React component:
/*
import { sampleVideos, getYouTubeEmbedUrl, getYouTubeThumbnail, formatViewCount } from './youtubeUtils';

function VideoGallery() {
  const videos = sampleVideos.headquarters; // or getFeaturedVideos()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={video.thumbnail || getYouTubeThumbnail(video.id)} 
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{video.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{video.views} views</p>
            <p className="text-gray-500 text-sm mb-4">{video.description}</p>
            <a 
              href={getYouTubeEmbedUrl(video.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Watch Video
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
*/