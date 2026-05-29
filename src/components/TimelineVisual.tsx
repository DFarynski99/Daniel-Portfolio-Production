// Purpose-built graphics for timeline steps that have no representative photo
// (e.g. "Business Outreach Campaign" and "Results to Date"). Self-contained
// dark panels so they read well on both light and dark backgrounds.

type Step = { graphic?: string; image?: string; title: string };

const PANEL =
  'flex h-full min-h-[220px] w-full flex-col justify-between border border-white/10 bg-[#0c0c0f] p-6';

// Reaching 50+ businesses across Australia — a hub-and-spoke network.
function OutreachVisual() {
  const nodes = [
    { x: 55, y: 40, on: true },
    { x: 150, y: 28, on: false },
    { x: 250, y: 42, on: true },
    { x: 345, y: 32, on: false },
    { x: 38, y: 118, on: false },
    { x: 362, y: 118, on: true },
    { x: 60, y: 196, on: true },
    { x: 158, y: 208, on: false },
    { x: 262, y: 196, on: true },
    { x: 345, y: 202, on: false },
  ];
  return (
    <div className={PANEL}>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        // outreach_campaign
      </span>
      <svg viewBox="0 0 400 230" className="my-3 w-full flex-1" preserveAspectRatio="xMidYMid meet">
        {nodes.map((n, i) => (
          <line key={i} x1="200" y1="115" x2={n.x} y2={n.y} stroke="white" strokeOpacity="0.12" strokeWidth="1" />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={`c${i}`}
            cx={n.x}
            cy={n.y}
            r="6"
            fill={n.on ? 'hsl(var(--accent))' : 'transparent'}
            stroke={n.on ? 'none' : 'white'}
            strokeOpacity="0.3"
          />
        ))}
        <circle cx="200" cy="115" r="15" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="200" cy="115" r="5" fill="hsl(var(--accent))" />
      </svg>
      <div className="flex items-baseline gap-2.5">
        <span className="font-display text-4xl leading-none text-accent">50+</span>
        <span className="font-mono text-[10px] uppercase leading-tight tracking-wider text-white/60">
          Australian businesses
          <br />
          contacted &amp; assisted
        </span>
      </div>
    </div>
  );
}

// Documented reduction in incidents + accounts protected — a downward trend.
function ResultsVisual() {
  const pts = '0,28 60,52 120,46 180,86 240,104 300,138 400,162';
  return (
    <div className={PANEL}>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        // incidents_over_time
      </span>
      <svg viewBox="0 0 400 190" className="my-3 w-full flex-1" preserveAspectRatio="none">
        {[45, 95, 145].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeOpacity="0.08" strokeWidth="1" />
        ))}
        <polygon points={`0,190 ${pts} 400,190`} fill="hsl(var(--accent))" fillOpacity="0.15" />
        <polyline points={pts} fill="none" stroke="hsl(var(--accent))" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="flex items-baseline gap-2.5">
        <span className="font-display text-4xl leading-none text-accent">2K+</span>
        <span className="font-mono text-[10px] uppercase leading-tight tracking-wider text-white/60">
          accounts protected,
          <br />
          incidents reduced
        </span>
      </div>
    </div>
  );
}

export default function TimelineVisual({ step }: { step: Step }) {
  if (step.graphic === 'outreach') return <OutreachVisual />;
  if (step.graphic === 'results') return <ResultsVisual />;
  return <img src={step.image} alt={step.title} className="h-full w-full object-cover" />;
}
