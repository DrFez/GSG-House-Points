import { useState, useEffect } from 'react'
import './App.css'
import PublicDisplay from './components/PublicDisplay';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import { getPoints } from './services/points';

function App() {
  const [points, setPoints] = useState([0, 0, 0, 0]);
  const [showAdmin, setShowAdmin] = useState(false);
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
    <AuthProvider>
      <div className="container">
        <header>
}

export default App;
