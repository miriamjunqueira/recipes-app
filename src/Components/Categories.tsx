import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFoodsCategories, getDrinksCategories } from '../Services/API';

function Categories() {
  const { pathname } = useLocation();

  const [foodCategories, setFoodCategories] = useState<string[]>([]);
  const [drinkCategories, setDrinkCategories] = useState<string[]>([]);
  let categoriasExibicao: string[] = ([]);

  useEffect(() => {
    async function buscaCategorias() {
      const foodsCat = await getFoodsCategories();
      setFoodCategories(foodsCat);

      const drinksCat = await getDrinksCategories();
      setDrinkCategories(drinksCat);
    }
    buscaCategorias();
  }, []);

  if (pathname === '/meals') {
    categoriasExibicao = foodCategories;
  } else if (pathname === '/drinks') {
    categoriasExibicao = drinkCategories;
  }

  return (
    <div>
      { categoriasExibicao.map((categoria, index) => {
        return (
          <span
            key={ index }
          >
            <button
              className="category-btn"
              data-testid={ `${categoria}-category-filter` }
            >
              {categoria}
            </button>
          </span>
        );
      })}
    </div>
  );
}
export default Categories;
