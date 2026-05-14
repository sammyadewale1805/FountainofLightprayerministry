import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Users, Clock, ExternalLink, Calendar, Radio, Youtube, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  YOUTUBE_CHANNELS, 
  LIVE_STREAM_CONFIG, 
  getYouTubeEmbedUrl, 
  getYouTubeThumbnail,
  getFeaturedVideos,
  type VideoData 
} from "@/lib/youtube";

interface LiveStreamSectionProps {
  isLive?: boolean;
  liveVideoId?: string | null;
}

const LiveStreamSection = ({ 
  isLive = LIVE_STREAM_CONFIG.isLive, 
  liveVideoId = LIVE_STREAM_CONFIG.videoId 
}: LiveStreamSectionProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const featuredVideos = getFeaturedVideos(6);

  // Get the main channel info
  const mainChannel = YOUTUBE_CHANNELS.main;

  return (
    <section id="live-stream" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-2 mb-4">
            <Youtube className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Watch Online</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            {isLive ? (
              <span className="flex items-center justify-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                We're Live Now
              </span>
            ) : (
              "Watch Our Services"
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isLive 
              ? "Join thousands of believers watching right now. Experience the power of worship from anywhere in the world."
              : "Catch up on our latest sermons, teachings, and special events. Subscribe to our channel for notifications."
            }
          </p>
        </motion.div>

        {/* Main Video Player / Live Stream */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {isLive && liveVideoId ? (
            /* LIVE STREAM PLAYER */
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* Live Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  <span className="font-bold text-sm">LIVE</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-full">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">2.4K watching</span>
                </div>
              </div>

              {/* Mute Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Video Player */}
              <div className="aspect-video">
                <iframe
                  src={`${getYouTubeEmbedUrl(liveVideoId, true)}&mute=${isMuted ? 1 : 0}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Live Stream"
                />
              </div>
            </div>
          ) : selectedVideo ? (
            /* SELECTED VIDEO PLAYER */
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/80 transition-colors text-sm font-medium"
              >
                ← Back to videos
              </button>
              <div className="aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.id, true)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>
              <div className="bg-slate-800 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                <p className="text-white/80">{selectedVideo.description}</p>
              </div>
            </div>
          ) : (
            /* NOT LIVE - SHOW FEATURED VIDEO */
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                 onClick={() => featuredVideos[0] && setSelectedVideo(featuredVideos[0])}>
              <img 
                src={getYouTubeThumbnail(featuredVideos[0]?.id || '', 'maxres')}
                alt="Featured sermon"
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors"
                >
                  <Play className="w-8 h-8 text-prayer-blue ml-1" fill="currentColor" />
                </motion.div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredVideos[0]?.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredVideos[0]?.views} views</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {featuredVideos[0]?.title || "Latest Sermon"}
                </h3>
                <p className="text-white/80 line-clamp-2 max-w-2xl">
                  {featuredVideos[0]?.description}
                </p>
              </div>

              {/* Watch Live Button (when not currently live) */}
              <div className="absolute top-4 right-4">
                <a 
                  href={mainChannel.channelUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Radio className="w-4 h-4" />
                  Subscribe for Live Alerts
                </a>
              </div>
            </div>
          )}
        </motion.div>

        {/* Service Schedule (when not live) */}
        {!isLive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-0 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-divine-gold/20 rounded-xl">
                      <Calendar className="w-6 h-6 text-divine-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Next Live Service</h3>
                      <p className="text-white/80">Sunday, 10:00 AM EST • Join us online</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href={mainChannel.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
                        <Youtube className="w-4 h-4 mr-2" />
                        Subscribe
                      </Button>
                    </a>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Set Reminder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recent Videos Grid */}
        {!selectedVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Recent Sermons</h3>
              <a 
                href={mainChannel.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-divine-gold transition-colors font-medium flex items-center gap-1"
              >
                View All <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVideos.slice(isLive ? 0 : 1).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer card-hover group border-0 shadow-md"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative">
                      <img 
                        src={getYouTubeThumbnail(video.id, 'high')}
                        alt={video.title}
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          <Play className="w-5 h-5 text-prayer-blue ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                        <h4 className="font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LiveStreamSection;
