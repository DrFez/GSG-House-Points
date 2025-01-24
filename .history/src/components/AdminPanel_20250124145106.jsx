import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { houses } from "../constants/houses";
import { clauses } from "../constants/clauses";
import { updatePoints, addPointHistory } from "../services/points";
import ExportToExcel from "./ExportToExcel";
import ImportFromExcel from "./ImportFromExcel";

export default function AdminPanel({ setPoints, points }) {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(0);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [reason, setReason] = useState("");
  const [selectedClause, setSelectedClause] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [studentCount, setStudentCount] = useState(1);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleAddPoints = async () => {
    if (!selectedClause || !pointsToAdd || !reason) return;
    
    const result = await addPointHistory({
      houseIndex: selectedHouse,
      points: parseInt(pointsToAdd),
      clauseId: selectedClause.id,
      subCategory: selectedSubCategory?.name,
      event: selectedEvent,
      reason,
      studentCount: parseInt(studentCount),
      awardedBy: user.email
    });

    if (result.success) {
      setPointsToAdd(0);
      setReason("");
      setStudentCount(1);
    } else {
      setError("Failed to update points");
    }
  };

  if (!user) {
    return (
      <div className="admin-panel">
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

      <div className="data-controls">
        <ExportToExcel points={points} houses={houses} />
        <ImportFromExcel houses={houses} setPoints={setPoints} />
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