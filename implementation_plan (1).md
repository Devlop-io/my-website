## Implementation Plan — IntesarHusain.com

### Step-by-step build sequence

**MVP Build**
1. Set up Astro project + Tailwind + TypeScript
2. Configure Sanity.io project + schemas for Project, Blog, etc.
3. Build homepage:
   - Animated hero (Framer Motion)
   - Bio snippet
   - Timeline/carousel
   - Testimonials section
4. Build About page:
   - Story content blocks
   - Strengths, images, highlights
5. Build Portfolio page:
   - List view with filters/tags
   - Case study layout template
6. Build Blog page:
   - Basic list of posts
   - Blog post layout
7. Build Contact page:
   - Form (Netlify or Tally)
   - Social + Calendly embed
8. Connect CMS to frontend (Sanity → Astro)
9. Deploy via Netlify or Vercel with CI/CD

**V1 Build**
10. Add Freelance Services page
11. Add categorized blog + featured snippets
12. Add Testimonials CMS management + filters
13. Improve SEO and meta tags

**V2 Build**
14. Integrate AI-generated summaries (blog + projects)
15. Build Ask-Me-Anything AI bot (e.g., GPT + search index)
16. Add smart search UI

### Timeline with checkpoints
- **Week 1**: Project + CMS setup, Homepage + About done
- **Week 2**: Portfolio + Contact pages live; deploy MVP
- **Week 3–4**: Blog setup, CMS tuning, polish + mobile QA
- **Week 5–6**: Services, SEO, testimonials filtering (V1)
- **Future**: AI and smart search (V2)

### Team roles & rituals
- **You (Intesar)**: Content, tone, media assets
- **Dev (freelancer or yourself)**:
   - Frontend build
   - CMS connection
   - Deploy + maintain
- **Weekly check-in**: 30 min on Mondays
- **Bi-weekly usability test**: 3 users, 30 min each, feedback doc

### Optional integrations & stretch goals
- Calendly embed for bookings
- AI content helper for writing posts
- Tally or Typeform for more robust forms
- Integrate analytics (Plausible or PostHog)

