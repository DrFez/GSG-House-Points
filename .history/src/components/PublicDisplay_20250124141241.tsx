import { House } from '../constants/houses';
import './PublicDisplay.css';

interface Props {
  houses: House[];
}

function PublicDisplay({ houses }: Props) {
  const maxPoints = Math.max(...houses.map(h => h.points));

  return (
    <div className="public-display">
      <h1>House Points Standings</h1>
      <div className="houses-grid">
        {houses.map(house => (
          <div
            key={house.name}
            className="house-card"
            style={{ borderColor: house.color }}
          >
            <h2>{house.name}</h2>
            <div className="emblem">{house.emblem}</div>
            <div className="points">{house.points}</div>
            <div className="bar-container">
              <div
                className="bar"
                style={{
                  width: `${(house.points / maxPoints) * 100}%`,
                  backgroundColor: house.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicDisplay;
