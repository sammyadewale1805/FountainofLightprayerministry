import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Calendar, Users, ExternalLink, Clock } from "lucide-react";
import { getYouTubeThumbnail } from "@/lib/youtube";
import VideoPlayerModal from "./VideoPlayerModal";

const YouTubeIntegration = () => {
  const [selectedChannel, setSelectedChannel] = useState("headquarters");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const playVideo = (video: any, channel: any) => {
    setSelectedVideo({
      ...video,
      location: channel.location,
      category: "Sermon"
    });
    setIsPlayerOpen(true);
  };

  const channels = {
    headquarters: {
      name: "Fountain of Light HQ",
      location: "Akure, Nigeria",
      subscribers: "50.2K",
      channelUrl: "https://www.youtube.com/@fountainoflighthq",
      description: "Official channel of Fountain of Light Prayer Ministry International headquarters",
      videos: [
        {
          id: "dQw4w9WgXcQ", // Replace with your actual video ID
          title: "Sunday Service: The Power of Persistent Prayer",
          duration: "1:45:30",
          views: "15.3K",
          uploadDate: "2024-08-18",
          description: "Join us for this powerful Sunday service message on persistent prayer."
        },
        {
          id: "9bZkp7q19f0", // Replace with your actual video ID
          title: "Wednesday Bible Study: Faith and Works",
          duration: "52:15",
          views: "8.9K",
          uploadDate: "2024-08-14",
          description: "Deep dive into the relationship between faith and works in Christian living."
        },
        {
          id: "ScMzIvxBSi4", // Replace with your actual video ID
          title: "Prayer Meeting: Intercession for Nations",
          duration: "38:45",
          views: "12.1K",
          uploadDate: "2024-08-11",
          description: "Join our powerful prayer meeting as we intercede for nations around the world."
        }
      ]
    },
    lagos: {
      name: "Fountain of Light Lagos",
      location: "Ikorodu, Lagos, Nigeria", 
      subscribers: "28.7K",
      channelUrl: "https://www.youtube.com/@fountainoflightlagos",
      description: "Lagos branch of Fountain of Light Prayer Ministry International",
      videos: [
        {
          id: "kJQP7kiw5Fk", // Replace with your actual video ID
          title: "Youth Revival: Next Generation Ministry",
          duration: "1:12:20",
          views: "22.5K",
          uploadDate: "2024-08-16",
          description: "Empowering young people to be world-changers in their generation."
        },
        {
          id: "jNQXAC9IVRw", // Replace with your actual video ID
          title: "Market Place Evangelism Training",
          duration: "45:30",
          views: "9.8K", 
          uploadDate: "2024-08-12",
          description: "Practical training for effective evangelism in Nigeria's marketplace."
        },
        {
          id: "M7lc1UVf-VE", // Replace with your actual video ID
          title: "Sunday Worship: God's Love Never Fails",
          duration: "1:28:15",
          views: "18.7K",
          uploadDate: "2024-08-09",
          description: "Experience the unfailing love of God in this inspiring worship service."
        }
      ]
    },
    newyork: {
      name: "Fountain of Light NYC",
      location: "New York, USA",
      subscribers: "12.4K", 
      channelUrl: "https://www.youtube.com/@fountainoflightnyc",
      description: "New York branch serving the diaspora community",
      videos: [
        {
          id: "QH2-TGUlwu4", // Replace with your actual video ID
          title: "Faith in the City: Ministry in Modern America",
          duration: "58:45",
          views: "7.2K",
          uploadDate: "2024-08-15",
          description: "Navigating faith and ministry in contemporary American context."
        },
        {
          id: "oHg5SJYRHA0", // Replace with your actual video ID
          title: "The Immigrant's Faith Journey",
          duration: "42:30",
          views: "5.9K",
          uploadDate: "2024-08-10",
          description: "Encouragement for believers navigating life in a new country."
        },
        {
          id: "SfC4_XLBxH0", // Replace with your actual video ID
          title: "Community Outreach: Serving Brooklyn",
          duration: "35:20",
          views: "4.1K",
          uploadDate: "2024-08-07", 
          description: "Highlights from our community service initiatives in Brooklyn."
        }
      ]
    }
  };

  const currentChannel = channels[selectedChannel as keyof typeof channels];

  return (
    <section className="py-16 bg-gradient-to-br from-prayer-blue/5 via-white to-holy-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-divine-gold/10 backdrop-blur-sm border border-divine-gold/20 rounded-full px-6 py-2 mb-6">
            <Play className="w-4 h-4 text-divine-gold" />
            <span className="font-content text-divine-gold text-sm">YouTube Channels</span>
          </div>
          
          <h2 className="font-ministry text-4xl md:text-5xl font-bold text-prayer-blue mb-4">
            Watch Live & Recorded Services
          </h2>
          <p className="font-content text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with our global ministry through our official YouTube channels. 
            Experience live services, catch up on sermons, and stay connected wherever you are.
          </p>
        </div>

        {/* Channel Tabs */}
        <Tabs value={selectedChannel} onValueChange={setSelectedChannel} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto mb-8">
            <TabsTrigger value="headquarters" className="flex flex-col items-center gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇳🇬</span>
                <span className="font-ministry font-semibold">Headquarters</span>
              </div>
              <span className="text-xs text-muted-foreground">Akure, Nigeria</span>
            </TabsTrigger>
            <TabsTrigger value="lagos" className="flex flex-col items-center gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏙️</span>
                <span className="font-ministry font-semibold">Lagos Branch</span>
              </div>
              <span className="text-xs text-muted-foreground">Ikorodu, Lagos</span>
            </TabsTrigger>
            <TabsTrigger value="newyork" className="flex flex-col items-center gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span>
                <span className="font-ministry font-semibold">New York</span>
              </div>
              <span className="text-xs text-muted-foreground">Brooklyn, NY</span>
            </TabsTrigger>
          </TabsList>

          {Object.entries(channels).map(([key, channel]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              {/* Channel Header */}
              <Card className="shadow-prayer">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="font-ministry text-2xl text-prayer-blue mb-2">
                        {channel.name}
                      </CardTitle>
                      <p className="font-content text-muted-foreground mb-2">
                        {channel.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{channel.subscribers} subscribers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span>{channel.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="divine" 
                      size="lg"
                      onClick={() => window.open(channel.channelUrl, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Channel
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Recent Videos */}
              <div>
                <h3 className="font-ministry text-xl font-semibold text-prayer-blue mb-6">
                  Recent Videos
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {channel.videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden shadow-prayer hover:shadow-divine transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      {/* Video Thumbnail */}
                      <div className="relative" onClick={() => playVideo(video, channel)}>
                        <img 
                          src={getYouTubeThumbnail(video.id, 'high')} 
                          alt={video.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PGcgZmlsbD0iIzk5OTk5OSI+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTEyLjUiIHI9IjI0Ii8+PHBhdGggZD0iTTIwMCA5NmwxNiAxNi0xNiAxNnoiLz48L2c+PC9zdmc+';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="w-12 h-12 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                          {video.duration}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h4 className="font-ministry font-semibold text-prayer-blue line-clamp-2 mb-2">
                          {video.title}
                        </h4>
                        
                        <p className="font-content text-sm text-muted-foreground line-clamp-2 mb-3">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                          </div>
                          <span>{video.views} views</span>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => playVideo(video, channel)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Live Schedule */}
        <Card className="mt-12 shadow-divine">
          <CardHeader>
            <CardTitle className="font-ministry text-xl text-prayer-blue flex items-center gap-2">
              <Clock className="w-5 h-5 text-divine-gold" />
              Live Service Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-prayer-blue/5 rounded-lg">
                <h4 className="font-ministry font-semibold text-prayer-blue mb-2">🇳🇬 Headquarters</h4>
                <p className="font-content text-sm text-muted-foreground">
                  Sunday: 9:00 AM WAT<br/>
                  Wednesday: 6:00 PM WAT
                </p>
              </div>
              <div className="text-center p-4 bg-prayer-blue/5 rounded-lg">
                <h4 className="font-ministry font-semibold text-prayer-blue mb-2">🏙️ Lagos Branch</h4>
                <p className="font-content text-sm text-muted-foreground">
                  Sunday: 10:00 AM WAT<br/>
                  Friday: 7:00 PM WAT
                </p>
              </div>
              <div className="text-center p-4 bg-prayer-blue/5 rounded-lg">
                <h4 className="font-ministry font-semibold text-prayer-blue mb-2">🇺🇸 New York</h4>
                <p className="font-content text-sm text-muted-foreground">
                  Sunday: 11:00 AM EST<br/>
                  Thursday: 7:30 PM EST
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        video={selectedVideo}
      />
    </section>
  );
};

export default YouTubeIntegration;
