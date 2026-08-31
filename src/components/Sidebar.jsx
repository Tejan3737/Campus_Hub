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
  Users
} from "lucide-react";

function NavIcon({ id }) {
  const icons = {
    home: <LayoutDashboard size={18} fill="currentColor" />,
    "lost-and-found": <Search size={18} />,
    "buy-and-sell": <BookOpen size={18} />,
    registrations: <CalendarDays size={18} />,
    "skill-exchange": <Lightbulb size={18} fill="currentColor" />,
    notices: <Megaphone size={18} />,
    profile: <User size={18} />,
    settings: <Settings size={18} />,
    members: <Users size={18} />,
    announcements: <Megaphone size={18} />,
    events: <CalendarDays size={18} />,
    students: <User size={18} />,
    clubs: <Users size={18} />,
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

export function Sidebar({ user = "student", active = "home", onSelect }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  let pages = [];
  if (user === "student") {
    pages = [
      { id: "home", label: "DashBoard" },
      { id: "lost-and-found", label: "Lost and Found" },
      { id: "buy-and-sell", label: "Buy and Sell" },
      { id: "registrations", label: "Registrations" },
      { id: "skill-exchange", label: "Skill Exchange" },
      { id: "notices", label: "Notices" },
    ];
  } else if (user === "admin") {
    pages = [
      { id: "home", label: "DashBoard" },
      { id: "students", label: "Students" },
      { id: "clubs", label: "Clubs" },
      { id: "events", label: "Events" },
      { id: "notices", label: "Notices" },
      { id: "lost-and-found", label: "Lost and Found" }
    ];
  } else if (user === "club") {
    pages = [
      { id: "home", label: "DashBoard" },
      { id: "events", label: "Events" },
      { id: "members", label: "Members" },
      { id: "announcements", label: "Announcements" }
    ];
  }

  const account = [
    { id: "profile", label: "Profile" },
    { id: "settings", label: "Settings" },
  ];

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