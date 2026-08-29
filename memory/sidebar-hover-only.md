---
name: sidebar-hover-only
description: Sidebar appears only on mouse hover using React state and events
metadata:
  type: project
---

The sidebar is configured to be hidden by default (collapsed) and only appears when the user hovers over it. This is implemented using React's useState hook to track the collapsed state, with onMouseEnter setting isCollapsed to false and onMouseLeave setting it to true.

**Why:** The user requested the sidebar to appear only on hover, not be permanently visible, to save screen space and provide a cleaner interface.

**How to apply:** Use useState to manage visibility state, attach onMouseEnter and onMouseLeave event handlers to the sidebar element, and conditionally apply CSS classes based on the state. See Sidebar.jsx lines 64-72 for implementation.