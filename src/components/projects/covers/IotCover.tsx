/**
 * Illustrated cover for the IoT monitoring app: connected sensor nodes linked
 * to a phone showing a device map, device list and an alert. Decorative only.
 */

const nodes = [
  { x: 14, y: 24, label: "N-01" },
  { x: 22, y: 70, label: "N-02" },
  { x: 86, y: 30, label: "N-03" },
  { x: 80, y: 76, label: "N-04" },
];

const devices = [
  { status: "bg-live", width: "w-[70%]" },
  { status: "bg-blue", width: "w-[55%]" },
  { status: "bg-pink", width: "w-[62%]" },
];

const pins = [
  { left: "28%", top: "38%", color: "bg-blue" },
  { left: "62%", top: "28%", color: "bg-purple" },
  { left: "50%", top: "66%", color: "bg-pink" },
];

export type IotCoverLabels = { devices: string; alert: string };

export function IotCover({ labels }: { labels: IotCoverLabels }) {
  return (
    <div dir="ltr" className="@container absolute inset-0 overflow-hidden bg-[#0d0e17]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(59,130,246,0.26),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(139,92,246,0.22),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:3.2cqw_3.2cqw] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Links between sensor nodes and the phone */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((node) => (
          <line
            key={node.label}
            x1={node.x}
            y1={node.y}
            x2="50"
            y2="50"
            stroke="rgba(161,161,170,0.35)"
            strokeWidth="0.25"
            strokeDasharray="1 1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="relative grid size-[5.5cqw] place-items-center rounded-[1.2cqw] border border-white/12 bg-[#151520]">
            <span className="size-[1.2cqw] rounded-full bg-live shadow-[0_0_1.5cqw_rgba(52,211,153,0.8)]" />
          </div>
          <span className="mt-[0.8cqw] block text-center font-mono text-[1.3cqw] tracking-[0.1em] text-white/45">
            {node.label}
          </span>
        </div>
      ))}

      {/* Phone */}
      <div className="absolute top-1/2 left-1/2 aspect-[9/18.5] h-[86%] -translate-x-1/2 -translate-y-[46%] rounded-[3.4cqw] border border-white/15 bg-[#0b0b12] p-[1.1cqw] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-(--ease-out-expo) group-hover:-translate-y-[49%]">
        <div className="flex h-full flex-col overflow-hidden rounded-[2.6cqw] bg-[#13131e] p-[1.6cqw]">
          <div className="mx-auto h-[1.1cqw] w-[30%] rounded-full bg-black/80" />
          <div className="mt-[1.6cqw] flex items-center justify-between">
            <span className="font-mono text-[1.3cqw] tracking-[0.15em] text-white/60 uppercase">{labels.devices}</span>
            <span className="size-[1.2cqw] rounded-full bg-live" />
          </div>

          {/* Map */}
          <div className="relative mt-[1.4cqw] aspect-[4/3] overflow-hidden rounded-[1.4cqw] border border-white/10 bg-[#0f1424]">
            <svg className="absolute inset-0 size-full" viewBox="0 0 120 90" preserveAspectRatio="none">
              <path d="M0 60 C 30 40, 50 75, 80 50 S 120 35, 120 35" stroke="rgba(59,130,246,0.5)" strokeWidth="1" fill="none" />
              <path d="M10 0 L 40 90 M70 0 L 95 90 M0 25 L 120 30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </svg>
            {pins.map((pin) => (
              <span
                key={pin.left + pin.top}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pin.left, top: pin.top }}
              >
                <span className={`absolute inset-0 animate-ping-soft rounded-full ${pin.color}`} />
                <span className={`relative block size-[1.4cqw] rounded-full ring-2 ring-[#0f1424] ${pin.color}`} />
              </span>
            ))}
          </div>

          {/* Device list */}
          <div className="mt-[1.4cqw] flex flex-col gap-[1cqw]">
            {devices.map((device, i) => (
              <div key={i} className="flex items-center gap-[1cqw] rounded-[1cqw] bg-white/[0.04] p-[1cqw]">
                <span className="grid size-[2.6cqw] place-items-center rounded-[0.7cqw] bg-white/[0.06]">
                  <span className={`size-[1cqw] rounded-full ${device.status}`} />
                </span>
                <span className="flex flex-1 flex-col gap-[0.6cqw]">
                  <span className={`h-[0.7cqw] rounded-full bg-white/25 ${device.width}`} />
                  <span className="h-[0.6cqw] w-[40%] rounded-full bg-white/10" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="absolute top-[14%] left-[54%] flex items-center gap-[1cqw] rounded-[1.2cqw] border border-pink/40 bg-[#1a1220]/95 px-[1.6cqw] py-[1cqw] shadow-[0_20px_40px_-20px_rgba(236,72,153,0.6)] transition-transform duration-700 ease-(--ease-out-expo) group-hover:translate-x-[6%]">
        <span className="size-[1.1cqw] rounded-full bg-pink" />
        <span className="font-mono text-[1.4cqw] tracking-[0.12em] text-white/80 uppercase">{labels.alert}</span>
      </div>
    </div>
  );
}
