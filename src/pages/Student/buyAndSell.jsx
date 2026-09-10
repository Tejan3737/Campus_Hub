import { BuySellCard } from "../../components/Card";
import { BuyandSell } from "../../data/buyAndSell"
export function BuyAndSell() {
  return (
    <>
      <div className="buy-and-sell-page">
        {BuyandSell.map((item) => (
          <BuySellCard 
          title={item.title}
          category={item.category}
          price={item.price}
          condition={item.condition}
          seller={item.seller}
          image={item.image}     
          />
        )
        )}
      </div>
    </>
  );
}

export default BuyAndSell;