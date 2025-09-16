import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import ButtonPage from './pages/ButtonPage';
import AccordionPage from './pages/AccordionPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/buttons" replace />} />
            <Route path="/buttons" element={<ButtonPage />} />
            <Route path="/accordion" element={<AccordionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
