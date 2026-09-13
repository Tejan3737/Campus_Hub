import { useState } from "react";
import { BuySellCard } from "../../components/Card";
import { BuyandSell } from "../../data/buyAndSell";

export function BuyAndSell() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(BuyandSell.map((item) => item.category)),
  ];
  const filteredItems =
    activeCategory === "All"
      ? BuyandSell
      : BuyandSell.filter((item) => item.category === activeCategory);

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
    </div>
  );
}

export default BuyAndSell;