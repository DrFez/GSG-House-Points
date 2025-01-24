import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PublicDisplay from './components/PublicDisplay';
import AdminPanel from './components/AdminPanel';

function App() {
  const [count, setCount] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0]);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <>
      <div>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
