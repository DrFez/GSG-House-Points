import { houses } from "../constants/houses";

export default function PublicDisplay({ points }) {
  return (
    <div className="house-grid">
      {houses.map((house, index) => (
        <div key={house.name} className="house-card">
          <h2 style={{ color: house.color }}>{house.name}</h2>
          <div className="points-display" style={{ color: house.color }}>
            {points[index] || 0}
          </div>
          <div style={{ fontSize: '2rem', marginTop: '1rem' }}>{house.emblem}</div>
        </div>
      ))}
    </div>
  );
}