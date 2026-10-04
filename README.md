# Muni Kumar Weds Shalini — Wedding Website

A premium, mobile-first Indian wedding invitation & guest information website, built with React, TypeScript, Tailwind CSS and Vite, ready to deploy on Vercel.

## 1. Edit your wedding details

Almost everything lives in **one file**:

```
src/config/weddingConfig.ts
```

Replace the `[placeholder]` values with your real details — names, wedding date, venue, each function's date/time/venue/dress code, love story milestones, family names, hotels, contacts, and your WhatsApp number. Nothing was invented; every real-world detail (dates, venues, phone numbers) is left as an editable placeholder on purpose.

### Adding real photos
Placeholder images are generated automatically (ornamental gold-on-burgundy cards) so the site looks complete before you have photos. To use real photos:
1. Add image files to `public/photos/` (create the folder).
2. In `weddingConfig.ts`, replace calls like `placeholderImage('...')` with a path string, e.g. `'/photos/couple-hero.jpg'`.
3. Do the same for `gallery`, `loveStory[].image`, `venue.photo`, and `video.poster`.

Use JPG/PNG/WebP, ideally compressed (under ~300KB each) for fast mobile loading.

### Wedding video
Set `video.provider` to `'youtube'` or `'vimeo'` and `video.embedId` to the video's ID in `weddingConfig.ts`.

### Background music
Add a licensed audio file to `public/audio/` and set `music.src` in `weddingConfig.ts` (e.g. `'/audio/theme.mp3'`). Music never autoplays loudly on load — it only plays after the guest taps the floating music button, and their choice is remembered for the session.

### Google Maps embed
Set `venue.mapsEmbedUrl` to an embeddable Google Maps URL (Maps → Share → Embed a map → copy the `src` from the iframe code) to show an interactive map in the Venue section.

### WhatsApp number
Set `whatsappNumber` in `weddingConfig.ts` to your coordinator's number, digits only with country code (e.g. `"911234567890"`, no `+` or spaces). This powers both the "RSVP on WhatsApp" and "Chat on WhatsApp" buttons.

## 2. Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL. The countdown, RSVP form, gallery lightbox, calendar buttons and WhatsApp sharing all work locally (RSVP submissions just won't persist to a database until Supabase is connected — see below).

## 3. Connect the RSVP database (optional but recommended)

RSVP submissions are handled by the serverless function `api/rsvp.js`, which stores them in [Supabase](https://supabase.com) (free tier is enough for a wedding).

1. Create a free Supabase project.
2. In the Supabase SQL editor, run:
   ```sql
   create table rsvps (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     full_name text not null,
     phone text not null,
     email text,
     guest_count int default 1,
     guest_names text,
     events text[],
     attendance text not null,
     dietary text,
     message text
   );
   alter table rsvps enable row level security;
   ```
   (No public policies are added — only your server-side service role key, never the browser, can read/write this table.)
3. Copy your Project URL and `service_role` key (Project Settings → API).
4. Add them as environment variables (see step 4 below).

**Without this setup, the RSVP form still works** — guests can submit, they'll see the thank-you message and a WhatsApp confirmation option — the submission is just logged in Vercel's function logs rather than saved to a database, so you can launch first and connect Supabase whenever you're ready.

## 4. Deploy to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. Vercel auto-detects the Vite framework and build settings from `vercel.json`.
3. Before deploying, add environment variables (Project Settings → Environment Variables), if using Supabase:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy. Your site will be live at `https://your-project.vercel.app` (or add a custom domain in Project Settings → Domains).
5. Update `siteUrl` in `weddingConfig.ts` to your final domain so share links and Open Graph previews point to the right place, then redeploy.

Alternatively, from the CLI:
```bash
npm i -g vercel
vercel        # first deploy / preview
vercel --prod # production deploy
```

## 5. Before you share the link — a quick checklist

- [ ] All `[placeholder]` text replaced in `weddingConfig.ts`
- [ ] Real photos added (hero, gallery, love story, venue)
- [ ] `weddingDateISO` set correctly (countdown depends on this)
- [ ] `whatsappNumber` set
- [ ] Supabase connected (or you're comfortable checking Vercel logs for RSVPs)
- [ ] `siteUrl` updated to your live domain
- [ ] Open the site on an actual phone via a WhatsApp-shared link to confirm it looks right
- [ ] Test: countdown, RSVP submit, calendar download, gallery lightbox, WhatsApp share, mobile menu

## Project structure

```
src/
  config/weddingConfig.ts   ← edit this for all content
  components/                all UI sections (self-contained, reusable)
  hooks/                      countdown, scroll-reveal, reduced-motion, scroll-spy
  utils/                      calendar (.ics/Google/Outlook), WhatsApp & social share, placeholder images
  types/                      shared TypeScript types
api/
  rsvp.js                     Vercel serverless function → Supabase
```

## Accessibility & performance

Semantic HTML, labeled form fields, visible focus states, `prefers-reduced-motion` support throughout, lazy-loaded images, and a lightweight dependency footprint (no animation or UI libraries) keep this fast on mobile networks and usable with a keyboard or screen reader.
