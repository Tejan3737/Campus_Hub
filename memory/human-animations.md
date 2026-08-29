---
name: human-animations
description: Added float, pulse, wiggle, and gradientShift animations for more lifelike feel
metadata:
  type: project
---

To make the site feel more human and less AI-generated, subtle animations were added that mimic natural movements:
- float: Gentle vertical movement (6s duration)
- pulse: Subtle scaling effect (0.5s on hover)
- wiggle: Slight rotation oscillation (0.5s on hover)
- gradientShift: Slow background gradient shift (15s infinite)

These animations are applied to sidebar icons, labels, and the sidebar background itself, with staggered start times using a hash function to prevent uniform movement.

**Why:** The user requested the site to "feel more human and less AI generated" and to "make this more alive" through lifelike animations.

**How to apply:** Define @keyframes animations in CSS, apply them to relevant elements with appropriate durations and timing functions, use animation-delay with deterministic values for staggering, and enhance hover states with additional animation effects. See index.css for animation definitions and Sidebar.jsx for hash-based delay implementation.