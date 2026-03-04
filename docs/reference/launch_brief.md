# TourOps Core — Launch Plan & Technical Brief

---

## The Architecture

| Layer | Tool | Job |
|---|---|---|
| Frontend (page) | Vercel | Serves the landing page — fast, pixel-perfect, on-brand |
| Backend (everything else) | GoHighLevel | CRM, pipeline, automations, tracking, forms, stats |
| Domain DNS | Your registrar → Vercel | Points your domain to the Vercel-hosted page |
| Tracking | GHL script in Vercel `<head>` | GHL sees every page view and conversion |

**The rule:** Vercel is the window. GHL is everything behind the counter.

---

## What GHL Tracks (Everything You Need)

- ✓ Page views and traffic sources
- ✓ Form submissions (applications)
- ✓ Contact creation in CRM
- ✓ Pipeline stage movement
- ✓ Automation triggers
- ✓ Funnel conversion rate
- ✓ Revenue and deal tracking
- ✓ Ad attribution (Facebook, Google)

Nothing is lost by hosting on Vercel. GHL's tracking script in the page `<head>` handles all of it.

---

## Phase 1 — Pre-Launch Checklist

### Assets to Gather Before Building
- [ ] Founder photo — on location, operational, real (phone photo is fine)
- [ ] 5 product screenshots from GHL (see list below)
- [ ] Demo phone number (your TourOps Voice AI agent number)
- [ ] Your domain name confirmed
- [ ] Overage policy — what happens when a client exceeds 300 voice minutes or 500 SMS?

### GHL Screenshots Needed
1. AI mid-conversation text thread (conversations view)
2. Unified inbox showing multiple channel threads
3. Follow-up automation workflow
4. Calendar with AI-booked consultations
5. Daily proof / reporting summary

### GHL Backend to Build Before Launch
- [ ] Application form (name, business, tour type, monthly inquiry volume)
- [ ] Pipeline: Founding Operator stages (Applied → Qualified → Onboarding → Live)
- [ ] Automation: Application received → notify you + confirm to applicant
- [ ] Voice AI agent configured and tested on demo number
- [ ] Overage billing policy decided and documented

---

## Phase 2 — Page Deployment

### Step 1: Prep the HTML
- Add your demo phone number (2 locations in the HTML)
- Add your founder photo
- Replace placeholder screenshots with real GHL screenshots
- Add GHL tracking script to `<head>`
- Point all Apply CTAs to your GHL form URL
- Add meta title, description, and og:image for social sharing
- Answer the FAQ overage question

### Step 2: Deploy to Vercel
1. Go to vercel.com — create free account
2. Create New Project → Deploy from a folder
3. Upload your HTML file (rename to `index.html`)
4. Vercel gives you a live URL instantly (e.g. `tourops.vercel.app`)
5. Test everything — forms, demo call button, calculator, FAQ

### Step 3: Connect Your Domain
1. In Vercel: Settings → Domains → Add your domain
2. Vercel gives you a CNAME or A record
3. Go to your domain registrar (GoDaddy, Namecheap, etc.)
4. Update DNS records to point to Vercel
5. SSL certificate is automatic — Vercel handles it
6. Live in 10–30 minutes

### Step 4: Connect GHL Tracking
1. In GHL: Settings → Tracking Code → copy your script
2. Paste into `<head>` section of your HTML (clearly marked placeholder)
3. Redeploy on Vercel (drag and drop the updated file)
4. Verify in GHL that page views are recording

### Step 5: Test the Full Funnel
- [ ] Visit the live page — does it look right on mobile and desktop?
- [ ] Click "Hear It Answer a Call" — does the demo number work?
- [ ] Submit a test application — does it appear in GHL?
- [ ] Does the pipeline stage trigger?
- [ ] Does the confirmation automation fire?
- [ ] Does GHL show the page view in funnel stats?

---

## Phase 3 — Launch

### Soft Launch (Day 1)
- Share with 3–5 people you trust for feedback
- Confirm GHL tracking is recording correctly
- Fix any issues before driving traffic

### Traffic Sources (Week 1–2)
- Facebook Groups: tour operator communities, adventure tourism groups
- Direct outreach: operators you already know
- Your own network

### Message to Use in Facebook Groups
> "Built this after losing $47,000 in missed bookings. If you're a tour operator tired of missing inquiries while you're on tour — I'm personally installing this for a small group of founding operators. [link]"

---

## Phase 4 — Optimization (After First 5 Applications)

### Metrics to Watch in GHL
| Metric | Target |
|---|---|
| Page → Application rate | >3% |
| Demo call button clicks | Track weekly |
| Application → Onboarding | >60% |
| Time to first application | <7 days post-launch |

### When to Consider A/B Testing
Only after you have at least 500 page visits. Before that, you don't have enough data to test meaningfully. When you do:
- Test the hero headline first
- Then test the CTA button copy
- Then test the demo section placement

---

## The HTML — Current Status

The production HTML is complete and includes:
- ✓ Full page copy (all sections)
- ✓ Interactive calculator (sliders)
- ✓ Logo scroll bar (auto-scrolling, 12 platforms)
- ✓ 5 HTML mockups (GHL-styled, brand blue)
- ✓ FAQ accordion
- ✓ Responsive mobile layout
- ✓ Brand design system (Inter, #4F46E5, Apple/Stripe aesthetic)

**Still needs before deploy:**
- Demo phone number
- Founder photo
- Real GHL screenshots (or keep mockups for launch)
- GHL tracking script
- GHL form URL for Apply buttons
- Domain
- Meta tags
- Overage FAQ answer

---

## Technical Stack Summary

```
tourops.com (or .co / .io)
    │
    ├── DNS → Vercel (CNAME)
    │         └── index.html (your landing page)
    │               └── GHL tracking script in <head>
    │               └── Apply buttons → GHL form URL
    │
    └── GHL Backend
          ├── Application form
          ├── CRM + Pipeline
          ├── Automations
          ├── Voice AI (demo number)
          ├── Conversations inbox
          └── Funnel stats + reporting
```

---

## Open Items Before Launch

| Item | Owner | Status |
|---|---|---|
| Domain confirmed | You | ⬜ |
| Demo phone number live | You | ⬜ |
| Overage policy decided | You | ⬜ |
| Founder photo taken | You | ⬜ |
| GHL screenshots captured | You | ⬜ |
| GHL application form built | You | ⬜ |
| GHL pipeline configured | You | ⬜ |
| HTML deployed to Vercel | You | ⬜ |
| Tracking verified | You | ⬜ |
| Soft launch feedback | You | ⬜ |
