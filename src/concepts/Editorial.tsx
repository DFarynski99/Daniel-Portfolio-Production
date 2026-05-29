import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TimelineVisual from '@/components/TimelineVisual';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  profile,
  caseStudies,
  projectDark,
  webProjects,
  bugBountyRankings,
  certifications,
  type Ranking,
} from '@/data/portfolio';

const marqueeTags = [
  'Penetration Testing',
  'Application & API Security',
  'Bug Bounty',
  'Secure SDLC',
  'Threat Intelligence',
  'Web Development',
  'Incident Response',
];

function SectionTag({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 border-b border-foreground/15 pb-3">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">
        {n} / {children}
      </span>
    </div>
  );
}

function BugBountyCard({ r }: { r: Ranking }) {
  // Honour-board entries link out to a public board; leaderboard entries
  // (no external link) open their proof screenshot in a lightbox instead.
  const isLeaderboard = !r.link;

  // meta + title + description, shared; image sits BELOW this and above the button
  const body = (
    <>
      <div className="mb-3 flex items-center gap-3">
        <span className="bg-accent px-3 py-1 text-sm font-bold uppercase tracking-wide text-accent-foreground">
          {r.ranking}
        </span>
        <span className="ml-auto font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground/60">
          {r.period}
        </span>
      </div>
      <h4 className="font-display text-2xl uppercase leading-[0.95] tracking-tight">{r.title}</h4>
      <p className="mt-4 text-base leading-relaxed text-foreground/80">{r.description}</p>
    </>
  );

  if (isLeaderboard) {
    return (
      <Dialog>
        <div className="flex basis-full grow-0 flex-col border border-foreground/20 bg-background p-6 md:basis-[calc(50%-0.5rem)] md:p-8">
          {body}
          <DialogTrigger asChild>
            <button
              type="button"
              className="group/img relative mt-6 block aspect-video w-full overflow-hidden border border-foreground/15 bg-white"
            >
              <img src={r.image} alt={`${r.title} leaderboard`} className="h-full w-full object-contain p-1" />
              <span className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/0 font-mono text-xs font-semibold uppercase tracking-wider text-background opacity-0 transition-all duration-200 group-hover/img:bg-foreground/75 group-hover/img:opacity-100">
                <Maximize2 className="h-4 w-4" /> Click to enlarge
              </span>
            </button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <button type="button" className="btn-lime mt-4">
              View leaderboard <Maximize2 className="h-4 w-4" />
            </button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-5xl border-foreground/20 bg-white p-2">
          <DialogTitle className="sr-only">{r.title} leaderboard</DialogTitle>
          <DialogDescription className="sr-only">
            Leaderboard ranking screenshot for {r.title}.
          </DialogDescription>
          <img src={r.image} alt={`${r.title} leaderboard`} className="max-h-[85vh] w-full object-contain" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex basis-full grow-0 flex-col gap-5 border border-foreground/20 bg-background p-6 sm:flex-row sm:items-center md:basis-[calc(50%-0.5rem)] md:p-8">
      <div className="order-2 flex min-w-0 flex-1 flex-col sm:order-1">
        {body}
        <a href={r.link} target="_blank" rel="noopener noreferrer" className="btn-lime mt-6">
          View Honour Board <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <div
        className={`order-1 flex shrink-0 items-center justify-center self-start overflow-hidden border border-foreground/15 bg-white sm:order-2 sm:self-auto ${
          r.square ? 'p-3' : 'p-1.5'
        }`}
      >
        <img
          src={r.image}
          alt={r.title}
          className={
            r.square
              ? 'max-h-20 w-auto max-w-[110px] object-contain md:max-h-[120px] md:max-w-[130px]'
              : 'max-h-14 w-auto max-w-[150px] object-contain md:max-h-[84px] md:max-w-[250px]'
          }
        />
      </div>
    </div>
  );
}

function TimelineCarousel() {
  const [api, setApi] = useState<ReturnType<typeof Object> | null>(null);

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => (api as { scrollNext: () => void }).scrollNext(), 4000);
    return () => clearInterval(id);
  }, [api]);

  return (
    <Carousel setApi={setApi as never} opts={{ align: 'start', loop: true }} className="w-full">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-background/20 pb-3">
        <div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Investigation Timeline
          </span>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-background/60">
            Auto-scrolling preview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CarouselPrevious className="static h-9 w-9 translate-x-0 translate-y-0 rounded-none border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground" />
          <CarouselNext className="static h-9 w-9 translate-x-0 translate-y-0 rounded-none border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground" />
          <Link
            to="/project-dark"
            className="ml-1 inline-flex items-center gap-2 border border-background/40 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-background transition-colors hover:bg-background hover:text-foreground"
          >
            View full timeline <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <CarouselContent className="-ml-4">
        {projectDark.timeline.map((t, i) => (
          <CarouselItem key={i} className="pl-4 sm:basis-1/2 lg:basis-1/3">
            <div className="flex h-full flex-col border border-background/20 bg-background/[0.04]">
              <div className="aspect-[16/10] overflow-hidden">
                <TimelineVisual step={t} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {String(i + 1).padStart(2, '0')} · {t.date}
                </span>
                <h4 className="mt-3 font-display text-xl uppercase leading-tight tracking-tight">
                  {t.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-background/70">{t.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

const Editorial = () => {
  // When arriving from another route via /#section, scroll to that section
  // once this page has mounted (the target ids don't exist until React renders).
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash;
      requestAnimationFrame(() => {
        document.querySelector(id)?.scrollIntoView();
      });
    }
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-8 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70 fade-up">
            {profile.role} · {profile.location}
          </p>
          <h1 className="font-display text-[clamp(2.75rem,9vw,8.5rem)] uppercase leading-[0.92] tracking-tight fade-up">
            I secure{' '}
            <span className="font-serif lowercase italic tracking-normal text-foreground/55">
              and
            </span>{' '}
            build the{' '}
            <span className="marker-hl">software</span>
            <br />
            businesses run on.
          </h1>

          <p className="mt-8 max-w-2xl font-display text-2xl uppercase leading-tight tracking-tight text-foreground/25 md:text-4xl">
            Trusted by 50+ Australian businesses.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-foreground/15 pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-base leading-relaxed text-foreground/70">
              {profile.tagline} Cybersecurity consultant by profession, software engineer by craft.
              I help organisations strengthen their security posture and ship secure, modern web
              applications.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="btn-lime">
                View work <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-outline">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-foreground bg-foreground py-3 text-background">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...marqueeTags, ...marqueeTags, ...marqueeTags].map((t, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-[0.2em]">
              {t} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SELECTED WORK */}
      <section id="work" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <SectionTag n="01">Selected Work</SectionTag>
          <h2 className="mb-12 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Real-world security work with real consequences.
          </h2>
          <div className="grid grid-cols-1 gap-px border border-foreground/15 bg-foreground/15 md:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Link
                key={study.title}
                to={study.link}
                className="group flex flex-col bg-background p-6 transition-colors hover:bg-secondary md:p-8"
              >
                <div className="mb-6 aspect-[16/10] overflow-hidden bg-secondary">
                  {study.video ? (
                    <video
                      src={study.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                {/* readable, colourful meta row */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm font-semibold tracking-tight text-foreground/50">
                    0{i + 1}
                  </span>
                  <span className="bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
                    {study.client}
                  </span>
                </div>
                <h3 className="mb-3 flex items-center justify-between gap-2 font-display text-2xl uppercase leading-tight tracking-tight">
                  {study.title}
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </h3>
                <p className="mb-5 text-[15px] leading-relaxed text-foreground/70">{study.summary}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {study.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-foreground/15 bg-secondary/40 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <SectionTag n="02">About</SectionTag>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
            <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
              {profile.name}
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/70">
              {profile.about.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-foreground' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT DARK */}
      <section id="project-dark" className="border-t border-foreground/15 bg-foreground px-5 py-20 text-background md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex items-center gap-3 border-b border-background/20 pb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-background/70">
              03 / Flagship Initiative
            </span>
          </div>
          <h2 className="max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-tight md:text-8xl">
            Project <span className="marker-hl text-accent-foreground">Dark</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/70">
            {projectDark.subtitle}
          </p>

          {/* results */}
          <div className="mt-14 grid grid-cols-1 gap-px border border-background/20 bg-background/20 sm:grid-cols-3">
            {projectDark.results.map((r) => (
              <div key={r.label} className="bg-foreground p-8">
                <div className="font-display text-6xl tabular-nums text-accent">{r.value}</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-background/60">
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          {/* two clickable cards (identical structure): investigation page + published article */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Investigation -> full timeline page */}
            <Link to="/project-dark" className="group flex flex-col border border-background/25 transition-colors hover:border-accent">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={projectDark.image}
                  alt="Project Dark investigation"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  The Investigation
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight tracking-tight">
                  Inside Project Dark
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-background/50">
                  Cyber Threat Intelligence
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-background/75">
                  {projectDark.blurb}
                </p>
                <span className="btn-lime mt-6">
                  View the timeline <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {/* Published Article -> external */}
            <a
              href={projectDark.article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-background/25 transition-colors hover:border-accent"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={projectDark.article.image}
                  alt={projectDark.article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Published Article
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight tracking-tight">
                  {projectDark.article.title}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-background/50">
                  {projectDark.article.publisher}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-background/75">
                  {projectDark.article.description}
                </p>
                <span className="btn-lime mt-6">
                  Read the article <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>

          {/* timeline carousel (auto-scrolling) */}
          <div className="mt-16">
            <TimelineCarousel />
          </div>
        </div>
      </section>

      {/* WEB DEVELOPMENT */}
      <section id="web" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <SectionTag n="04">Web Development</SectionTag>
          <h2 className="mb-12 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Modern web apps, built for real businesses.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {webProjects.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex basis-full grow-0 flex-col border border-foreground/15 bg-background p-6 transition-colors hover:bg-secondary sm:basis-[calc(50%-0.5rem)] md:p-8"
              >
                <div className="mb-5 aspect-video overflow-hidden border border-foreground/10 bg-secondary">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl uppercase tracking-tight">{p.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <p className="mb-5 text-[15px] leading-relaxed text-foreground/70">{p.description}</p>
                <div className="mt-auto">
                  <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                    Built with
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <span
                        key={t}
                        className="bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="border-t border-foreground/15 bg-secondary/40 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <SectionTag n="05">Credentials & Honours</SectionTag>
          <h2 className="mb-14 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Industry-recognised expertise.
          </h2>

          {/* Certifications */}
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Certifications
          </h3>
          <div className="mb-20 grid grid-cols-2 gap-px border border-foreground/15 bg-foreground/15 sm:grid-cols-3 lg:grid-cols-6">
            {certifications.map((c) => (
              <div key={c.name} className="flex flex-col items-center bg-background p-6 text-center">
                <img src={c.logo} alt={c.name} className="mb-4 h-20 w-auto object-contain" />
                <div className="font-mono text-sm font-semibold uppercase tracking-wider">{c.name}</div>
                <div className="mt-2 text-xs leading-snug text-foreground/65">{c.description}</div>
              </div>
            ))}
          </div>

          {/* Bug Bounty & VDP */}
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Bug Bounty & Vulnerability Disclosure
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {bugBountyRankings.map((r) => (
              <BugBountyCard key={r.title} r={r} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-foreground/15 bg-foreground px-5 py-20 text-background md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-background/70">
            06 / Contact
          </span>
          <h2 className="mt-6 max-w-4xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-8xl">
            Let's secure <span className="marker-hl text-accent-foreground">what you build.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-background/20 pt-10 sm:grid-cols-3">
            <a href={`mailto:${profile.email}`} className="group">
              <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-background/50">Email</div>
              <div className="mt-1 text-lg group-hover:text-accent">{profile.email}</div>
            </a>
            <a href={`tel:${profile.phone}`} className="group">
              <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-background/50">Phone</div>
              <div className="mt-1 text-lg group-hover:text-accent">{profile.phone}</div>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group">
              <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-background/50">LinkedIn</div>
              <div className="mt-1 text-lg group-hover:text-accent">Connect →</div>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Editorial;
