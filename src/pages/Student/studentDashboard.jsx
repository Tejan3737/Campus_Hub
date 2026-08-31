import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { USERS } from "../../data/users";
import { Card} from "../../components/Card";
import { EVENTS } from "../../data/events";

export function Home() {
  const [userType, setUserType] = useState("student"); // 'student', 'admin', or 'club'
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <Navbar
        mode="login"
        theme={theme}
        onToggleTheme={() =>
          setTheme((value) => (value === "dark" ? "light" : "dark"))
        }
        notificationCount={3}
      />
      <div className="app-body">
        <Sidebar user={userType} active={page} onSelect={setPage} />
        <main className="page-main">
          <h1>Welcome Back, Tejan</h1>
          <div className="page-content">
            <div className="Recent-Notices">
              <h2>Recent Notices</h2>
            </div>
            <div className="side">
              <div className="featured events">
                <p>Featured Events</p>
                {EVENTS.slice(0, 2).map((event) => (
                  <Card
                    key={event.id}
                    title={event.title}
                    location={event.location}
                    imageUrl={event.image}
                  />
                ))}
              </div>
              <div className="featured events">
                <p>Community Updates</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
