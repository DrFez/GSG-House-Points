import { houses } from "../constants/houses";

export default function PublicDisplay({ points }) {
  const maxPoints = Math.max(...points, 1);

  return (
    <div className="house-grid">
      {houses.map((house, index) => (
        <div key={house.name} className="house-card">
          <h2 className="house-name" style={{ color: house.color }}>
            {house.name}
          </h2>
          <div className="points-display" style={{ color: house.color }}>
            {points[index] || 0}
          </div>
          <div className="points-bar">
            <div 
              className="points-bar-fill" 
              style={{ 
                width: `${(points[index] / maxPoints) * 100}%`,
                background: house.color 
              }} 
            />
          </div>
          <div className="house-emblem" style={{ border: `5px solid ${house.color}` }}>
            <img 
              src={house.emblemUrl} 
              alt={`${house.emblem} emblem`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}