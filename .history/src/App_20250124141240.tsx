import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PublicDisplay from './components/PublicDisplay';
import AdminPanel from './components/AdminPanel';
import { House, houses as initialHouses } from './constants/houses';

function App() {
  const [houses, setHouses] = useState<House[]>(initialHouses);

  const updatePoints = (houseName: string, points: number) => {
    setHouses(prevHouses =>
      prevHouses.map(house =>
        house.name === houseName
          ? { ...house, points: house.points + points }
          : house
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicDisplay houses={houses} />} />
        <Route path="/admin" element={<AdminPanel houses={houses} onUpdatePoints={updatePoints} />} />
      </Routes>
    </Router>
  );
}

export default App;
