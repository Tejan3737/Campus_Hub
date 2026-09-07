import { Home } from "./pages/Student/studentDashboard";
import { Login } from "./pages/login";
import { Registrations } from "./pages/Student/registrations";
import { LostAndFound } from "./pages/Student/lostAndFound";
import { BuyAndSell } from "./pages/Student/buyAndSell";
import { Notices } from "./pages/Student/notices";
import { SkillExchange } from "./pages/Student/skillExchange";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { useState , useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  const [userType, setUserType] = useState("student"); // 'student', 'admin', or 'club'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
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
        <main className="page-main">
          <Sidebar
            user={userType}
            onSelect={() => {
              setMobileSidebarOpen(false);
            }}
            isMobileOpen={mobileSidebarOpen}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy-and-sell" element={<BuyAndSell />} />
            <Route path="/skill-exchange" element={<SkillExchange />} />
            <Route path="/lost-and-found" element={<LostAndFound />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="/notices" element={<Notices />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
