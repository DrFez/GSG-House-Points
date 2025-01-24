import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { houses } from "../constants/houses";
import { clauses } from "../constants/clauses";

export default function AdminPanel({ setPoints }) {
  const { user, signInWithGoogle, logout } = useAuth();
  const [selectedHouse, setSelectedHouse] = useState(0);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [reason, setReason] = useState("");

  const handleAddPoints = () => {
    if (!pointsToAdd || !reason) return;
    
    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[selectedHouse] += parseInt(pointsToAdd);
      return newPoints;
    });

    // Here you would typically also save to Firebase
    setPointsToAdd(0);
    setReason("");
  };

  if (!user) {
    return (
      <div className="admin-panel">
        <h2>Admin Access Required</h2>
        <p>Please sign in with your school Google account to manage points.</p>
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
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