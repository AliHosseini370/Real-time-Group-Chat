import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Chat from '../components/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Login />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
}

export default App;
