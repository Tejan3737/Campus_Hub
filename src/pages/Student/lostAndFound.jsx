import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { LostAndFoundCard } from "../../components/Card";
import { lostAndFoundModal as LostAndFoundModal } from "../../components/modal";
import { LostandFound } from "../../data/lostandfound";

export function LostAndFound() {
  const [reports, setReports] = useState(LostandFound);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(reports.map((report) => report.category))],
    [reports],
  );
  const reportCategories = useMemo(
    () => categories.filter((category) => category !== "All"),
    [categories],
  );

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesCategory =
        activeCategory === "All" || report.category === activeCategory;
      const matchesStatus =
        activeStatus === "All" || report.status === activeStatus;
      const matchesSearch =
        !query ||
        report.item.toLowerCase().includes(query) ||
        report.location.toLowerCase().includes(query);
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [reports, activeCategory, activeStatus, search]);

  const handleAddReport = (newReport) => {
    const nextId = Math.max(...reports.map((report) => report.id), 0) + 1;
    const report = { id: nextId, ...newReport };
    if (!report.image) {
      report.image = "https://placehold.co/400x300?text=No+Image";
    }
    setReports((prev) => [report, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="lost-and-found-page">
      <div className="laf-page-head">
        <h1>Lost &amp; Found</h1>
        <p className="reg-subtitle">
          Browse what has been reported, or add a new report.
        </p>
      </div>

      <div className="reg-toolbar">
        <div className="reg-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search items or locations…"
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
        <div className="reg-filter-bar">
          {["All", "Lost", "Found"].map((status) => (
            <button
              key={status}
              type="button"
              className={`reg-filter${activeStatus === status ? " is-active" : ""}`}
              aria-pressed={activeStatus === status}
              onClick={() => setActiveStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="reg-empty">
          No reports found — try a different search or filter.
        </div>
      ) : (
        <div className="laf-grid">
          {filteredReports.map((report) => (
            <LostAndFoundCard
              key={report.id}
              item={report.item}
              category={report.category}
              location={report.location}
              date={report.date}
              status={report.status}
              imageUrl={report.image}
              description={report.description}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        className="buy-fab"
        onClick={() => setIsModalOpen(true)}
        aria-label="Report a lost or found item"
      >
        +
      </button>
      <LostAndFoundModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddReport}
        categories={reportCategories}
      />
    </div>
  );
}

export default LostAndFound;