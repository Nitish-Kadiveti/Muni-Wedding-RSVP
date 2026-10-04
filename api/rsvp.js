// Vercel Serverless Function: POST /api/rsvp
//
// Stores RSVP submissions in Supabase when environment variables are configured.
// Falls back to logging (visible in Vercel's function logs) if Supabase isn't set up yet,
// so the form still works end-to-end for testing before a database is connected.
//
// Required environment variables (set in Vercel Project Settings -> Environment Variables):
//   SUPABASE_URL              - your Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (server-side only, never exposed to the client)
//
// Expected Supabase table (create via the SQL editor):
//
//   create table rsvps (
//     id uuid primary key default gen_random_uuid(),
//     created_at timestamptz default now(),
//     full_name text not null,
//     phone text not null,
//     email text,
//     guest_count int default 1,
//     guest_names text,
//     events text[],
//     attendance text not null,
//     dietary text,
//     message text
//   );
//
//   alter table rsvps enable row level security;
//   -- Only the service role (used by this server function) can read/write;
//   -- no public policies are created, so the anon key cannot access this table.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const payload = req.body || {}
  const { fullName, phone, email, guestCount, guestNames, events, attendance, dietary, message } = payload

  // Server-side validation (never trust the client alone)
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return res.status(400).json({ error: 'Full name is required.' })
  }
  if (!phone || typeof phone !== 'string' || !/^[0-9+\-\s()]{7,}$/.test(phone)) {
    return res.status(400).json({ error: 'A valid phone number is required.' })
  }
  if (attendance !== 'accepting' && attendance !== 'declining') {
    return res.status(400).json({ error: 'Attendance status is required.' })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email address is invalid.' })
  }

  const sanitized = {
    full_name: String(fullName).trim().slice(0, 200),
    phone: String(phone).trim().slice(0, 40),
    email: email ? String(email).trim().slice(0, 200) : null,
    guest_count: Math.min(Math.max(parseInt(guestCount, 10) || 1, 1), 20),
    guest_names: guestNames ? String(guestNames).trim().slice(0, 500) : null,
    events: Array.isArray(events) ? events.slice(0, 10).map(String) : [],
    attendance: attendance === 'accepting' ? 'accepting' : 'declining',
    dietary: dietary ? String(dietary).trim().slice(0, 300) : null,
    message: message ? String(message).trim().slice(0, 1000) : null,
  }

  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    // No database configured yet — accept the submission so the UI flow can be tested,
    // and log it so it isn't silently lost during development.
    console.warn('[rsvp] Supabase not configured; RSVP received but not persisted:', sanitized)
    return res.status(200).json({ ok: true, persisted: false })
  }

  try {
    // Basic duplicate check: same name + phone within the last 5 minutes.
    const checkUrl = `${SUPABASE_URL}/rest/v1/rsvps?full_name=eq.${encodeURIComponent(
      sanitized.full_name
    )}&phone=eq.${encodeURIComponent(sanitized.phone)}&select=id,created_at&order=created_at.desc&limit=1`

    const checkRes = await fetch(checkUrl, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    })
    if (checkRes.ok) {
      const existing = await checkRes.json()
      if (existing?.[0]?.created_at) {
        const secondsAgo = (Date.now() - new Date(existing[0].created_at).getTime()) / 1000
        if (secondsAgo < 300) {
          return res.status(409).json({ error: 'A matching RSVP was just submitted. Please wait a few minutes before resubmitting.' })
        }
      }
    }

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/rsvps`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(sanitized),
    })

    if (!insertRes.ok) {
      const text = await insertRes.text()
      console.error('[rsvp] Supabase insert failed:', text)
      return res.status(502).json({ error: 'Could not save RSVP. Please try again shortly.' })
    }

    return res.status(200).json({ ok: true, persisted: true })
  } catch (err) {
    console.error('[rsvp] Unexpected error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}
