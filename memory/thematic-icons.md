---
name: thematic-icons
description: Replaced abstract symbols with meaningful icons that work with site theme
metadata:
  type: project
---

The sidebar icons were updated to be more thematic and meaningful, replacing abstract symbols with icons that clearly represent their function:
- home: Simple house icon
- lost-and-found: Magnifying glass in a circle (search)
- buy-and-sell: Arrow exchange (buy/sell)
- registrations: Clipboard with check (sign-ups)
- skill-exchange: Two arrows exchanging (skill swap)
- notices: Bell or notice icon
- profile: User profile
- settings: Gear icon

All icons use SVG path data with fill="currentColor" to automatically adapt to the text color, ensuring they work with both light and dark themes and the existing color scheme.

**Why:** The user requested to "change the icons and work with the theme of the site" to improve visual communication and thematic consistency.

**How to apply:** Replace icon SVG paths with meaningful symbols, ensure they use fill="currentColor" for theme adaptability, and maintain compatibility with existing animation systems. See Sidebar.jsx lines 28-48 for the icon mapping and NavIcon component implementation.