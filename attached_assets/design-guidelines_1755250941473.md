# Design Guidelines — IntesarHusain.com (V0)

### Brand voice & tone
- **Playful, bold, and human**
- Mix of personal storytelling and product-minded clarity
- Friendly, high-energy copy that invites curiosity

## Visual Identity
- **Primary Color:** Indigo Blue `#3D5AFE`
- **Accent Color:** Warm Amber `#FFC107`
- **Background:** White `#FFFFFF` & Light Gray `#F8F9FA`
- **Typography:**
  - Headlines: Space Grotesk (bold, large, tight letter spacing)
  - Body: Inter (regular, clear for long reads)
- **Spacing**:
  - Comfortable padding (min 1.25rem)
  - White space to reduce visual fatigue
  - 8pt spacing system for consistency

## Layout Principles
- Mobile-first, responsive grid
- Kanban wall with 3 columns (Ideas / In Progress / Launched)
- Cards have rounded corners (`border-radius: 16px`), soft shadows, and hover animations
- Asymmetric layout allowed for personality and avoid boxiness
- Subtle parallax and scroll reveals

## Component Styles
- **Kanban Cards:**
  - Header: Bold project title
  - Progress bar below title (indigo fill, light gray track)
  - Description snippet
  - Tools tags (rounded pill style)
- **Progress Bars:**
  - 0–33% Amber (early stage)
  - 34–66% Blue (mid stage)
  - 67–100% Green (final stage)

## Interactions & Animations
- Hover: Lift card slightly (`transform: translateY(-4px)`)
- Column scroll: Smooth horizontal scroll on mobile
- Progress bars animate from 0 to actual value on scroll reveal
- On click → slide-out sidebar with markdown-rendered project details
- Maintains card-based layout principles from existing guidelines

#### Resume Download Button
- **Large, clear CTA** positioned near the footer for maximum visibility
- **Trackable click events** for analytics and engagement measurement

### Accessibility must-dos
- Use semantic HTML for all content blocks
- Contrast ratio ≥ 4.5:1 for text
- WCAG AA contrast ratio (check color combos)
- Focus states for links/buttons
- Alt text for all images (especially project visuals)
- Ensure headings follow proper hierarchy (H1 → H2 → H3)
- **Extended to new elements**: Ensure projects board keyboard navigation, form validation feedback, and CTA button focus states

### Content style guide
- **Headings**:
  - Use Title Case for H1, Sentence case for H2–H4
- **Bullets**:
  - Start with verbs or keywords
  - Avoid full sentences unless needed
- **Links**:
  - Use descriptive text ("View my work", not "click here")
- **Tone**:
  - First-person for About/Blog
  - Second-person where inviting interaction ("Let's build something together!")