import { useMemo, useState } from "react";
import { BuySellCard } from "../../components/Card";
import { BuyandSell } from "../../data/buyAndSell";
import { buyAndSellModal as BuyAndSellModal } from "../../components/modal";

export function BuyAndSell() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState(BuyandSell);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(items.map((item) => item.category))],
    [items],
  );
  const itemCategories = useMemo(
    () => categories.filter((category) => category !== "All"),
    [categories],
  );

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleAddItem = (newItem) => {
    const nextId = Math.max(...items.map((item) => item.id), 0) + 1;
    const item = { id: nextId, ...newItem };
    if (!item.image) {
      item.image = "https://placehold.co/400x300?text=No+Image";
    }
    setItems((prev) => [...prev, item]);
    setIsModalOpen(false);
  };

  return (  
    <div className="buy-and-sell-page">
      <h1>Buy &amp; Sell</h1>
      <div className="buy-filter-bar">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            className={`buy-filter-tag${activeCategory === category ? " is-active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="buy-and-sell-grid">
        {filteredItems.map((item) => (
          <BuySellCard
            key={item.id}
            title={item.title}
            category={item.category}
            price={item.price}
            condition={item.condition}
            seller={item.seller}
            image={item.image}
          />
        ))}
      </div>
      <button
        type="button"
        className="buy-fab"
        onClick={() => setIsModalOpen(true)}
        aria-label="Add buy or sell item"
      >
        +
      </button>
      <BuyAndSellModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
        categories={itemCategories}
      />
    </div>
  );
}

export default BuyAndSell;