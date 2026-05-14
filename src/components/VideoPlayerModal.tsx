import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, Calendar, MapPin, User } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    id: string;
    title: string;
    description: string;
    duration: string;
    views: string;
    uploadDate: string;
    pastor?: string;
    location?: string;
    category?: string;
  } | null;
}

const VideoPlayerModal = ({ isOpen, onClose, video }: VideoPlayerModalProps) => {
  if (!video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.id);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] p-0 overflow-hidden">
        <div className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Video Info */}
          <div className="p-6 bg-white">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <DialogHeader className="text-left p-0 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {video.category && (
                      <Badge variant="secondary" className="text-xs">
                        {video.category}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <DialogTitle className="font-ministry text-xl text-prayer-blue leading-tight">
                    {video.title}
                  </DialogTitle>

                  {video.pastor && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span className="font-content font-medium text-prayer-blue">
                        {video.pastor}
                      </span>
                    </div>
                  )}

                  {video.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="font-content">{video.location}</span>
                    </div>
                  )}
                </DialogHeader>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <div className="text-sm text-muted-foreground">
                  {video.views} views • {video.duration}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(watchUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Watch on YouTube
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="font-content text-sm text-muted-foreground leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;