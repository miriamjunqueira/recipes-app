import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}

export default App;
