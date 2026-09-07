import { MapPin, ShieldCheck, CircleAlert, BellRing } from "lucide-react";

export function RecentEventCard({ title, location, imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-location-container">
          <MapPin size={16} />
          <p className="card-location">{location}</p>
        </div>
      </div>
    </div>
  );
}

export function NoticeTypeIcon({ type }) {
  if (type === "College Life") {
    return (
      <>
        <span
          className="icon-container-notice"
          style={{
            backgroundColor: "rgba(21, 185, 24, 0.12)",
          }}
        >
          <ShieldCheck size={30} color="#16a34a" />
        </span>
      </>
    );
  } else if (type === "Announcement") {
    return (
      <span
        className="icon-container-notice"
        style={{
          backgroundColor: "rgba(37, 99, 235, 0.12)",
        }}
      >
        <CircleAlert size={30} color="#2563eb" />
      </span>
    );
  } else if (type === "Urgent") {
    return (
      <span
        className="icon-container-notice"
        style={{
          backgroundColor: "rgba(220, 38, 38, 0.12)",
        }}
      >
        <BellRing size={30} color="#f11717" />
      </span>
    );
  }
  return null;
}

export function RecentNoticesCard({ notice }) {
  if (!notice) return null;
  const { title, description, date, type, postedBy } = notice;

  return (
    <div className="notice-card">
      <div className="notice-icon">
        <NoticeTypeIcon type={type} />
      </div>
      <div className="notice-card-content">
        <div className="notice-card-header">
          <span
            className={`notice-badge notice-badge-${type?.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {type}
          </span>
          <span className="notice-date">{date}</span>
        </div>
        <h3 className="notice-title">{title}</h3>
        <p className="notice-description">{description}</p>
        {postedBy && (
          <div className="notice-footer">
            <span className="notice-posted">Posted by: {postedBy}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentEventCard;
