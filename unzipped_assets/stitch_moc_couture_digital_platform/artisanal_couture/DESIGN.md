---
name: Artisanal Couture
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#56423d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#89726c'
  outline-variant: '#dcc0b9'
  surface-tint: '#9d4227'
  primary: '#9a4025'
  on-primary: '#ffffff'
  primary-container: '#ba573b'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb5a0'
  secondary: '#625e54'
  on-secondary: '#ffffff'
  secondary-container: '#e6dfd2'
  on-secondary-container: '#676258'
  tertiary: '#5d5c58'
  on-tertiary: '#ffffff'
  tertiary-container: '#767471'
  on-tertiary-container: '#fcffe3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a0'
  on-primary-fixed: '#3b0900'
  on-primary-fixed-variant: '#7e2b12'
  secondary-fixed: '#e9e2d5'
  secondary-fixed-dim: '#ccc6b9'
  on-secondary-fixed: '#1e1b13'
  on-secondary-fixed-variant: '#4a463d'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: ebGaramond
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-md:
    fontFamily: ebGaramond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: dmSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: dmSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: dmSans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system is rooted in the intersection of traditional craftsmanship and contemporary high fashion. It prioritizes the tactile nature of crochet—its texture, rhythm, and warmth—while maintaining an editorial rigor that positions the brand as a luxury atelier.

The visual direction follows a **Minimalist** philosophy with **Tactile** undertones. By utilizing generous white space (represented here as cream and sand tones), the UI allows the intricate details of the handmade garments to breathe. The emotional goal is to evoke a sense of "slow fashion"—deliberate, high-quality, and deeply personal. Subtle background grain and soft, feathered shadows are used to mimic the natural fall of fabric and the organic texture of yarn.

## Colors
The palette is a curated selection of warm earth tones designed to feel organic and grounded.

- **Primary (Terracotta):** Used sparingly for calls to action, active states, and brand-defining accents. It represents the clay and earth from which natural dyes are derived.
- **Secondary (Sand):** A transitional shade used for secondary containers, borders, and subtle background shifts.
- **Tertiary (Cream):** The primary canvas color. It is softer than pure white, reducing eye strain and providing a "muslin cloth" feel to the layout.
- **Neutral (Deep Charcoal):** Reserved for typography and high-contrast iconography. It provides the necessary weight to anchor the lighter earth tones.

Avoid using pure black or pure white; the richness of this design system relies on the slight warmth found in every hex code.

## Typography
The typographic scale emphasizes an editorial, magazine-like hierarchy. 

**ebGaramond** is our voice of authority and tradition. It should be used for all expressive headings and product titles. Its classical proportions and graceful serifs mirror the delicate loops of crochet work. 

**dmSans** provides a functional counterpoint. As a low-contrast geometric sans-serif, it offers maximum legibility for descriptions and UI labels without competing with the headlines. 

For labels and small navigation items, use `label-md` with uppercase styling and increased letter spacing to achieve a modern, high-fashion boutique aesthetic.

## Layout & Spacing
This design system utilizes a **Fixed Grid** approach for desktop to maintain the integrity of its editorial compositions, transitioning to a fluid model for mobile devices.

- **Desktop:** 12-column grid with wide 64px outer margins. This creates the "whitespace frame" essential for luxury branding.
- **Rhythm:** All spacing is based on a baseline unit of 8px. Use large gaps (64px, 80px, 96px) between sections to separate different collections or stories.
- **Reflow:** On mobile, margins tighten to 20px, and multi-column layouts should stack vertically to ensure the photography (the core of the brand) remains large and impactful.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Ambient Shadows** rather than harsh borders or heavy fills.

- **Surface Levels:** The base layer is Tertiary (Cream). Secondary containers use the Sand tone to indicate a slight lift.
- **Shadows:** Use extremely soft, low-opacity shadows (e.g., `rgba(45, 45, 45, 0.05)` with a 20px-30px blur). Shadows should feel like the soft "drop" of a garment on a surface, not a digital effect.
- **Textures:** Implement a subtle noise overlay (1-2% opacity) on the primary background to simulate the grain of natural fibers. This breaks the "flatness" of the screen and adds to the artisanal feel.

## Shapes
The shape language is **Soft**. While high fashion often leans toward sharp corners, this design system uses subtle rounding to reflect the softness of yarn and the human element of handcrafted goods.

- **Standard Elements:** 0.25rem (4px) corner radius for most UI components (inputs, small buttons).
- **Large Components:** 0.5rem (8px) for cards and modals.
- **Imagery:** Product photography should remain sharp (0px radius) to maintain a professional, editorial look, while UI containers surrounding them provide the softness.

## Components
Consistent component styling ensures the brand feels cohesive across all touchpoints.

- **Buttons:** Primary buttons use a solid Terracotta background with White or Cream text. They should have ample horizontal padding and use the `label-md` type style. Secondary buttons are "Ghost" style with a Thin Deep Charcoal border.
- **Cards:** Use the Sand background with a very soft ambient shadow. Keep padding generous (min 32px) to ensure the content within the card feels uncrowded.
- **Input Fields:** Bottom-border only or very light Sand-colored fills. This mimics the clean lines of a fashion sketchbook. Focus states transition the border to Terracotta.
- **Chips/Tags:** Used for "Material" (e.g., "100% Organic Cotton"). These should be pill-shaped with a Sand background and Deep Charcoal text to look like garment tags.
- **Lists:** Use elegant dividers in Sand (1px) with high vertical spacing between items to maintain the "slow" browsing experience.