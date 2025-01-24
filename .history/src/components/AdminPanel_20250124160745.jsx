import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { houses } from "../constants/houses";
import { clauses, categories } from "../constants/clauses";
import { updatePoints, addPointHistory, getPointsHistory } from "../services/points";
import ExportToExcel from "./ExportToExcel";
import '../styles/AdminPanel.css';
import { Link } from 'react-router-dom';

export default function AdminPanel({ setPoints, points }) {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(0);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [selectedClause, setSelectedClause] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [studentCount, setStudentCount] = useState(1);
  const [placementSelections, setPlacementSelections] = useState({});
  const [pointsHistory, setPointsHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getPointsHistory();
      setPointsHistory(history);
    };
    if (user) {
      fetchHistory();
    }
  }, [user]);

  // Helper function to determine if a clause is a competition
  const isCompetitionClause = (clause) => {
    return clause?.points.length > 1;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleAddPoints = async () => {
    if (!selectedClause) return;
    setError("");
    setSuccessMessage("");

    try {
      if (isCompetitionClause(selectedClause)) {
        // Validate that all houses have been assigned a unique placement
        const placements = Object.values(placementSelections);
        if (placements.length !== houses.length || new Set(placements).size !== houses.length) {
          setError("Please assign a unique placement to each house");
          return;
        }

        // Process each house's placement and points
        for (let houseIndex = 0; houseIndex < houses.length; houseIndex++) {
          const placement = placementSelections[houseIndex];
          const points = selectedClause.points[placement - 1]; // -1 because placements are 1-based

          const result = await addPointHistory({
            houseIndex,
            points,
            clauseId: selectedClause.id,
            reason: `${selectedClause.name} - ${placement}${getOrdinalSuffix(placement)} Place`,
            studentCount: 1,
            awardedBy: user.email,
            ...(selectedSubCategory && { subCategory: selectedSubCategory.name }),
            ...(selectedEvent && { event: selectedEvent })
          });

          if (!result.success) {
            throw new Error(result.error);
          }
        }

        setSuccessMessage("Competition points awarded successfully!");
        setPlacementSelections({});
      } else {
        // Handle per-student points
        if (!studentCount || studentCount < 1) {
          setError("Please enter a valid number of students");
          return;
        }

        const totalPoints = selectedClause.points[0] * studentCount;
        const result = await addPointHistory({
          houseIndex: selectedHouse,
          points: totalPoints,
          clauseId: selectedClause.id,
          reason: `${selectedClause.name} - ${studentCount} student${studentCount > 1 ? 's' : ''}`,
          studentCount: parseInt(studentCount),
          awardedBy: user.email,
          ...(selectedSubCategory && { subCategory: selectedSubCategory.name }),
          ...(selectedEvent && { event: selectedEvent })
        });

        if (!result.success) {
          throw new Error(result.error);
        }

        setSuccessMessage("Points awarded successfully!");
        setStudentCount(1);
      }

      // Reset selections after successful update
      setSelectedClause(null);
      setSelectedSubCategory(null);
      setSelectedEvent(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Helper function for ordinal suffixes (1st, 2nd, 3rd, 4th)
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
          <Link to="/" className="return-btn">Return to Public View</Link>
          <span>{user.email}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="data-controls">
        <ExportToExcel pointsHistory={pointsHistory} houses={houses} />
      </div>

      <div className="points-form">
        <div className="form-group">
          <label>Select Clause</label>
          <select 
            value={selectedClause?.id || ""}
            onChange={(e) => {
              const clause = clauses.find(clause => clause.id === e.target.value);
              setSelectedClause(clause);
              setSelectedSubCategory(null);
              setSelectedEvent(null);
              setPlacementSelections({});  // Reset placements when clause changes
            }}
          >
            <option value="" disabled>Select a clause</option>
            {groupedClauses.map(group => (
              group.items.length > 0 && (
                <optgroup key={group.category} label={group.category}>
                  {group.items.map(clause => (
                    <option key={clause.id} value={clause.id}>
                      {clause.name}
                    </option>
                  ))}
                </optgroup>
              )
            ))}
          </select>
        </div>

        {selectedClause && !isCompetitionClause(selectedClause) && (
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
        )}

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

        {selectedClause && (
          isCompetitionClause(selectedClause) ? (
            <div className="competition-placements">
              <h3>Assign Placements for {selectedClause.name}</h3>
              {houses.map((house, idx) => (
                <div key={house.name} className="form-group">
                  <label>{house.name}</label>
                  <select
                    value={placementSelections[idx] || ""}
                    onChange={(e) => setPlacementSelections({
                      ...placementSelections,
                      [idx]: Number(e.target.value)
                    })}
                  >
                    <option value="">Select placement</option>
                    {[1, 2, 3, 4].map(place => (
                      <option key={place} value={place}>
                        {place}{getOrdinalSuffix(place)} Place ({selectedClause.points[place-1]} points)
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ) : (
            selectedHouse !== null && (
              <div className="form-group">
                <label>How many {houses[selectedHouse].name} Students?</label>
                <input
                  type="number"
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  min="1"
                  placeholder="Enter number of students"
                />
                <div className="points-preview">
                  Points per student: {selectedClause.points[0]}
                  {studentCount > 0 && (
                    <> | Total points: {selectedClause.points[0] * studentCount}</>
                  )}
                </div>
              </div>
            )
          )
        )}

        <button 
          onClick={handleAddPoints}
          disabled={!selectedClause || (
            isCompetitionClause(selectedClause) 
              ? Object.keys(placementSelections).length !== houses.length
              : !studentCount || selectedHouse === null
          )}
        >
          Award Points
        </button>
      </div>
    </div>
  );
}