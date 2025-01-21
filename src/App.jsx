import { useState } from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Login from './components/Login';
    import Register from './components/Register';
    import Dashboard from './components/Dashboard';

    export default function App() {
      const [user, setUser] = useState(null);

      return (
        <div className="app">
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </Routes>
        </div>
      );
    }
