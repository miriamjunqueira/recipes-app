import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import Layout from './Components/Layout';
import Profile from './Pages/Profile/Profile';
import Recipes from './Components/Recipes/Recipes';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Recipes /> } />
        <Route path="/drinks" element={ <Recipes /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <Recipes /> } />
        <Route path="/favorite-recipes" element={ <Recipes /> } />
      </Route>

      <Route path="/" element={ <Login /> } />
      <Route path="/meals/:id-da-receita" element={ <Recipes /> } />
      <Route path="/drinks/:id-da-receita" element={ <Recipes /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <Recipes /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <Recipes /> } />
      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id" element={ <RecipeDetails /> } />
    </Routes>
  );
}

export default App;
