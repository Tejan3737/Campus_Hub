import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { USERS } from "../../data/users";
import { Card} from "../../components/Card";
import { EVENTS } from "../../data/events";

export function Home() {
  const [userType, setUserType] = useState("student"); // 'student', 'admin', or 'club'
  const [page, setPage] = useState("home");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [eventPage, setEventPage] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Show 2 events per page, navigate with prev/next arrows
  const eventsPerPage = 2;
  const totalEventPages = Math.ceil(EVENTS.length / eventsPerPage);
  const pageEvents = EVENTS.slice(
    eventPage * eventsPerPage,
    eventPage * eventsPerPage + eventsPerPage,
  );

  return (
    <div className="app-shell">
      <Navbar
        mode="login"
        theme={theme}
        onToggleTheme={() =>
          setTheme((value) => (value === "dark" ? "light" : "dark"))
        }
        notificationCount={3}
        mobileMenuOpen={mobileSidebarOpen}
        onToggleMobileMenu={() => setMobileSidebarOpen((value) => !value)}
      />
      <div className="app-body">
        <Sidebar
          user={userType}
          active={page}
          onSelect={(nextPage) => {
            setPage(nextPage);
            setMobileSidebarOpen(false);
          }}
          isMobileOpen={mobileSidebarOpen}
        />
        <main className="page-main">
          <h1>Welcome Back, Tejan</h1>
          <div className="page-content">
            <div className="Recent-Notices">
              <h2>Recent Notices</h2>
            </div>
            <div className="side">
              <section className="featured events">
                <div className="featured-header">
                  <p>Featured Events</p>
                  <div className="featured-nav">
                    <button
                      type="button"
                      className="featured-arrow"
                      onClick={() => setEventPage((p) => Math.max(0, p - 1))}
                      disabled={eventPage === 0}
                      aria-label="Previous events"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="featured-arrow"
                      onClick={() =>
                        setEventPage((p) => Math.min(totalEventPages - 1, p + 1))
                      }
                      disabled={eventPage === totalEventPages - 1}
                      aria-label="Next events"
                    >
                      ›
                    </button>
                  </div>
                </div>
                <div className="featured-cards">
                  {pageEvents.map((event) => (
                    <Card
                      key={event.id}
                      title={event.title}
                      location={event.location}
                      imageUrl={event.image}
                    />
                  ))}
                </div>
              </section>
              <section className="featured events">
                <p>Community Activities</p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
