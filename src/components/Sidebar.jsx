import logo from "../assets/logo.png";
import React from "react";
import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Lightbulb,
  BookOpen,
  Megaphone,
  User,
  Settings,
} from "lucide-react";

const pages = [
  { id: "home", label: "DashBoard" },
  { id: "lost-and-found", label: "Lost and Found" },
  { id: "buy-and-sell", label: "Buy and Sell" },
  { id: "registrations", label: "Registrations" },
  { id: "skill-exchange", label: "Skill Exchange" },
  { id: "notices", label: "Notices" },
];

const account = [
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
];

function NavIcon({ id }) {
  const icons = {
    home: <LayoutDashboard size={18} fill = "currentColor"/>,
    "lost-and-found": <Search size={18} />,
    "buy-and-sell": <BookOpen size={18} />,
    registrations: <CalendarDays size={18} />,
    "skill-exchange": <Lightbulb size={18} fill = "currentColor"/>,
    notices: <Megaphone size={18} />,
    profile: <User size={18} />,
    settings: <Settings size={18} />,
  };

  return (
    <span className="sidebar-icon" aria-hidden="true">
      {icons[id]}
    </span>
  );
}

function SidebarButton({ item, active, onSelect, collapsed }) {
  return (
    <button
      type="button"
      className={active === item.id ? "sidebar-link is-active" : "sidebar-link"}
      onClick={() => onSelect?.(item.id)}
      title={collapsed ? item.label : undefined}
    >
      <NavIcon id={item.id} />
      <span className="sidebar-label">{item.label}</span>
    </button>
  );
}

export function Sidebar({ active = "home", onSelect }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <aside
      className={isCollapsed ? "sidebar is-collapsed" : "sidebar"}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      aria-label="Page navigation"
    >
      <div className="sidebar-top">
        <button type="button" className="sidebar-logo" onClick={() => onSelect?.("home")} aria-label="Go home">
          <img src={logo} alt="MyApp" className="logo-image" />
        </button>
      </div>

      <nav className="sidebar-nav">
        {pages.map((item) => (
          <SidebarButton
            key={item.id}
            item={item}
            active={active}
            onSelect={onSelect}
            collapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <nav className="sidebar-nav">
          {account.map((item) => (
            <SidebarButton
              key={item.id}
              item={item}
              active={active}
              onSelect={onSelect}
              collapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
    </aside>
    
  );
}