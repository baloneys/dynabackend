// src/app.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './style.css';

// Minimal placeholder components
const Home = () => <h1 style={{ padding: '2rem' }}>Home Page</h1>;
const VRCDynamicPlayerTags = () => <h1 style={{ padding: '2rem' }}>VRCDynamicPlayerTags Page</h1>;
const NotFound = () => <h1 style={{ padding: '2rem' }}>404 Not Found</h1>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vrc-dynamic-player-tags" element={<VRCDynamicPlayerTags />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// Mount React app
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
