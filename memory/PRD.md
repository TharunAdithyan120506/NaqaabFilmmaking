# Naqaab Filmmaking Club — Cinematic Website PRD

## Original Problem Statement
Build a full-featured, cinematic single-page website for Naqaab Filmmaking Club — the official filmmaking club of Manipal Institute of Technology (MIT Manipal). Hollywood-grade digital experience with film grain, custom cursor, glitch text, parallax, horizontal scroll carousels, member portal with localStorage auth.

## Architecture
- **Frontend**: React SPA (single-page scroll)
- **Backend**: FastAPI (minimal, existing health check)
- **Database**: MongoDB (not heavily used — auth is localStorage-based)
- **Auth**: localStorage-based with demo credentials
- **Styling**: Tailwind CSS + custom CSS variables + Google Fonts + custom fonts (ArabDances, Code Pro Light)
- **Libraries**: Swiper (carousels), Framer Motion (animations), Lucide React (icons)

## User Personas
1. **Prospective Members**: Students browsing the club, exploring films, submitting interest forms
2. **Current Members**: Logged-in members checking events, workshops, competitions, RSVPing
3. **Board Members**: Executive board with admin panel to view submissions and announce events

## Core Requirements (Static)
- Cinematic intro sequence (2.8s, skippable)
- Film grain overlay, custom cursor, glitch text effects
- Dark palette: #050505 bg, #c9a84c gold accent, #1de0cc teal accent
- Fonts: Bebas Neue, Playfair Display, DM Mono, Space Mono, Dancing Script, ArabDances
- Sharp geometry (no rounded corners)

## What's Been Implemented (Feb 2026)
- [x] Cinematic intro with logo reveal, counter, typewriter, scanline wipe
- [x] Film grain overlay (animated SVG noise)
- [x] Custom cursor (gold dot + ring, desktop only)
- [x] Sticky navbar with blur, scroll indicator, active link tracking
- [x] Hero section with glitch text, CSS atmosphere, parallax, vertical gold lines, ticker
- [x] Netflix-style horizontal card rail (Swiper) — 6 films
- [x] About section (50/50 split, stats, film strip)
- [x] Events section with Past/Upcoming tabs — 12 past events
- [x] Naqaab Picks horizontal ticker — 11 film reviews
- [x] Team section — 4 board, 3 creative, 5 management members + faculty advisor
- [x] 3D tilt effect on team cards
- [x] Member Portal with localStorage auth
- [x] Interest Form modal (slide-in)
- [x] Login modal (slide-in)
- [x] Member portal tabs: Events, Workshops, Competitions
- [x] Board-only Admin Panel (submissions, add event)
- [x] Social/Connect footer with Instagram, contact info
- [x] ROLL CAMERA floating badge
- [x] Gold scrollbar, gold text selection
- [x] prefers-reduced-motion support
- [x] Responsive design (mobile/tablet/desktop)
- [x] Custom fonts (ArabDances, Code Pro Light)
- [x] Scroll reveal animations

## Test Results
- Frontend: 98% pass rate
- All major features verified working

## Prioritized Backlog
### P0 (Critical) — None remaining
### P1 (Important)
- GSAP ScrollTrigger for more advanced scroll animations
- Parallax scrolling on section backgrounds (currently CSS-only on hero)
- Audio clapper board sound effect on click
### P2 (Nice to Have)
- Section heading character split animations
- More detailed Naqaab Picks cards with poster images
- Integration with Instagram API for live feed
- Video background option using uploaded NQ_Intro_4k_2025.mp4
- Dark/sepia mode toggle
- Image gallery of past events

## Next Tasks
1. Add GSAP ScrollTrigger animations for section headings
2. Implement Lenis smooth scroll
3. Add the intro video (NQ_Intro_4k_2025.mp4) as optional background
4. Enhance team member cards with actual photos when available
5. Add more event details from uploaded annual reports
