// YouTube embed/thumbnail utility functions.

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
  quality: "default" | "medium" | "high" | "maxres" = "high"
): string => {
  const qualityMap = {
    default: "default.jpg",
    medium: "mqdefault.jpg",
    high: "hqdefault.jpg",
    maxres: "maxresdefault.jpg",
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formatViewCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};
