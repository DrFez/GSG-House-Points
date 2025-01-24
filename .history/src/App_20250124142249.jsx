import { useState } from 'react'
import './App.css'
import PublicDisplay from './components/PublicDisplay';
import AdminPanel from './components/AdminPanel';

function App() {
  const [points, setPoints] = useState([0, 0, 0, 0]);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="container">
      <header>
        <h1>Hogwarts House Points</h1>
        <button onClick={() => setShowAdmin(!showAdmin)}>
          {showAdmin ? 'Show Public Display' : 'Admin Panel'}
        </button>
      </header>
      <main>
        {showAdmin ? (
          <AdminPanel setPoints={setPoints} />
        ) : (
          <PublicDisplay points={points} />
        )}
      </main>
    </div>
  )
}

export default App
