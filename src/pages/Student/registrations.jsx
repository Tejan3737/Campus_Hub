import { useMemo, useState } from "react";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { eventRegistrationModal as EventRegistrationModal } from "../../components/modal";
import { EVENTS } from "../../data/events";
import { DEFAULT_USER } from "../../data/users";

const STORAGE_KEY = "campus-hub-registrations";

function loadRegistrations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {
  }
  return {};
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function Registrations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [registrations, setRegistrations] = useState(loadRegistrations);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = useMemo(
    () => ["All", ...new Set(EVENTS.map((event) => event.category))],
    [],
  );

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return EVENTS.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [activeCategory, search]);

  const registeredCount = useMemo(
    () => Object.keys(registrations).length,
    [registrations],
  );

  const handleRegister = (eventId, fields) => {
    setRegistrations((prev) => ({
      ...prev,
      [eventId]: { ...fields, registeredAt: new Date().toISOString() },
    }));
  };

  return (
    <div className="registrations-page">
      <div className="reg-header">
        <h1>Registrations</h1>
        <p className="reg-subtitle">
          Register for campus events.
          {registeredCount > 0 ? (
            <span className="reg-badge">
              You're registered for {registeredCount}{" "}
              {registeredCount === 1 ? "event" : "events"}
            </span>
          ) : null}
        </p>
      </div>

      <div className="reg-toolbar">
        <div className="reg-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search events or organizers…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="reg-filter-bar">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`reg-filter${activeCategory === category ? " is-active" : ""}`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="reg-empty">
          No events found — try a different search or filter.
        </div>
      ) : (
        <div className="reg-grid">
          {filteredEvents.map((event) => {
            const isRegistered = Boolean(registrations[event.id]);
            const seatsTaken = Math.min(
              event.registeredParticipants,
              event.maxParticipants,
            );
            const seatsLeft = Math.max(
              event.maxParticipants - seatsTaken,
              0,
            );
            const percent = Math.round(
              (seatsTaken / event.maxParticipants) * 100,
            );
            return (
              <article key={event.id} className="reg-card">
                <div className="reg-card-image">
                  <img src={event.image} alt={event.title} loading="lazy" />
                  <span className="reg-card-badge">{event.category}</span>
                </div>
                <div className="reg-card-body">
                  <div>
                    <h3 className="reg-card-title">{event.title}</h3>
                    <p className="reg-organizer">{event.organizer}</p>
                  </div>
                  <p className="reg-desc">{event.description}</p>
                  <div className="reg-meta">
                    <span>
                      <CalendarDays size={15} /> {formatDate(event.date)}
                    </span>
                    <span>
                      <Clock size={15} /> {event.time}
                    </span>
                    <span>
                      <MapPin size={15} /> {event.location}
                    </span>
                  </div>
                  <div className="reg-seats">
                    <div className="reg-seats-bar">
                      <span style={{ width: `${percent}%` }} />
                    </div>
                    <p className="reg-seats-label">
                      <Users size={14} /> {seatsTaken}/{event.maxParticipants}{" "}
                      seats · {seatsLeft} left
                    </p>
                  </div>
                  {isRegistered ? (
                    <button
                      type="button"
                      className="reg-registered"
                      disabled
                    >
                      <CircleCheck size={16} /> Registered
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="reg-register"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <EventRegistrationModal
        event={selectedEvent}
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        onRegister={handleRegister}
        defaultName={DEFAULT_USER.name}
        defaultEmail={DEFAULT_USER.email}
      />
    </div>
  );
}

export default Registrations;