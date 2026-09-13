import { useEffect, useState } from "react";

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