import { useState } from 'react';
import { House } from '../constants/houses';
import { clauses } from '../constants/clauses';
import { ADMIN_PASSWORD } from '../constants/config';
import './AdminPanel.css';

interface Props {
  houses: House[];
  onUpdatePoints: (houseName: string, points: number) => void;
}

function AdminPanel({ houses, onUpdatePoints }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedClause, setSelectedClause] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const [points, setPoints] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedHouse && points) {
      onUpdatePoints(selectedHouse, points);
      setSelectedHouse('');
      setPoints(0);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Update House Points</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedClause}
          onChange={(e) => setSelectedClause(e.target.value)}
          required
        >
          <option value="">Select Clause</option>
          {clauses.map(clause => (
            <option key={clause.id} value={clause.id}>
              {clause.name}
            </option>
          ))}
        </select>

        <select
          value={selectedHouse}
          onChange={(e) => setSelectedHouse(e.target.value)}
          required
        >
          <option value="">Select House</option>
          {houses.map(house => (
            <option key={house.name} value={house.name}>
              {house.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          placeholder="Points"
          required
        />

        <button type="submit">Add Points</button>
      </form>
    </div>
  );
}

export default AdminPanel;
