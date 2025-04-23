import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import IndexPage from './pages/indexpage';
import ReviewPage from './pages/reviewpage';
import LoginSignup from './pages/LoginSignup';
import './App.css';
import ConfigurationPage from './pages/ConfigurationPage';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/config" element = {<ConfigurationPage />} />
      </Routes>
    </Router>
  );
}
 
export default App;