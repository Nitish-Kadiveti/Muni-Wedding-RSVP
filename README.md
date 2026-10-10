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
Set `whatsappNumber` in `weddingConfig.ts` to your coordinator's number, digits only with country code (e.g. `"911234567890"`, no `+` or spaces). This powers the "Chat on WhatsApp" button in the Contact section.

## 2. Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL. The countdown, gallery lightbox, calendar buttons and WhatsApp sharing all work locally.

## 3. Deploy to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. Vercel auto-detects the Vite framework and build settings.
3. Deploy. Your site will be live at `https://your-project.vercel.app` (or add a custom domain in Project Settings → Domains).
4. Update `siteUrl` in `weddingConfig.ts` to your final domain so share links and Open Graph previews point to the right place, then redeploy.

Alternatively, from the CLI:
```bash
npm i -g vercel
vercel        # first deploy / preview
vercel --prod # production deploy
```

## 4. Before you share the link — a quick checklist

- [ ] All `[placeholder]` text replaced in `weddingConfig.ts`
- [ ] Real photos added (hero, gallery, love story, venue)
- [ ] `weddingDateISO` set correctly (countdown depends on this)
- [ ] `whatsappNumber` set
- [ ] `siteUrl` updated to your live domain
- [ ] Open the site on an actual phone via a WhatsApp-shared link to confirm it looks right
- [ ] Test: countdown, calendar download, gallery lightbox, WhatsApp share, mobile menu

## Project structure

```
src/
  config/weddingConfig.ts   ← edit this for all content
  components/                all UI sections (self-contained, reusable)
  hooks/                      countdown, scroll-reveal, reduced-motion, scroll-spy
  utils/                      calendar (.ics/Google/Outlook), WhatsApp & social share, placeholder images
  types/                      shared TypeScript types
```

## Accessibility & performance

Semantic HTML, labeled form fields, visible focus states, `prefers-reduced-motion` support throughout, lazy-loaded images, and a lightweight dependency footprint (no animation or UI libraries) keep this fast on mobile networks and usable with a keyboard or screen reader.