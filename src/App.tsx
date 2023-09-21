import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import Meals from './Pages/Meals/Meals';
import Layout from './Components/Layout';

function App() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Meals /> } />
        <Route path="/profile" element={ <Meals /> } />
        <Route path="/done-recipes" element={ <Meals /> } />
        <Route path="/favorite-recipes" element={ <Meals /> } />
      </Route>

      <Route path="/" element={ <Login /> } />
      <Route path="/meals/:id-da-receita" element={ <Meals /> } />
      <Route path="/drinks/:id-da-receita" element={ <Meals /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <Meals /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <Meals /> } />
    </Routes>
  );
}

export default App;
