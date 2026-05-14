import { useState } from "react";

const SERMONS = [
  {
    id: "hq-001",
    videoId: "407CjEyB_Vs",
    title: "The Power of Persistent Prayer",
    pastor: "Pator Durojaiye olorunlana",
    location: "NY",
    loc: "USA",
    date: "2024-08-18",
    duration: "45 min",
    category: "Prayer & Intercession",
    desc: "Understanding the biblical foundation of persistent prayer and its transformative power in daily lives.",
    langs: ["English", "Yoruba"],
    isNew: true,
  },
  {
    id: "hq-002",
    videoId: "exljcE56oPA",
    title: "Unity in Diversity: Global Ministry Vision",
    pastor: "Rev. Dr. Emmanuel Adeyemi",
    location: "Akure Headquarters",
    loc: "akure",
    date: "2024-07-28",
    duration: "52 min",
    category: "Vision & Leadership",
    desc: "God's heart for global ministry — maintaining unity across different cultures and locations.",
    langs: ["English", "Yoruba"],
    isNew: false,
  },
  {
    id: "lg-001",
    videoId: "exljcE56oPA",
    title: "Market Place Evangelism: Reaching Lagos",
    pastor: "Pastor Adebayo Johnson",
    location: "Ikorodu, Lagos Branch",
    loc: "lagos",
    date: "2024-08-04",
    duration: "42 min",
    category: "Evangelism",
    desc: "Practical strategies for effective evangelism in Nigeria's bustling commercial environment.",
    langs: ["English", "Yoruba"],
    isNew: false,
  },
  {
    id: "ny-001",
    videoId: "80Ru5eNRgtE",
    title: "Faith in the City: Ministry in Modern America",
    pastor: "Pastor funmi Olorunlana",
    location: "New York Branch",
    loc: "new-york",
    duration: "38 min",
    category: "Christian Living",
    desc: "Navigating faith and ministry in the contemporary American context while maintaining biblical truth.",
    langs: ["English"],
    isNew: false,
  },
];

const LOCATIONS = [
  { code: "all", label: "All Locations", flag: "🌍" },
  { code: "akure", label: "Akure HQ", flag: "🇳🇬" },
  { code: "lagos", label: "Lagos", flag: "🇳🇬" },
  { code: "new-york", label: "New York", flag: "🇺🇸" },
];

const LANGS = [
  { code: "all", label: "All Languages" },
  { code: "Yoruba", label: "Yoruba" },
];

// ── inline styles ────────────────────────────────────────────────────
const DB = {
  900: "#042C53",
  800: "#0C447C",
  600: "#185FA5",
  400: "#378ADD",
  200: "#85B7EB",
  100: "#B5D4F4",
  50:  "#E6F1FB",
  gold: "#EF9F27",
  goldLight: "#FAC775",
};

const s: Record<string, React.CSSProperties> = {
  wrap: {
    background: DB[900],
    minHeight: "100vh",
    padding: "2rem 1.5rem",
    fontFamily: "sans-serif",
  },
  hero: { textAlign: "center", padding: "2rem 0 2.5rem" },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(55,138,221,0.18)",
    border: `0.5px solid ${DB[400]}`,
    borderRadius: 999,
    padding: "5px 14px",
    fontSize: 12,
    color: DB[200],
    letterSpacing: "0.04em",
    marginBottom: "1rem",
  },
  h1: { fontSize: 28, fontWeight: 500, color: "#fff", lineHeight: 1.25, marginBottom: "0.6rem" },
  sub: { fontSize: 14, color: DB[200], maxWidth: 520, margin: "0 auto", lineHeight: 1.6 },
  filters: { display: "flex", flexWrap: "wrap" as const, gap: 8, justifyContent: "center", marginBottom: "2rem" },
  divider: { width: 0.5, background: "rgba(133,183,235,0.2)", height: 28, alignSelf: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 },
  card: {
    background: DB[800],
    border: `0.5px solid rgba(133,183,235,0.15)`,
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.15s, border-color 0.15s",
  },
  thumb: { position: "relative" as const, aspectRatio: "16/9", overflow: "hidden", background: DB[900] },
  img: { width: "100%", height: "100%", objectFit: "cover" as const, display: "block" },
  overlay: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(4,44,83,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playCircle: {
    width: 44, height: 44, background: DB.gold, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  badgeNew: {
    position: "absolute" as const, top: 8, right: 8,
    background: DB.gold, color: DB[900], fontSize: 10, fontWeight: 500,
    padding: "2px 8px", borderRadius: 999,
  },
  dur: {
    position: "absolute" as const, bottom: 8, right: 8,
    background: "rgba(4,44,83,0.82)", color: DB[100],
    fontSize: 10, padding: "2px 7px", borderRadius: 4,
  },
  body: { padding: "12px 14px 14px" },
  cat: {
    display: "inline-block", background: "rgba(55,138,221,0.18)",
    color: DB[200], fontSize: 10, padding: "2px 8px", borderRadius: 999, marginBottom: 8,
  },
  cardTitle: { fontSize: 13, fontWeight: 500, color: "#fff", lineHeight: 1.35, marginBottom: 6 },
  meta: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: DB[200], marginBottom: 3 },
  desc: {
    fontSize: 11, color: "rgba(181,212,244,0.7)", lineHeight: 1.5, margin: "8px 0",
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
  },
  langs: { display: "flex", gap: 4, margin: "8px 0", flexWrap: "wrap" as const },
  lang: {
    fontSize: 10, background: "rgba(239,159,39,0.15)", color: DB.goldLight,
    padding: "2px 7px", borderRadius: 999,
  },
  actions: { display: "flex", gap: 6, marginTop: 10 },
  btnPlay: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
    background: DB[600], border: "none", borderRadius: 6, color: "#fff",
    fontSize: 12, padding: "7px 10px", cursor: "pointer", fontFamily: "inherit",
  },
  btnDl: {
    background: "transparent", border: `0.5px solid rgba(133,183,235,0.3)`,
    borderRadius: 6, color: DB[200], padding: "7px 10px", cursor: "pointer", fontFamily: "inherit",
  },
  empty: { textAlign: "center" as const, padding: "3rem 1rem", color: DB[200] },
  modalBg: {
    position: "fixed" as const, inset: 0, background: "rgba(4,44,83,0.92)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem",
  },
  modalBox: {
    background: DB[800], border: `0.5px solid rgba(133,183,235,0.2)`,
    borderRadius: 12, width: "100%", maxWidth: 640, overflow: "hidden",
  },
  modalIframe: { aspectRatio: "16/9", width: "100%", display: "block", border: "none" },
  modalFooter: { padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalClose: {
    background: "transparent", border: `0.5px solid rgba(133,183,235,0.3)`,
    borderRadius: 6, color: DB[200], padding: "7px 12px", cursor: "pointer",
    fontFamily: "inherit", fontSize: 12,
  },
};

function pill(active: boolean, gold = false): React.CSSProperties {
  return {
    background: active ? (gold ? DB.gold : DB[600]) : "transparent",
    border: `0.5px solid ${active ? (gold ? DB.gold : DB[600]) : "rgba(133,183,235,0.3)"}`,
    color: active ? (gold ? DB[900] : "#fff") : DB[200],
    borderRadius: 999, padding: "6px 14px", fontSize: 12,
    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
  };
}

// ── component ────────────────────────────────────────────────────────
export default function SermonLibrary() {
  const [loc, setLoc] = useState("all");
  const [lang, setLang] = useState("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [modal, setModal] = useState<{ videoId: string; title: string; meta: string } | null>(null);

  const filtered = SERMONS.filter(
    (s) =>
      (loc === "all" || s.loc === loc) &&
      (lang === "all" || s.langs.includes(lang))
  );

  function openModal(s: typeof SERMONS[0]) {
    setModal({ videoId: s.videoId, title: s.title, meta: `${s.pastor} · ${s.location}` });
  }

  return (
    <div style={s.wrap}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.eyebrow}>▶ Global Sermon Library</div>
        <h1 style={s.h1}>Messages That Transform Lives</h1>
        <p style={s.sub}>
          Powerful sermons from all our locations — diverse perspectives, one Gospel across cultures and continents.
        </p>
      </div>

      {/* Filters */}
      <div style={s.filters}>
        {LOCATIONS.map((l) => (
          <button key={l.code} style={pill(loc === l.code)} onClick={() => setLoc(l.code)}>
            {l.flag} {l.label}
          </button>
        ))}
        <div style={s.divider} />
        {LANGS.map((l) => (
          <button key={l.code} style={pill(lang === l.code, true)} onClick={() => setLang(l.code)}>
            {l.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={s.empty}>
          <p style={{ fontSize: 15, color: "#fff", marginBottom: 4 }}>No sermons found</p>
          <p>Try adjusting the location or language filters.</p>
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map((sermon) => (
            <div
              key={sermon.id}
              style={{
                ...s.card,
                transform: hovered === sermon.id ? "translateY(-3px)" : "none",
                borderColor: hovered === sermon.id ? DB[400] : "rgba(133,183,235,0.15)",
              }}
              onMouseEnter={() => setHovered(sermon.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openModal(sermon)}
            >
              {/* Thumbnail */}
              <div style={s.thumb}>
                <img
                  src={`https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`}
                  alt={sermon.title}
                  style={s.img}
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
                />
                {hovered === sermon.id && (
                  <div style={s.overlay}>
                    <div style={s.playCircle}>
                      <span style={{ fontSize: 18, color: DB[900], marginLeft: 2 }}>▶</span>
                    </div>
                  </div>
                )}
                {sermon.isNew && <span style={s.badgeNew}>New</span>}
                <span style={s.dur}>{sermon.duration}</span>
              </div>

              {/* Body */}
              <div style={s.body}>
                <span style={s.cat}>{sermon.category}</span>
                <div style={s.cardTitle}>{sermon.title}</div>
                <div style={s.meta}>👤 {sermon.pastor}</div>
                <div style={s.meta}>📍 {sermon.location}</div>
                <div style={s.meta}>
                  📅 {new Date(sermon.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </div>
                <p style={s.desc}>{sermon.desc}</p>
                <div style={s.langs}>
                  {sermon.langs.map((l) => (
                    <span key={l} style={s.lang}>{l}</span>
                  ))}
                </div>
                <div style={s.actions}>
                  <button
                    style={s.btnPlay}
                    onClick={(e) => { e.stopPropagation(); openModal(sermon); }}
                  >
                    ▶ Play
                  </button>
                  <button
                    style={s.btnDl}
                    aria-label="Download"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={s.modalBg} onClick={() => setModal(null)}>
          <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
            <iframe
              style={s.modalIframe}
              src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={modal.title}
            />
            <div style={s.modalFooter}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{modal.title}</p>
                <p style={{ fontSize: 12, color: DB[200], marginTop: 2 }}>{modal.meta}</p>
              </div>
              <button style={s.modalClose} onClick={() => setModal(null)}>✕ Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}