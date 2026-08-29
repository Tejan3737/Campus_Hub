import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const pageTitles = {
  home: "Home",
  "lost-and-found": "Lost and Found",
  "buy-and-sell": "Buy and Sell",
  registrations: "Registrations",
  "skill-exchange": "Skill Exchange",
  notices: "Notices",
  profile: "Profile",
  settings: "Settings",
};

export function Home() {
  const [mode, setMode] = useState("login");
  const [page, setPage] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <Navbar
        mode={mode}
        onNavigate={setMode}
        theme={theme}
        onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
        notificationCount={3}
      />
      <div className="app-body">
        <Sidebar
          active={page}
          onSelect={setPage}
          collapsed={collapsed}
          onHover={() => setCollapsed((value) => !value)}
        />
        <main className="page-main">
          <h1>{"DashBoard"}</h1>
          <p className="eyebrow">Your dashboard</p>
        </main>
      </div>
    </div>
  );
}
