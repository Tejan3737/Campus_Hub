import { useState } from "react";
import bell from "../assets/bell.png";

export function Navbar({
  mode,
  onNavigate,
  theme = "light",
  onToggleTheme,
  notificationCount = 0,
}) {
  const [query, setQuery] = useState("");

  return (
    <header id="navbar" className="navbar">
      <nav className="nav-container" aria-label="Main navigation">
        <form
          className="nav-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <svg className="nav-search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.2 4.2-1.4 1.4-4.2-4.2A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
          </svg>
          <input
            type="search"
            className="nav-search-input"
            placeholder="Search campus..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search"
          />
        </form>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm7.5-2.5a1 1 0 1 1 0 2H18a1 1 0 1 1 0-2Zm-13 0a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2Zm11.3 5.3a1 1 0 0 1 0 1.4l-1.1 1.1a1 1 0 0 1-1.4-1.4l1.1-1.1a1 1 0 0 1 1.4 0ZM8.2 6.2a1 1 0 0 1 0 1.4L7.1 8.7A1 1 0 1 1 5.7 7.3l1.1-1.1a1 1 0 0 1 1.4 0Zm9.7 0 1.1 1.1a1 1 0 1 1-1.4 1.4L16.5 7.6A1 1 0 0 1 17.9 6.2ZM7.1 16.5l1.1 1.1a1 1 0 0 1-1.4 1.4L5.7 17.9A1 1 0 1 1 7.1 16.5ZM12 18a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V19a1 1 0 0 1 1-1Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M13.2 3.1A8.5 8.5 0 1 0 20.9 13 7 7 0 0 1 13.2 3.1Z" />
              </svg>
            )}
          </button>

          <button type="button" className="nav-icon-btn notification" aria-label="Notifications">
            <img src={bell} alt="" />
          </button>

          {onNavigate && (
            <>
              <button
                type="button"
                className={mode === "login" ? "nav-link is-active" : "nav-link"}
                onClick={() => onNavigate("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={mode === "signup" ? "nav-link nav-signup is-active" : "nav-link nav-signup"}
                onClick={() => onNavigate("signup")}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
