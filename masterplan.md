## IntesarHusain.com — Portfolio
### Goal
Launch a V0 portfolio landing page that captures Intesar Husain’s story, showcases projects in an interactive Kanban board, enables lead capture via CRM integration, and offers a downloadable resume.
V0 is story-first, fun, and human — V1 can expand into full About, Blog, Services, etc.
### 30-second elevator pitch
A bold, story-first personal site that showcases Intesar Husain’s journey as a creative builder, product thinker, and startup collaborator. Designed to be as playful and multidimensional as he is.

### Problem & mission
Most personal sites feel sterile or resume-like. IntesarHusain.com aims to bring humanity and creativity front-and-center—making it effortless for startup teams, recruiters, and collaborators to *feel* who he is.

### Target audience
- Startup recruiters and hiring managers
- Fellow indie hackers and builders
- Freelance clients (CRM + marketing automation help)

### Core Sections
- **Homepage**: Animated hero, visual milestone timeline, testimonials snippet
- **About**: Personal story, strengths, photos, and personality highlights
- **Prjoects**: Tagged case studies with reflections and results
- **Blog**: Startup insights, product lessons, learning journeys
- **Freelance**: Services menu + inquiry form (phase two)
- **Contact**: Friendly CTA, form, social links, Calendly embed
- **CMS Admin**: Sanity-powered backend to manage posts, projects, services

### V0 Features (Extension of homepage from core features)
- **Hero**: animated headline & intro
- **Bio teaser**: short personal + professional snapshot
- **Timeline**: career highlights (scrollable)
- **Projects Kanban**: columns: Launched / In Progress / Ideas, sticky notes open sidebar with details
- **Lights Me Up**: passions, strengths grid
- **Testimonials**:  2–3 peer or manager quotes
- **CTA**: Contact form + optional Calendly
- **Resume Download**: tracked clicks
- **Footer**: minimal nav + socials

### Content Management:
- All copy in /content/*.md files for easy updates and AI builder compatibility

### Integrations:
- CRM (HubSpot) for form submissions
- Analytics for resume downloads + form conversions

### High-level tech stack
- **Astro** – lightweight, fast, and ideal for content-rich static sites
- **TypeScript + Tailwind CSS** – developer-friendly, consistent styling
- **Framer Motion** – for scroll effects, fades, and playful animations
- **Sanity.io** – intuitive CMS for managing content without code
- **Netlify/Vercel** – simple, free, CI/CD-enabled deployment

### Conceptual data model
- **User (admin-only)**
- **Project**: title, tags, summary, tools, outcome, reflections, images
- **Blog Post**: title, category, body, summary, created date
- **Service Offering**: title, description, category, portfolio links
- **Testimonial**: quote, author, role, associated project

### UI design principles
- Follow **Steve Krug’s usability laws**: no mystery meat, scannable layout
- Bold typography, asymmetry, white space = energy + clarity
- Mobile-first, card-based layout with micro-interactions
- Parallax + scroll reveals to keep visual interest high

### Security & compliance notes
- No auth required unless admin panel is private
- Sanity manages content access securely via API tokens
- Embed forms use secure providers (e.g., Tally, Typeform, or custom Netlify forms)

### Phased roadmap
**MVP (Now)**
- Homepage, About, Projects, Contact
- Blog (basic), CMS integration, deploy live

**V1**
- Full Blog functionality with categories, SEO, summaries
- Freelance services page with case snippets
- Testimonials with dynamic filtering

**V2**
- Ask-Me-Anything AI bot
- Smart search (e.g., “Projects using HubSpot”)
- AI-generated summaries for blog/projects

### Risks & mitigations
- **Too much content upfront** → Start lean; add blog/posts gradually
- **Performance lags from animations** → Use Framer Motion sparingly, test on mobile
- **Scope creep on CMS** → Limit fields per content type; write strict schema early

### Future expansion ideas
- Interactive playgrounds (e.g., micro-tools or live demos)
- Community Q&A or notes-style posts
- Podcast or video integration
- Newsletter with lead capture

