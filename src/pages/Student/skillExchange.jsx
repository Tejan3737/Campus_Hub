import { useState } from "react";
import { SkillExchangeCard } from "../../components/Card";
import {
  skillExchangeModal as SkillExchangeModal,
  skillExchangeAddModal as SkillExchangeAddModal,
} from "../../components/modal";
import { SkillExchangeData } from "../../data/SkillExchange";

export function SkillExchange() {
  const [posts, setPosts] = useState(SkillExchangeData);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddPost = (newPost) => {
    const nextId = Math.max(...posts.map((post) => post.id), 0) + 1;
    setPosts((prev) => [{ id: nextId, ...newPost }, ...prev]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="skill_exchange_page">
      {posts.map((item) => (
        <SkillExchangeCard
          key={item.id}
          imageUrl={item.imageUrl}
          person_name={item.person_name}
          level_rating={item.level_rating}
          level={item.level}
          skills={item.skills}
          description={item.description}
          onConnect={() => setSelectedPerson(item)}
        />
      ))}
      <button
        type="button"
        className="buy-fab"
        onClick={() => setIsAddModalOpen(true)}
        aria-label="Add a skill exchange post"
      >
        +
      </button>
      <SkillExchangeModal
        person={selectedPerson}
        isOpen={selectedPerson !== null}
        onClose={() => setSelectedPerson(null)}
      />
      <SkillExchangeAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSkill={handleAddPost}
      />
    </div>
  );
}