import { LostAndFoundCard } from "../../components/Card";
import { LostandFound } from "../../data/lostandfound";
export function LostAndFound() {
  return (
    <div className="lost-and-found-page">
      {LostandFound.map((item) => (
        <LostAndFoundCard
          key={item.id}
          item={item.item}
          category={item.category}
          location={item.location}
          date={item.date}
          status={item.status}
          imageUrl={item.image}
          description={item.description}
        />
      ))}
    </div>
  );
}