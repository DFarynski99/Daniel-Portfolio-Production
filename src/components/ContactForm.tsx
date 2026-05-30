import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';

// Endpoint is same-origin by default (Cloudflare Worker on /api/contact).
// Override for local testing via VITE_CONTACT_ENDPOINT (e.g. wrangler dev URL).
const ENDPOINT = (import.meta as any).env?.VITE_CONTACT_ENDPOINT || '/api/contact';

// Cloudflare Turnstile site key (public). When unset, the widget is skipped
// so the form still works locally before Turnstile is configured.
const TURNSTILE_SITE_KEY = (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY || '';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Please enter a valid email'),
  message: z.string().trim().min(10, 'Please add a few more details (10+ characters)'),
  // honeypot — real users never fill this; bots often do
  company: z.string().max(0).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onBlur' });

  // Turnstile widget — render once the script is ready, track its token.
  const turnstileEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || widgetId.current || !window.turnstile || !turnstileEl.current) return;
      widgetId.current = window.turnstile.render(turnstileEl.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };
    if (window.turnstile) {
      render();
    } else {
      const poll = setInterval(() => {
        if (window.turnstile) {
          render();
          clearInterval(poll);
        }
      }, 200);
      return () => {
        cancelled = true;
        clearInterval(poll);
      };
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (values: FormValues) => {
    if (TURNSTILE_SITE_KEY && !token) {
      toast.error('Please complete the verification below.');
      return;
    }
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      toast.success("Message sent — I'll be in touch soon.");
      reset();
      setToken('');
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    } catch (err) {
      toast.error('Something went wrong. Please email me directly instead.');
    }
  };

  const labelCls = 'mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-background/60';
  const fieldCls =
    'w-full border border-background/25 bg-background/[0.05] px-4 py-3 text-background placeholder:text-background/35 transition-colors focus:border-accent focus:outline-none';
  const errCls = 'mt-1.5 font-mono text-[11px] uppercase tracking-wider text-red-400';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* honeypot (visually hidden, off-screen) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('company')}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name</label>
          <input id="cf-name" type="text" placeholder="Your name" className={fieldCls} {...register('name')} />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>Email</label>
          <input id="cf-email" type="email" inputMode="email" placeholder="you@company.com" className={fieldCls} {...register('email')} />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea id="cf-message" rows={5} placeholder="How can I help?" className={`${fieldCls} resize-y`} {...register('message')} />
        {errors.message && <p className={errCls}>{errors.message.message}</p>}
      </div>

      {TURNSTILE_SITE_KEY && <div ref={turnstileEl} className="min-h-[65px]" />}

      <button type="submit" disabled={isSubmitting} className="btn-lime w-full disabled:opacity-60 sm:w-auto">
        {isSubmitting ? (
          <>
            Sending <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Send message <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
