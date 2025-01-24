import { houses } from "../constants/houses";

export default function PublicDisplay({ points }) {
  const maxPoints = Math.max(...points, 1);

  return (
    <div className="house-grid">
      {houses.map((house, index) => (
        <div key={house.name} className="house-card">
          <h2 
            className="house-name" 
            style={{ 
              color: house.color,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 4px rgba(0, 0, 0, 0.5)' 
            }}
          >
            {house.name}
          </h2>
          <div 
            className="points-display" 
            style={{ 
              color: house.color,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 4px rgba(0, 0, 0, 0.5)' 
            }}
          >
            {points[index] || 0}
          </div>
          <div className="points-bar">
            <div 
            />
          </div>
        </div>
      ))}
    </div>
  );
}