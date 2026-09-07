import { NOTICES } from "../../data/notices";
import { RecentNoticesCard } from "../../components/Card";

export function Notices() {
  return (
    <div className="notices-page">
      <h1>Notices & Announcements</h1>
      <p className="notices-subtitle">
        Stay updated with official campus alerts, events, and department news.
      </p>
      <div className="notices-grid">
        {NOTICES.map((notice) => (
          <RecentNoticesCard key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  );
}

export default Notices;