
import React, { useEffect, useState } from 'react';
import { houses } from '../constants/houses';

function PublicDisplay() {
  const [points, setPoints] = useState({ Baudin: 0, Camfield: 0, Wilson: 0, Mokare: 0 });

  useEffect(() => {
    const storedPoints = JSON.parse(localStorage.getItem('housePoints')) || {};
    setPoints({ ...points, ...storedPoints });
    // ...existing code...
  }, []);

  return (
    <div>
      {houses.map((house) => (
        <div key={house.name} style={{ border: `2px solid ${house.color}`, margin: '8px' }}>
          <h2 style={{ color: house.color }}>{house.name}</h2>
          <p>Emblem: {house.emblem}</p>
          <p>Points: {points[house.name] || 0}</p>
        </div>
      ))}
    </div>
  );
}

export default PublicDisplay;