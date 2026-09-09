import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RecentEventCard, RecentNoticesCard } from "../../components/Card";
import { EVENTS } from "../../data/events";
import { NOTICES } from "../../data/notices";

export function Home() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [eventPage, setEventPage] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const eventsPerPage = 2;
  const totalEventPages = Math.ceil(EVENTS.length / eventsPerPage);
  const pageEvents = EVENTS.slice(
    eventPage * eventsPerPage,
    eventPage * eventsPerPage + eventsPerPage,
  );

  return (
    <>
      <h1>Welcome Back, Tejan</h1>
      <div className="page-content">
        <div className="Recent-Notices">
          <div className="Recent-Notices-head">
            <h2>Recent Notices</h2>
            <NavLink to="/notices" className="view-all">View all</NavLink>
          </div>
          <div className="Recent-Notices-list">
            {NOTICES.slice(0, 3).map((notice) => (
              <RecentNoticesCard key={notice.id} notice={notice} />
            ))}
          </div>
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
                <RecentEventCard
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
    </>
  );
}

export default Home;
