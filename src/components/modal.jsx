import { useEffect, useState } from "react";
import {
  Mail,
  Globe,
  CalendarDays,
  CircleCheck,
  Clock,
  MapPin,
} from "lucide-react";

function formatEventDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function buyAndSellModal({ isOpen, onClose, onAddItem, categories }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [condition, setCondition] = useState("Good");
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setTitle("");
    setPrice("");
    setCategory(categories[0]);
    setCondition("Good");
    setSeller("");
    setImage("");
  }, [isOpen, categories]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !seller.trim()) return;
    onAddItem({
      title: title.trim(),
      price: Number(price) || 0,
      category: category.trim(),
      condition: condition.trim(),
      seller: seller.trim(),
      image: image.trim(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="buy-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Add a buy or sell item"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add Item</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="item-title">
                Title
              </label>
              <input
                id="item-title"
                className="modal-input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Engineering Maths Book"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="item-price">
                Price (₹)
              </label>
              <input
                id="item-price"
                className="modal-input"
                type="number"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="e.g. 350"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="item-category">
                Category
              </label>
              <select
                id="item-category"
                className="modal-input"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="item-condition">
                Condition
              </label>
              <select
                id="item-condition"
                className="modal-input"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
              >
                {["New", "Like New", "Good", "Fair"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="item-seller">
                Seller
              </label>
              <input
                id="item-seller"
                className="modal-input"
                type="text"
                value={seller}
                onChange={(event) => setSeller(event.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="item-image">
                Image URL (optional)
              </label>
              <input
                id="item-image"
                className="modal-input"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function skillExchangeModal({ person, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !person) return null;

  const linkedinUrl = `https://www.linkedin.com/in/${person.linkedin}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="buy-modal connect-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Connection request sent"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Connection Request Sent</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="connect-modal-body">
          <div className="connect-modal-icon">
            <Mail size={28} />
          </div>
          <p>
            Mail sent to <strong>{person.person_name}</strong>
            {person.email ? <> ({person.email})</> : null}. They will get
            back to you on the exchange.
          </p>
          {person.linkedin ? (
            <p className="connect-modal-linkedin">
              <Globe size={16} />
              <span>
                You can also communicate on LinkedIn:{" "}
                <a href={linkedinUrl} target="_blank" rel="noreferrer">
                  {person.linkedin}
                </a>
              </span>
            </p>
          ) : null}
        </div>
        <div className="modal-actions">
          <button type="button" className="modal-submit" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export function eventRegistrationModal({
  event,
  isOpen,
  onClose,
  onRegister,
  defaultName = "",
  defaultEmail = "",
}) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [rollNo, setRollNo] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setName(defaultName);
    setEmail(defaultEmail);
    setRollNo("");
    setNote("");
    setSubmitted(false);
  }, [isOpen, event, defaultName, defaultEmail]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (keyEvent) => {
      if (keyEvent.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const handleSubmit = (formEvent) => {
    formEvent.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onRegister(event.id, {
      name: name.trim(),
      email: email.trim(),
      rollNo: rollNo.trim(),
      note: note.trim(),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="buy-modal reg-modal"
          role="alertdialog"
          aria-modal="true"
          aria-label="Registration confirmed"
          onClick={(clickEvent) => clickEvent.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Registration Confirmed</h2>
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="reg-success">
            <div className="reg-success-icon">
              <CircleCheck size={34} />
            </div>
            <h3>You're registered!</h3>
            <p>
              Your spot for <strong>{event.title}</strong> is confirmed on{" "}
              <strong>{formatEventDate(event.date)}</strong>. A confirmation
              email has been sent to <strong>{email}</strong>.
            </p>
            <div className="reg-success-details">
              <span>
                <CalendarDays size={14} /> {formatEventDate(event.date)}
              </span>
              <span>
                <Clock size={14} /> {event.time}
              </span>
              <span>
                <MapPin size={14} /> {event.location}
              </span>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-submit" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="buy-modal reg-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Register for ${event.title}`}
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Register</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="reg-event-summary">
          <img src={event.image} alt="" />
          <div>
            <h3>{event.title}</h3>
            <p>
              <CalendarDays size={13} /> {formatEventDate(event.date)} ·{" "}
              {event.time}
            </p>
            <p>
              <MapPin size={13} /> {event.location}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">
                Full Name
              </label>
              <input
                id="reg-name"
                className="modal-input"
                type="text"
                value={name}
                onChange={(changeEvent) => setName(changeEvent.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">
                Email
              </label>
              <input
                id="reg-email"
                className="modal-input"
                type="email"
                value={email}
                onChange={(changeEvent) => setEmail(changeEvent.target.value)}
                placeholder="you@campus.edu"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-roll">
                Roll Number{" "}
                <span className="reg-optional">(optional)</span>
              </label>
              <input
                id="reg-roll"
                className="modal-input"
                type="text"
                value={rollNo}
                onChange={(changeEvent) => setRollNo(changeEvent.target.value)}
                placeholder="e.g. 24BCS1234"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-note">
                Note{" "}
                <span className="reg-optional">(optional)</span>
              </label>
              <textarea
                id="reg-note"
                className="modal-input reg-textarea"
                value={note}
                onChange={(changeEvent) => setNote(changeEvent.target.value)}
                placeholder="Anything the organizers should know?"
                rows={3}
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function lostAndFoundModal({
  isOpen,
  onClose,
  onAddItem,
  categories,
  defaultStatus = "Lost",
}) {
  const [item, setItem] = useState("");
  const [category, setCategory] = useState(categories[0] || "");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setItem("");
    setCategory(categories[0] || "");
    setLocation("");
    setDate("");
    setStatus(defaultStatus);
    setDescription("");
    setImage("");
  }, [isOpen, categories, defaultStatus]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!item.trim() || !location.trim()) return;
    onAddItem({
      item: item.trim(),
      category: category.trim(),
      location: location.trim(),
      date: date || new Date().toISOString().slice(0, 10),
      status: status.trim(),
      description: description.trim(),
      image: image.trim(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="buy-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Report a lost or found item"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Report Item</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="laf-item">
                Item
              </label>
              <input
                id="laf-item"
                className="modal-input"
                type="text"
                value={item}
                onChange={(event) => setItem(event.target.value)}
                placeholder="e.g. Black Wallet"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="laf-category">
                Category
              </label>
              <select
                id="laf-category"
                className="modal-input"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="laf-location">
                Location
              </label>
              <input
                id="laf-location"
                className="modal-input"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Library"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="laf-date">
                Date
              </label>
              <input
                id="laf-date"
                className="modal-input"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="laf-status">
                Status
              </label>
              <select
                id="laf-status"
                className="modal-input"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {["Lost", "Found"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="laf-description">
                Description
              </label>
              <textarea
                id="laf-description"
                className="modal-input reg-textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="A few details to help identify the item"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="laf-image">
                Image URL (optional)
              </label>
              <input
                id="laf-image"
                className="modal-input"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit">
              Add Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function skillExchangeAddModal({
  isOpen,
  onClose,
  onAddSkill,
  defaultLevel = "Easy",
}) {
  const [personName, setPersonName] = useState("");
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState(defaultLevel);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setPersonName("");
    setSkills("");
    setLevel(defaultLevel);
    setRating("");
    setDescription("");
    setEmail("");
    setLinkedin("");
    setImageUrl("");
  }, [isOpen, defaultLevel]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!personName.trim() || !skills.trim()) return;
    const skillList = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    onAddSkill({
      person_name: personName.trim(),
      skills: skillList,
      level: level.trim(),
      level_rating: rating.trim() || "N/A",
      description: description.trim(),
      email: email.trim(),
      linkedin: linkedin.trim(),
      imageUrl:
        imageUrl.trim() ||
        "https://placehold.co/300x300?text=New+Member",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="buy-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Add a skill exchange post"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add Skill Post</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="se-name">
                Person Name
              </label>
              <input
                id="se-name"
                className="modal-input"
                type="text"
                value={personName}
                onChange={(event) => setPersonName(event.target.value)}
                placeholder="e.g. Priya Sharma"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="se-skills">
                Skills
              </label>
              <input
                id="se-skills"
                className="modal-input"
                type="text"
                value={skills}
                onChange={(event) => setSkills(event.target.value)}
                placeholder="e.g. Python, Django, SQL"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="se-level">
                Level
              </label>
              <select
                id="se-level"
                className="modal-input"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
              >
                {["Easy", "Intermediate", "Difficult"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="se-rating">
                Rating{" "}
                <span className="reg-optional">(optional)</span>
              </label>
              <input
                id="se-rating"
                className="modal-input"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                placeholder="e.g. 4.2"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="se-desc">
                About{" "}
                <span className="reg-optional">(optional)</span>
              </label>
              <textarea
                id="se-desc"
                className="modal-input reg-textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="e.g. Computer Science, 2nd year"
                rows={2}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="se-email">
                Email{" "}
                <span className="reg-optional">(optional)</span>
              </label>
              <input
                id="se-email"
                className="modal-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@campus.edu"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="se-linkedin">
                LinkedIn ID{" "}
                <span className="reg-optional">(optional)</span>
              </label>
              <input
                id="se-linkedin"
                className="modal-input"
                type="text"
                value={linkedin}
                onChange={(event) => setLinkedin(event.target.value)}
                placeholder="e.g. priya-sharma"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="se-image">
                Image URL{" "}
                <span className="reg-optional">(optional)</span>
              </label>
              <input
                id="se-image"
                className="modal-input"
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-submit">
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}