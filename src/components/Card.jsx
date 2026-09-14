import {
  MapPin,
  ShieldCheck,
  CircleAlert,
  BellRing,
  CalendarDays,
} from "lucide-react";

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

export function BuySellCard({
  title,
  category,
  price,
  condition,
  seller,
  image,
}) {
  return (
    <div className="buy-and-sell-card">
      <div className="buy-item-image">
        <p className="buy-item-category">{category}</p>
        <img src={image} alt={title} />
      </div>
      <div className="buy-item-content">
        <div className="buy-item-header">
          <h4>
            <strong>{title}</strong>
          </h4>
          <p>
            <strong>₹{price}</strong>
          </p>
        </div>
        <div className="buy-item-body">
          <p>
            Seller: {seller}
            {condition ? (
              <span className="buy-item-condition">
                {" "}
                • Condition: {condition}
              </span>
            ) : null}
          </p>
        </div>
        <div className="buy-item-footer">
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

function formatCardDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function LostAndFoundCard({
  item,
  category,
  location,
  date,
  status,
  imageUrl,
  description,
}) {
  return (
    <div className="lost-and-found-card">
      <div className="lost-item-image">
        <img src={imageUrl} alt={item} loading="lazy" />
        <span
          className={`lost-and-found-status ${status === "Found" ? "found" : "lost"}`}
        >
          {status}
        </span>
        <span className="lost-and-found-category-badge">{category}</span>
      </div>
      <div className="lost-and-found-card-content">
        <h3 className="lost-and-found-card-title">{item}</h3>
        {description ? (
          <p className="lost-and-found-card-description">{description}</p>
        ) : null}
      </div>
      <div className="lost-and-found-card-footer">
        <span className="lost-and-found-locate">
          <MapPin size={15} />
          {location}
        </span>
        <span className="lost-and-found-date-time">
          <CalendarDays size={15} />
          {formatCardDate(date)}
        </span>
      </div>
    </div>
  );
}

export function SkillExchangeCard({
  imageUrl,
  person_name,
  level_rating,
  level,
  skills,
  description,
  onConnect,
}) {
  return (
    <div className="skill-exchange-card">
      <div className="Skiller_name">
        <img src={imageUrl} alt={person_name} />
      </div>
      <div className="Skillexchange_body">
        <div className="NameOfPerson">
          <h3>{person_name}</h3>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
      <div className="skils">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
      <div>
        <p>
          <strong>Rating:</strong> {level_rating}
        </p>
        <p>
          <strong>Level:</strong> {level}
        </p>
      </div>
      <div className="connect_button">
        <button onClick={onConnect}>Connect Now</button>
      </div>
    </div>
  );
}
