/**
 * Cloudflare Worker — contact form handler for danielfarynski.com
 * Receives POST /api/contact, validates, and sends an email via Resend.
 *
 * Secrets / vars (set with wrangler — NEVER commit the key):
 *   RESEND_API_KEY  (secret)  →  wrangler secret put RESEND_API_KEY
 *   CONTACT_TO      (var)     →  recipient (your inbox)
 *   CONTACT_FROM    (var)     →  verified Resend sender, e.g. "Portfolio <contact@danielfarynski.com>"
 */

const ALLOWED_ORIGINS = [
  'https://danielfarynski.com',
  'https://www.danielfarynski.com',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(body, status, request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
  });
}

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, request);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: 'Invalid request body' }, 400, request);
    }

    const name = (data?.name || '').toString().trim();
    const email = (data?.email || '').toString().trim();
    const message = (data?.message || '').toString().trim();
    const honeypot = (data?.company || '').toString().trim();

    // Silently accept bot submissions (honeypot filled) without sending.
    if (honeypot) return json({ ok: true }, 200, request);

    const fields = [];
    if (name.length < 2) fields.push('name');
    if (!emailRe.test(email)) fields.push('email');
    if (message.length < 10) fields.push('message');
    if (fields.length) return json({ error: 'Validation failed', fields }, 422, request);

    if (!env.RESEND_API_KEY) {
      return json({ error: 'Email service not configured' }, 500, request);
    }

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM || 'Portfolio <contact@danielfarynski.com>',
        to: [env.CONTACT_TO || 'me@danielfarynski.com'],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <h2>New portfolio enquiry</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${esc(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '');
      console.error('Resend error', resp.status, detail);
      return json({ error: 'Failed to send message', _debug: { status: resp.status, detail } }, 502, request);
    }

    return json({ ok: true }, 200, request);
  },
};
