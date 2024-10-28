import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Maintenance from './components/Maintenance/Maintenance';
import './App.css'
function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/maintenance" element={< Maintenance/>} />
        <Route path="/" element={< Maintenance/>} />
     </Routes>
    </div>
  );
}

export default App;
