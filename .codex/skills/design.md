---
name: design
description: Guidelines and principles for designing freeform Infinite Canvas and Spatial UI interfaces with retro-digital, skeuomorphic, and playful neo-brutalist aesthetics. Use when designing, building, or styling canvas-based application layouts, floating window interfaces, desktop-metaphor pages, or retro digital web experiences.
---

# Spatial Canvas Design System

This design system defines the principles, architecture, layout rules, and visual style for **Spatial Canvas / Infinite Canvas** interfaces (a desktop-metaphor web layout with playful, retro-digital, and skeuomorphic elements).

## Core Design Philosophy

1. **Freeform Workspace over Linear Flow:** Treat the viewport as an unconstrained surface where objects (windows, sticky notes, media elements, widgets) exist at explicit coordinates rather than in rigid document flow.
2. **Tactile & Expressive Nostalgia:** Blend classical desktop OS chrome (window headers, mini action buttons, retro icons, pixelated accents) with crisp modern layouts and drop shadows to make digital items feel physical and movable.
3. **Playful Density & Micro-Interactions:** Scatter micro-details (kaomojis, sticker tags, mini media clips, floating folders) to give the interface a personal, lived-in feel.

---

## 1. Spatial Layout & Background Rules

### Dot-Grid / Canvas Pattern
* **Pattern:** Subtle 2D dot matrix or fine graph grid background.
* **Color Spec:** Light neutral background (`#F7F7F8` or `#F3F4F6`) with low-contrast grid dots/lines (`#D1D5DB` or `rgba(0,0,0,0.08)`).
* **Behavior:** Grid remains static while floating elements scale or pan across the spatial canvas.

### Freeform Placement Strategy
* **Z-Index Layering:** Primary call-to-action (CTA) or key media card occupies the foreground center ($z\text{-index}: 20+$). Secondary windows/stickers float behind and around it with subtle tilt angles ($-3^\circ$ to $+3^\circ$).
* **Asymmetric Framing:** Anchor central content (e.g., logo, main hero CTA) with asymmetrical scattered framing objects (media clips, folders, kaomojis, pill badges).

---

## 2. Floating Window & Component Principles

### Window Chrome (Skeuomorphic Desktop Container)
* **Title Bar:** High-density header strip with top-left window action buttons (red, yellow, green circles, or classic monochrome buttons).
* **Border & Corner Radius:** Soft rounded corners (`8px` to `12px`) with subtle contrast border (`1px solid rgba(0,0,0,0.12)`).
* **Elevation & Shadow:** Soft, multi-layered directional box-shadow:
  `box-shadow: 0 10px 30px -5px rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.05);`

### Button Design Principles
* **Primary CTAs:**
  * Pill-shaped or rounded-rectangle buttons (`border-radius: 9999px` or `8px`).
  * Subtle gradient background or solid high-contrast shade with crisp drop shadows.
  * Icon + Text layout (e.g., Apple logo / Windows logo + concise action text).
* **Secondary Action Badges:**
  * Compact, high-contrast pills with subtle inset borders.
  * Hover state: Slight lift transition (`transform: translateY(-2px)`).

---

## 3. Retro-Digital Micro-Details & Decorators

### ASCII Kaomoji & Micro-Labels
* **Floating Typography:** Place monospaced ASCII kaomojis like `( ^ - ^ )`, `^ ω ^`, `¯\_(ツ)_/¯` directly onto the canvas in low-opacity dark tones (`#6B7280`).
* **Subtle Filename Captions:** Display monospaced, small-font filenames under media elements (e.g., `demo_recording.mov`, `notes.txt`) in gray font (`11px - 12px`, `font-family: monospace`).

### Tangible Widgets & Desktop Tropes
* **Folder Icons & File Stickers:** Use iconic desktop graphic metaphors (blue retro folders, label tags, sticky tapes, pixelated cursors).
* **Embedded Media Frames:** Wrap video players and image cards inside classic window frames with play/pause overlays and mini floating badges.

---

## 4. Typography & Color Palette Guidelines

* **Typography Hierarchy:**
  * **Brand / Hero Title:** Bold, clean sans-serif or display typeface with low letter spacing (`font-weight: 700–800`).
  * **Controls / Labels:** Clean, readable sans-serif (`Inter`, `SF Pro`, or system UI fonts).
  * **Code / File Annotations:** Monospace font family (`JetBrains Mono`, `Fira Code`, or `ui-monospace`).
* **Color Palette:**
  * **Base Canvas:** White to off-white (`#FFFFFF`, `#F9FAFB`).
  * **Accent Pop:** Vivid primary colors used sparingly for status indicators and icons (macOS dot colors: `#FF5F56`, `#FFBD2E`, `#27C93F`).
  * **Text/Chrome:** Deep charcoal for body text (`#111827`) and muted gray for spatial annotations (`#6B7280`).

---

## 5. Implementation Checklist for Developers/Designers

1. [ ] Wrap canvas inside a container with `overflow: hidden` and a subtle dot-grid CSS background pattern.
2. [ ] Define a clear z-index stack for background grid, scattered spatial items, and foreground focus elements.
3. [ ] Apply window chrome wrappers (title bar + control dots + drop shadow) to media items and embedded previews.
4. [ ] Include monospaced file captions and kaomoji floating elements scattered around the workspace.
5. [ ] Maintain responsive falling rules: on mobile viewports, transform freeform spatial coordinates into a stacked spatial feed while retaining window frame styling.
