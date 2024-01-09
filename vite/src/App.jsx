// App.js

import React from 'react';
import Login from './Login';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
      {/* <Login /> */}
    </div>
  );
}

export default App;
