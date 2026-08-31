import {MapPin} from "lucide-react"

export function Card({ title, location, imageUrl }) {
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

export default Card;