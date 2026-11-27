/**
 * Illustrated cover for BOCARO: a ceramic tile floor in perspective (the
 * product simulation) beneath a floating catalogue panel. Decorative only.
 */

function TileMotif({ id, a, b }: { id: string; a: string; b: string }) {
  return (
    <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
      <rect width="48" height="48" fill="#12121b" />
      <rect x="0.5" y="0.5" width="47" height="47" fill="none" stroke="rgba(255,255,255,0.10)" />
      <path d="M0 24A24 24 0 0 1 24 0" fill="none" stroke={a} strokeWidth="1.4" />
      <path d="M24 48A24 24 0 0 1 48 24" fill="none" stroke={a} strokeWidth="1.4" />
      <path d="M24 0A24 24 0 0 0 48 24" fill="none" stroke={b} strokeWidth="1" opacity="0.7" />
      <path d="M0 24A24 24 0 0 0 24 48" fill="none" stroke={b} strokeWidth="1" opacity="0.7" />
      <rect x="20" y="20" width="8" height="8" transform="rotate(45 24 24)" fill={b} opacity="0.55" />
    </pattern>
  );
}

const swatches = [
  ["#8b5cf6", "#ec4899"],
  ["#3b82f6", "#8b5cf6"],
  ["#ec4899", "#3b82f6"],
  ["#a1a1aa", "#8b5cf6"],
  ["#8b5cf6", "#3b82f6"],
  ["#ec4899", "#a1a1aa"],
] as const;

export type BocaroCoverLabels = { catalogue: string; simulator: string; whatsapp: string };

export function BocaroCover({ labels }: { labels: BocaroCoverLabels }) {
  return (
    <div dir="ltr" className="@container absolute inset-0 overflow-hidden bg-[#0e0e17]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(139,92,246,0.28),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(236,72,153,0.16),transparent_50%)]" />

      {/* Perspective floor */}
      <div className="absolute inset-x-[-30%] bottom-[-8%] h-[78%] [perspective:900px]">
        <svg
          className="size-full origin-bottom transition-transform duration-[1.4s] ease-(--ease-out-expo) [transform:rotateX(64deg)] group-hover:[transform:rotateX(58deg)_scale(1.04)]"
          viewBox="0 0 960 480"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <TileMotif id="bocaro-tile" a="#ec4899" b="#8b5cf6" />
            <linearGradient id="bocaro-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0e0e17" stopOpacity="1" />
              <stop offset="0.45" stopColor="#0e0e17" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="960" height="480" fill="url(#bocaro-tile)" />
          <rect width="960" height="480" fill="url(#bocaro-fade)" />
        </svg>
      </div>

      {/* Catalogue panel */}
      <div className="absolute top-[9%] left-[6%] w-[46%] rounded-[1.6cqw] border border-white/10 bg-[#151520]/90 p-[2.2cqw] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform duration-700 ease-(--ease-out-expo) group-hover:-translate-y-[1.5%]">
        <div className="flex items-center gap-[0.8cqw]">
          <span className="size-[1cqw] rounded-full bg-white/20" />
          <span className="size-[1cqw] rounded-full bg-white/20" />
          <span className="size-[1cqw] rounded-full bg-white/20" />
          <span className="ml-auto font-mono text-[1.5cqw] tracking-[0.15em] text-white/55 uppercase">
            {labels.catalogue}
          </span>
        </div>
        <div className="mt-[2cqw] grid grid-cols-3 gap-[1.2cqw]">
          {swatches.map(([a, b], i) => (
            <div key={i}>
              <svg viewBox="0 0 48 48" className="aspect-square w-full rounded-[0.6cqw]">
                <defs>
                  <TileMotif id={`bocaro-swatch-${i}`} a={a} b={b} />
                </defs>
                <rect width="48" height="48" fill={`url(#bocaro-swatch-${i})`} />
              </svg>
              <span className="mt-[0.8cqw] block h-[0.7cqw] w-3/4 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
        <div className="mt-[2cqw] flex items-center justify-between gap-[1cqw] rounded-full bg-[#25d366] px-[1.8cqw] py-[1cqw] font-mono text-[1.5cqw] font-semibold tracking-[0.08em] text-[#06210f] uppercase">
          <span>{labels.whatsapp}</span>
          <svg viewBox="0 0 24 24" className="size-[2cqw]" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
          </svg>
        </div>
      </div>

      {/* Simulation tag */}
      <div className="absolute top-[12%] right-[7%] flex items-center gap-[1cqw] rounded-full border border-white/12 bg-black/30 px-[1.6cqw] py-[0.8cqw] font-mono text-[1.5cqw] tracking-[0.15em] text-white/70 uppercase backdrop-blur-sm">
        <span className="size-[1cqw] rounded-full bg-pink" />
        {labels.simulator}
      </div>
    </div>
  );
}
