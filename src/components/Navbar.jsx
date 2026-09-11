import { useState } from "react";
import { Moon, BellRing, Sun } from "lucide-react";

export function Navbar({
  mode,
  onNavigate,
  theme = "light",
  onToggleTheme,
  mobileMenuOpen = false,
  onToggleMobileMenu,
}) {
  const [query, setQuery] = useState("");

  return (
    <header id="navbar" className="navbar">
      <nav className="nav-container" aria-label="Main navigation">
        <button
          type="button"
          className={mobileMenuOpen ? "nav-mobile-toggle is-open" : "nav-mobile-toggle"}
          onClick={onToggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

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
          <div>
            <input type="checkbox" className="checkbox" id="checkbox" checked={theme === "dark"} onChange={onToggleTheme} />
            <label for="checkbox" className="checkbox-label" style={{backgroundColor: theme==="dark" ?"#fcf1f1" : "#111"}}>
            <Moon className="moon" size={20}/>
            <Sun className="sun" size={20}/>
            <span className="ball" style={{backgroundColor: theme==="dark" ?"#111" : "#f8f6f6"}}></span>
            </label>
          </div>

          <button type="button" className="nav-icon-btn notification" aria-label="Notifications">
            <BellRing size={20} />
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
