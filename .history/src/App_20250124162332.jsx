import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState, useEffect } from 'react';
import PublicDisplay from './components/PublicDisplay';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import { getPoints } from './services/points';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes({ points, setPoints }) {
  return (
    <Routes>
      <Route path="/" element={<PublicDisplay points={points} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminPanel setPoints={setPoints} points={points} />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  const [points, setPoints] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      const fetchedPoints = await getPoints();
      setPoints(fetchedPoints);
      setLoading(false);
    };
    fetchPoints();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="container">
          <header>
            <h1>Great Southern Grammar House Points</h1>
          </header>
          <main>
            <AppRoutes points={points} setPoints={setPoints} />
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
