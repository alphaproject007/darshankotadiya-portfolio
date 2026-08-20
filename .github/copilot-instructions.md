# Darshan Kotadiya Portfolio — Copilot Instructions

Always read `PORTFOLIO-SPEC.md` before making architectural or feature changes.

## Project Identity

This is a professional portfolio for Darshan Kotadiya.

Positioning:
- Full-Stack Software Engineer
- Angular-focused frontend developer
- Java / Spring Boot working knowledge
- Web + Ionic mobile development

Do not position this as:
- a freelance agency
- a consultancy
- a startup/company website
- a business services website

## Required Technology Stack

- Angular 22.x
- TypeScript 6.0.x
- RxJS 7.8.x
- Tailwind CSS 4.x
- SCSS
- Node.js 24 LTS

Do not blindly upgrade packages.
Do not use unrelated "latest" versions.
Keep Angular and Angular CLI compatible.
Do not add dependencies without a real requirement.

## Styling Rules

- Tailwind CSS is the primary styling system.
- Use Tailwind for layout, spacing, typography, colors, responsive behavior and normal component styling.
- Use SCSS only for complex custom effects, animations, pseudo-elements, advanced gradients or styling that is awkward in Tailwind.
- Keep custom SCSS minimal.
- Do not add Bootstrap.
- Do not duplicate Tailwind styling inside SCSS.

## Architecture

Use standalone Angular components.

Keep:
- UI components
- data models
- services
- configuration
- runtime content

separated.

Changing portfolio content must not require editing UI components.

Changing portfolio content must use runtime JSON data.

Use a data-service abstraction so the JSON source can later be replaced by a REST API without rewriting UI components.

## Runtime Data

Changing content should live in runtime JSON rather than TypeScript constants.

Expected runtime data:

- `profile.json`
- `experience.json`
- `projects.json`
- `skills.json`
- `sections.json`
- `social.json`
- `site.json`

Do not hard-code changing professional information inside components.

## Section Visibility

Optional sections must support visibility configuration.

Examples:
- personalProjects
- blog
- certifications
- testimonials
- githubActivity
- achievements

When disabled:
- do not render the section
- do not show empty placeholders
- do not show "Coming Soon"

## Naming Convention

Prefer clear personal naming for portfolio sections.

Use:
- `me`
- `my-story`
- `my-work`
- `experience`
- `skills`
- `mobile-work`
- `how-i-work`
- `resume`
- `connect`

Avoid generic AI-style names such as:
- `HeroComponent`
- `AboutComponent`
- `ExperienceComponent`
- `ProjectsComponent`

unless technically required.

Use clear Angular file naming conventions.

## Content Accuracy

Never invent:
- companies
- projects
- project ownership
- metrics
- users
- technologies
- achievements
- URLs
- job titles
- dates
- responsibilities

The latest resume and `PORTFOLIO-SPEC.md` are the sources of truth.

Professional/company projects must be presented as professional work, not personal projects.

Do not expose confidential company information, credentials, private architecture, customer information or proprietary source code.

## Comments

Do not add comments everywhere.

Do not write comments that merely explain obvious code.

Use comments only when:
- logic is genuinely non-obvious
- a browser/platform workaround is required
- an unusual security/performance decision needs explanation

## Responsive Design

Mobile-first.

The UI must work properly at:
- mobile
- tablet
- desktop

Always consider:
- no horizontal overflow
- readable typography
- touch-friendly controls
- responsive navigation
- responsive cards
- responsive timelines
- responsive project grids

Do not create desktop-only layouts.

## Theme

Support:
- dark
- light
- system

Dark is the default.

Persist user preference locally.

When system mode is selected, respect `prefers-color-scheme`.

Avoid visible theme flash during startup where practical.

## Security

Never place secrets in frontend code.

Never expose:
- database credentials
- admin credentials
- API secrets
- private tokens
- JWT signing secrets

Do not implement fake frontend-only security.

Future admin operations must be protected server-side.

## AI / Copilot Rules

Before modifying files:
1. Inspect the existing implementation.
2. Read `PORTFOLIO-SPEC.md`.
3. Reuse existing components/services where possible.
4. Do not duplicate functionality.
5. Do not change architecture without instruction.

Make small, focused changes.

Do not attempt to build the entire portfolio in one request.

After meaningful changes:
- run the build
- run tests when relevant
- report errors instead of hiding them

## Current Implementation Scope

Current phase:
- Angular foundation
- Tailwind
- SCSS
- theme system
- responsive shell
- runtime data architecture

Do NOT implement yet:
- Spring Boot backend
- PostgreSQL
- admin dashboard
- LinkedIn synchronization
- unnecessary authentication
- unnecessary infrastructure

Those may be added later without changing the UI architecture.

## Code Quality

Prefer:
- simple solutions
- reusable components
- strong typing
- readable code
- minimal duplication
- small components
- predictable state management

Do not over-engineer.

Do not add abstractions unless they provide a real benefit.