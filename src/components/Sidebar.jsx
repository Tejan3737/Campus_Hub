import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
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

function SidebarButton({ item, onSelect }) {
  return (
    <div className="sidebar-button">
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebar-link is-active" : "sidebar-link"
        }
        to={item.src || "#"}
        end={item.src === "/"}
        onClick={() => onSelect?.(item.id)}
      >
        <NavIcon id={item.id} />
        <span className="sidebar-label">{item.label}</span>
      </NavLink>
    </div>
  );
}

export function Sidebar({ user = "student", active, onSelect, isMobileOpen = false }) {
  const location = useLocation();

  let pages = [];
  if (user === "student") {
    pages = [
      { id: "home", label: "DashBoard", src: "/" },
      { id: "lost-and-found", label: "Lost and Found", src: "/lost-and-found" },
      { id: "buy-and-sell", label: "Buy and Sell", src: "/buy-and-sell" },
      { id: "registrations", label: "Registrations", src: "/registrations" },
      { id: "skill-exchange", label: "Skill Exchange", src: "/skill-exchange" },
      { id: "notices", label: "Notices", src: "/notices" },
    ];
  } else if (user === "admin") {
    pages = [
      { id: "home", label: "DashBoard", src: "/" },
      { id: "students", label: "Students", src: "/students" },
      { id: "clubs", label: "Clubs", src: "/clubs" },
      { id: "events", label: "Events", src: "/events" },
      { id: "notices", label: "Notices", src: "/notices" },
      { id: "lost-and-found", label: "Lost and Found", src: "/lost-and-found" },
    ];
  } else if (user === "club") {
    pages = [
      { id: "home", label: "DashBoard", src: "/" },
      { id: "events", label: "Events", src: "/events" },
      { id: "members", label: "Members", src: "/members" },
      { id: "announcements", label: "Announcements", src: "/announcements" },
    ];
  }

  const account = [
    { id: "profile", label: "Profile", src: "/profile" },
    { id: "settings", label: "Settings", src: "/settings" },
  ];

  const sidebarRef = useRef(null);
  const [indicator, setIndicator] = useState(null);

  function measureActive() {
    const root = sidebarRef.current;
    if (!root) return;
    const activeBtn = root.querySelector(".sidebar-link.is-active");
    if (!activeBtn) {
      setIndicator(null);
      return;
    }
    const rootRect = root.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    setIndicator({
      top: btnRect.top - rootRect.top,
      height: btnRect.height,
    });
  }

  useEffect(() => {
    measureActive();
  }, [location.pathname, active]);

  useEffect(() => {
    const id = window.setTimeout(measureActive, 60);
    window.addEventListener("resize", measureActive);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", measureActive);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={[
        "sidebar",
        isMobileOpen ? "mobile-open" : "",
      ].filter(Boolean).join(" ")}
      aria-label="Page navigation"
    >
      {indicator && (
        <span
          className="sidebar-indicator"
          style={{ top: indicator.top, height: indicator.height }}
          aria-hidden="true"
        />
      )}

      <div className="sidebar-top">
        <NavLink to="/" className="sidebar-logo" onClick={() => onSelect?.("home")} aria-label="Go home">
          <img src={logo} alt="MyApp" className="logo-image" />
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        {pages.map((item) => (
          <SidebarButton
            key={item.id}
            item={item}
            onSelect={onSelect}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <nav className="sidebar-nav">
          {account.map((item) => (
            <SidebarButton
              key={item.id}
              item={item}
              onSelect={onSelect}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

