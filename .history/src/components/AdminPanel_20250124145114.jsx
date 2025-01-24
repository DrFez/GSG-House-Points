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
          <label>Select Clause</label>
          <select 
            value={selectedClause?.id || ""}
            onChange={(e) => {
              const clause = clauses.find(clause => clause.id === e.target.value);
              setSelectedClause(clause);
              setSelectedSubCategory(null);
              setSelectedEvent(null);
            }}
          >
            <option value="" disabled>Select a clause</option>
            {clauses.map(clause => (
              <option key={clause.id} value={clause.id}>{clause.name}</option>
            ))}
          </select>
        </div>

        {selectedClause && selectedClause.subCategories && (
          <div className="form-group">
            <label>Select Sub-Category</label>
            <select 
              value={selectedSubCategory?.name || ""}
              onChange={(e) => {
                const subCategory = selectedClause.subCategories.find(sub => sub.name === e.target.value);
                setSelectedSubCategory(subCategory);
                setSelectedEvent(null);
              }}
            >
              <option value="" disabled>Select a sub-category</option>
              {selectedClause.subCategories.map(sub => (
                <option key={sub.name} value={sub.name}>{sub.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedSubCategory && selectedSubCategory.events && (
          <div className="form-group">
            <label>Select Event</label>
            <select 
              value={selectedEvent || ""}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="" disabled>Select an event</option>
              {selectedSubCategory.events.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          </div>
        )}

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

        <div className="form-group">
          <label>Number of Students</label>
          <input
            type="number"
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
            placeholder="Enter number of students"
          />
        </div>

        <button 
          onClick={handleAddPoints}
          disabled={!selectedClause || !pointsToAdd || !reason}
        >
          Award Points
        </button>
      </div>
    </div>
  );
}