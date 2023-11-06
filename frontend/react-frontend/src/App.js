import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Reset from './components/Reset';
import Profile from './components/Profile';
import VoteHistory from './components/VoteHistory';
import SurveyHistory from './components/SurveyHistory';
import Create from './components/Create';
import Vote from './components/Vote';
import Settings from './components/Settings';
import Report from './components/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vhistory" element={<VoteHistory />} />
        <Route path="/shistory" element={<SurveyHistory />} />
        <Route path="/create" element={<Create />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;