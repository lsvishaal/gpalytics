import React from 'react';
import { BrowserRouter as Router, Routes, Route } from '';
import Registration from './components/ui/Registration';
import SignIn from './components/ui/Signin';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
