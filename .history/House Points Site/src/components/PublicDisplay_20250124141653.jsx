
import { houses } from "../constants/houses";

export default function PublicDisplay({ points }) {
  return (
    <div>
      {houses.map((house, index) => (
        <div key={house.name} style={{ color: house.color }}>
          <h2>{house.name}</h2>
          <p>Points: {points[index] || 0}</p>
          <p>Emblem: {house.emblem}</p>
          {/* ...any extra display... */}
        </div>
      ))}
    </div>
  );
}