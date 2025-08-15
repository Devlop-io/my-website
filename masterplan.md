# Masterplan — IntesarHusain.com Portfolio & Playground (V0)

## Project Goal
Build a personal portfolio site that:
- Helps startup recruiters, collaborators, and freelance clients quickly understand my story as a builder, product thinker, and creative leader.
- Uses a **non-traditional portfolio display** via an interactive Kanban wall to show my projects as an evolving journey.
- Feels **playful, bold, and human** while being fully functional on mobile and desktop.
- Offers a downloadable resume.
- V0 is story-first, fun, and human — V1 can expand into full About, Blog, Services, etc.

## Target Audience
- Startup recruiters & hiring managers
- Indie hackers, founders, entrepreneurs, product builders, and tech collaborators
- Potential freelance clients seeking CRM + marketing automation expertise

## Scope (V0)
**In-scope:**
- Homepage with the following sections
    - **Hero**: animated headline & intro
    - **Bio teaser**: short personal + professional snapshot
    - **Timeline**: career highlights (scrollable)
    - **Projects Kanban**: Interactive **Kanban wall** for portfolio display with columns: Ideas / In Progress / Launched, sticky notes open sidebar with details
    - Progress bars on each Kanban card to show “journey” status
    - **Lights Me Up**: passions, strengths grid
    - **Testimonials**:  2–3 peer or manager quotes
    - **CTA**: Contact form + optional Calendly
    - **Resume Download**: tracked clicks
    - **Footer**: minimal nav + socials

- **Resume Download**: tracked clicks
- Responsive layout (mobile-first)

**Out-of-scope (V0):**
- 3D experimental playground (will live on a subdomain later)
- Blog functionality
- CMS Admin: Sanity-powered backend to manage posts, projects, services
- AI bot integration

### Content Management:
- All copy in /content/*.md files for easy updates and AI builder compatibility

## Success Criteria
- Site loads in <2 seconds on desktop & mobile
- Visitors can understand my work within 30 seconds
- Kanban wall is functional & visually engaging
- Contact form works without errors

### High-level tech stack
- **Astro** – lightweight, fast, and ideal for content-rich static sites
- **TypeScript + Tailwind CSS** – developer-friendly, consistent styling
- **Framer Motion** – for scroll effects, fades, and playful animations
- **Sanity.io** – intuitive CMS for managing content without code
- **Netlify** – simple, free, CI/CD-enabled deployment

### UI design principles
- Follow **Steve Krug’s usability laws**: no mystery meat, scannable layout
- Bold typography, asymmetry, white space = energy + clarity
- Mobile-first, card-based layout with micro-interactions
- Parallax + scroll reveals to keep visual interest high

## Timeline
- **Week 1:** Finalize copy & design guidelines
- **Week 2–3:** Development & integration
- **Week 4:** Testing, polish, and launch

## Risks & Dependencies
- Kanban wall interactivity may require custom animation work
- Mobile layout must remain usable with horizontally scrollable columns
- Content delivery must be in editable `.md` files
- **Too much content upfront** → Start lean; add blog/posts gradually
- **Performance lags from animations** → Use Framer Motion sparingly, test on mobile
- **Scope creep on CMS** → Limit fields per content type; write strict schema early
