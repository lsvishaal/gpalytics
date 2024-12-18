import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/ui/Registration';
import SignIn from './components/ui/Signin';
import Landing from './components/ui/Landing';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <Router>
        <Routes>
          
          <Route path="/" element={<Landing />} />
          <Route path="/Reg" element={<Registration />} />
          <Route path="/Signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
