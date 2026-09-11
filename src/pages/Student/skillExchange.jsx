import { SkillExchangeCard } from "../../components/Card";
import { SkillExchangeData } from "../../data/SkillExchange";

export function SkillExchange() {
  return (
    <div className="skill_exchange_page">
      {SkillExchangeData.map((item) => (
        <SkillExchangeCard
          key={item.id}
          imageUrl={item.imageUrl}
          person_name={item.person_name}
          level_rating={item.level_rating}
          level={item.level}
          skills={item.skills}
          description={item.description}
        />
      ))}
    </div>
  );
}