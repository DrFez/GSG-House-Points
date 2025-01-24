import { useState } from "react";
import { adminPassword } from "../constants/adminPassword";
import { houses } from "../constants/houses";
import { clauses } from "../constants/clauses";

export default function AdminPanel({ setPoints }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [inputPw, setInputPw] = useState("");
  const [clauseIndex, setClauseIndex] = useState(0);
  const [selectedHouse, setSelectedHouse] = useState(0);

  function login() {
    if (inputPw === adminPassword) setLoggedIn(true);
  }

  function addPoints() {
    // Example: add the first place points of the chosen clause/house
    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[selectedHouse] += clauses[clauseIndex].points[0] || 0;
      return newPoints;
    });
  }

  if (!loggedIn) {
    return (
      <div className="admin-panel">
        <h2>Admin Login</h2>
        <div style={{ margin: '2rem 0' }}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            onChange={(e) => setInputPw(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Manage House Points</h2>
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
        <select onChange={(e) => setSelectedHouse(e.target.value)}>
          {houses.map((h, idx) => (
            <option key={h.name} value={idx}>{h.name}</option>
          ))}
        </select>
        <select onChange={(e) => setClauseIndex(e.target.value)}>
          {clauses.map((c, idx) => (
            <option key={c.id} value={idx}>{c.name}</option>
          ))}
        </select>
        <button onClick={addPoints}>Award Points</button>
      </div>
    </div>
  );
}