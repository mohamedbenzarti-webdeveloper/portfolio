import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}, Software Engineer / Web Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The default OG font has no Arabic glyphs, so the card stays in English for every language.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0b0b12",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(59,130,246,0.18), transparent 40%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, color: "#a1a1aa" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: "#34d399" }} />
          OPEN TO OPPORTUNITIES
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#a1a1aa" }}>
            {"Software Engineer / Web Developer · Tunisia"}
          </div>
        </div>
        <div
          style={{
            height: 6,
            width: "100%",
            borderRadius: 6,
            backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899 50%, #3b82f6)",
          }}
        />
      </div>
    ),
    size,
  );
}
