"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SERMONS, SPEAKERS, SERIES, TOPICS } from "@/data/sermons";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/youtube";

const ALL = "all";

export function SermonLibrary() {
  const [speaker, setSpeaker] = useState(ALL);
  const [series, setSeries] = useState(ALL);
  const [topic, setTopic] = useState(ALL);
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      SERMONS.filter(
        (s) =>
          (speaker === ALL || s.speaker === speaker) &&
          (series === ALL || s.series === series) &&
          (topic === ALL || s.topic === topic)
      ),
    [speaker, series, topic]
  );

  const activeSermon = SERMONS.find((s) => s.id === playing) ?? null;

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Select value={speaker} onValueChange={setSpeaker}>
          <SelectTrigger className="w-[200px] border-2 border-ink bg-background">
            <SelectValue placeholder="Speaker" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Speakers</SelectItem>
            {SPEAKERS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={series} onValueChange={setSeries}>
          <SelectTrigger className="w-[180px] border-2 border-ink bg-background">
            <SelectValue placeholder="Series" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Series</SelectItem>
            {SERIES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger className="w-[180px] border-2 border-ink bg-background">
            <SelectValue placeholder="Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Topics</SelectItem>
            {TOPICS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No sermons match those filters.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sermon) => (
            <button
              key={sermon.id}
              onClick={() => setPlaying(sermon.id)}
              className="group flex flex-col overflow-hidden border border-border bg-background text-left transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getYouTubeThumbnail(sermon.videoId, "high")}
                  alt={sermon.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-[2] flex items-center justify-center bg-ink/10 transition-colors group-hover:bg-ink/25">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/95 text-ink shadow">
                    <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 z-[2] bg-ink/80 px-2 py-1 text-xs font-medium text-cream">
                  {sermon.duration}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ember">{sermon.topic}</p>
                <h3 className="font-display text-lg font-semibold leading-snug text-ink">{sermon.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{sermon.speaker}</p>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  {new Date(sermon.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Dialog open={!!activeSermon} onOpenChange={(open) => !open && setPlaying(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <DialogTitle className="sr-only">{activeSermon?.title}</DialogTitle>
          {activeSermon && (
            <>
              <div className="aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(activeSermon.videoId, true)}
                  title={activeSermon.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{activeSermon.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeSermon.speaker} · {activeSermon.series}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
