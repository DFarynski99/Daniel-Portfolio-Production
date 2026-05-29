import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { caseStudies } from '@/data/portfolio';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto flex min-h-[60vh] max-w-[1400px] flex-col items-center justify-center px-5 text-center">
          <h1 className="font-display text-4xl uppercase tracking-tight">Case study not found</h1>
          <Link to="/#work" className="btn-lime mt-8">
            Back to work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="px-5 pt-28 pb-12 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/#work"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to work
          </Link>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">
            Case Study
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-tight md:text-7xl">
            {study.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
              {study.client}
            </span>
            {study.tags.map((t) => (
              <span
                key={t}
                className="bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA */}
      <section className="px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="aspect-video w-full overflow-hidden border border-foreground/15 bg-secondary">
            {study.video ? (
              <video src={study.video} autoPlay muted loop playsInline className="h-full w-full object-cover" />
            ) : (
              <img src={study.image} alt={study.title} className="h-full w-full object-cover" />
            )}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* overview */}
          <div>
            <div className="mb-8 flex items-center gap-3 border-b border-foreground/15 pb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">
                Overview
              </span>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
              {study.overview.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-foreground' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* outcomes */}
          <div>
            <div className="mb-8 flex items-center gap-3 border-b border-foreground/15 pb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/70">
                Outcomes
              </span>
            </div>
            <div className="border border-foreground/15">
              {study.outcomes.map((o, i) => (
                <div
                  key={o.label}
                  className={`flex items-baseline justify-between gap-4 p-6 ${
                    i > 0 ? 'border-t border-foreground/15' : ''
                  }`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/60">
                    {o.label}
                  </span>
                  <span className="font-display text-3xl uppercase tracking-tight text-foreground">
                    {o.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-foreground/15 bg-foreground px-5 py-20 text-background md:px-10 md:py-24">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6">
          <h2 className="max-w-2xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Facing something similar?
          </h2>
          <Link to="/#contact" className="btn-lime">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default CaseStudyPage;
