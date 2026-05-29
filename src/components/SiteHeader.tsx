import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/portfolio';

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-foreground/15 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <a href="/" className="group flex items-center gap-2.5">
          <span className="h-9 w-px bg-foreground/40 transition-colors group-hover:bg-accent" />
          <span className="font-display text-base uppercase leading-[0.82] tracking-tight text-foreground">
            Daniel
            <br />
            Farynski
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((i) => (
            <a
              key={i.name}
              href={i.href}
              className="text-[13px] font-semibold text-foreground/80 transition-colors hover:text-foreground"
            >
              {i.name}
            </a>
          ))}
        </nav>
        <a
          href="/#contact"
          className="hidden border border-foreground px-4 py-2 text-[12px] font-semibold transition-colors hover:bg-foreground hover:text-background md:inline-block"
        >
          Discuss a project
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-foreground/15 px-5 py-4 md:hidden">
          {navItems.map((i) => (
            <a
              key={i.name}
              href={i.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-semibold text-foreground/85"
            >
              {i.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
