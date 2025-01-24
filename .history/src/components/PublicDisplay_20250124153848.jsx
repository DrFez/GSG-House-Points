import { houses } from "../constants/houses";
import '../styles/PublicDisplay.css';

export default function PublicDisplay({ points }) {
  const maxPoints = Math.max(...points, 1);
  
  // Create sorted houses with positions
    ...house,
    points: points[index] || 0,
    position: 0
  }))
  .sort((a, b) => b.points - a.points)
  .map((house, index) => ({
    ...house,
    position: index + 1
  }));

  return (
    <div className="house-grid">
      {sortedHouses.map((house) => (
        <div key={house.name} className={`house-card ${house.position === 1 ? 'first-place' : ''}`}>
          <div className="position-badge">#{house.position}</div>
          <h2 
            className="house-name" 
            style={{ 
              color: house.color,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
            }}
          >
            {house.name}
          </h2>
          <div 
            className="points-display" 
            style={{ 
              color: house.color,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
            }}
          >
            {house.points}
          </div>
          <div className="points-bar">
            <div 
              className="points-bar-fill" 
              style={{ 
                width: `${(house.points / maxPoints) * 100}%`,
                background: house.color 
              }} 
            />
          </div>
          <div className="house-emblem" style={{ border: `2px solid ${house.color}` }}>
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