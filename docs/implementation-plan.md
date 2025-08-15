# Implementation Plan — IntesarHusain.com (V0)

## Tech Stack
- Frontend: Astro + React, TailwindCSS, Framer Motion
- Content: Markdown `.md` files + Sanity (CMS Integration)
- Deployment: Netlify

### Step-by-step build sequence

**MVP Build**
1. **Setup**
   - Create Astro project
   - Configure TailwindCSS, Typescript & Framer Motion

2. **Content Integration**
   - Place `.md` files in `/src/content`
   - Build dynamic KanbanWall component to parse project `.md` files

3. **Components**
   - Hero, Highlights, Testimonials, KanbanWall, ContactForm

4. **Kanban Wall Logic**
   - Read projects from `/content/projects`
   - Group by status
   - Render progress bars based on `progress` field

5. **Responsive Layout**
   - Desktop: Full column view
   - Mobile: Horizontal scrollable columns

6. **Testing**
   - Mobile & desktop viewport QA
   - Check progress bar animations
   - Form submission testing

7. **Launch**
   - Deploy to Netlify
   - Connect domain intesarhusain.com

**V1 Build**
8. Add Freelance Services page
9. Configure Sanity.io project + schemas for Project, Blog, etc.
10. Connect CMS to frontend (Sanity → Astro)
11. Add categorized blog + featured snippets

12. Improve SEO and meta tags

**V2 Build**
13. Integrate AI-generated summaries (blog + projects)
14. Build Ask-Me-Anything AI bot (e.g., GPT + search index)
15. Add smart search UI
