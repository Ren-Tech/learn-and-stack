import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Primary from './pages/Primary';
import Preschool from './pages/Preschool';
import ElevenPlus from './pages/ElevenPlus';
import GCSEs from './pages/GCSEs';
import ALevels from './pages/ALevels';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/primary" element={<Primary />} />
          <Route path="/preschool" element={<Preschool />} />
          <Route path="/11plus" element={<ElevenPlus />} />
          <Route path="/gcses" element={<GCSEs />} />
          <Route path="/alevels" element={<ALevels />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;