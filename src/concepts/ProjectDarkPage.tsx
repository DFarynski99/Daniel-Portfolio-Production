import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TimelineVisual from '@/components/TimelineVisual';
import { projectDark } from '@/data/portfolio';

const ProjectDarkPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO BAND */}
      <section className="border-b border-foreground/15 bg-foreground px-5 pt-28 pb-16 text-background md:px-10 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/#project-dark"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-background/60 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to overview
          </Link>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Flagship Initiative
          </span>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-9xl">
            Project <span className="marker-hl text-accent-foreground">Dark</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/70">
            {projectDark.subtitle}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-px border border-background/20 bg-background/20 sm:grid-cols-3">
            {projectDark.results.map((r) => (
              <div key={r.label} className="bg-foreground p-8">
                <div className="font-display text-6xl tabular-nums text-accent">{r.value}</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-background/60">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex items-center gap-3 border-b border-foreground/15 pb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">
              Project Context
            </span>
          </div>
          <p className="max-w-4xl text-xl leading-relaxed text-foreground/80">{projectDark.context}</p>
        </div>
      </section>

      {/* FULL TIMELINE */}
      <section className="border-t border-foreground/15 bg-secondary/40 px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-center gap-3 border-b border-foreground/15 pb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">
              Investigation Timeline
            </span>
          </div>

          <div className="space-y-px border border-foreground/15 bg-foreground/15">
            {projectDark.timeline.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-1 items-stretch gap-px bg-foreground/15 md:grid-cols-2"
              >
                <div className={`min-h-[260px] overflow-hidden bg-background ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <TimelineVisual step={t} />
                </div>
                <div className={`flex flex-col justify-center bg-background p-8 md:p-12 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">
                      {t.date}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl uppercase leading-[0.95] tracking-tight md:text-4xl">
                    {t.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/75">
                    {t.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE CTA */}
      <section className="border-t border-foreground/15 bg-foreground px-5 py-20 text-background md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div className="aspect-[16/9] overflow-hidden border border-background/25">
            <img src={projectDark.article.image} alt={projectDark.article.title} className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Published Article · {projectDark.article.publisher}
            </span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-5xl">
              {projectDark.article.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-background/75">
              {projectDark.article.description}
            </p>
            <a href={projectDark.article.link} target="_blank" rel="noopener noreferrer" className="btn-lime mt-7">
              Read the article <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ProjectDarkPage;
