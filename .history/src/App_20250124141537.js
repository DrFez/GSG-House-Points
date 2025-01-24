
import React, { useState } from 'react';
import PublicDisplay from './components/PublicDisplay';
import AdminPanel from './components/AdminPanel';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div>
      <h1>House Points Management</h1>
      <PublicDisplay />
      <button onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? 'Hide Admin Panel' : 'Show Admin Panel'}
      </button>
      {showAdmin && <AdminPanel />}
    </div>
  );
}

export default App;