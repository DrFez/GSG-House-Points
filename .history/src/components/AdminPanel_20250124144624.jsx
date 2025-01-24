import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { houses } from "../constants/houses";
import { updatePoints, addPointHistory } from "../services/points";
import ExportToExcel from "./ExportToExcel";
import ImportFromExcel from "./ImportFromExcel";

export default function AdminPanel({ setPoints, points }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(0);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [reason, setReason] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleAddPoints = async () => {
    if (!pointsToAdd || !reason) return;
    
    const newPoints = [...points];
    newPoints[selectedHouse] += parseInt(pointsToAdd);
    
    // Update Firebase
    const result = await updatePoints(selectedHouse, newPoints[selectedHouse]);
    if (result.success) {
      setPoints(newPoints);
      // Add to history
      await addPointHistory(
        selectedHouse,
        parseInt(pointsToAdd),
        reason,
        user.email
      );
      
      setPointsToAdd(0);
      setReason("");
    } else {
      setError("Failed to update points");
    }
  };

  if (!user) {
    return (
      <div className="admin-panel">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>House Points Management</h2>
        <div className="user-info">
          <img src={user.photoURL} alt="" className="avatar" />
          <span>{user.email}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="points-form">
        <div className="form-group">
          <label>Select House</label>
          <select 
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(Number(e.target.value))}
          >
            {houses.map((house, idx) => (
              <option key={house.name} value={idx}>{house.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Points</label>
          <input
            type="number"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(e.target.value)}
            placeholder="Enter points"
          />
        </div>

        <div className="form-group">
          <label>Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for points"
          />
        </div>

        <button 
          onClick={handleAddPoints}
          disabled={!pointsToAdd || !reason}
        >
          Award Points
        </button>
      </div>
    </div>
  );
}