import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext, { DrinksType, MealsType } from '../../Context/UserContext';
import { getFoodsCategories,
  getDrinksCategories,
  ReceitasPorCategoria } from '../../Services/API';

export default function Recipes() {
  const { foodInfos, drinksInfos } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Categories:
  const [foodCategories, setFoodCategories] = useState<string[]>([]);
  const [drinkCategories, setDrinkCategories] = useState<string[]>([]);
  const [listaPorCategoria, setListaPorCategoria] = useState
  <MealsType[] | DrinksType[]>([]);
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

  // Renderização inicial:
  let recipesToDisplay: MealsType[] | DrinksType[] = [];
  if (pathname === '/meals') {
    recipesToDisplay = foodInfos.slice(0, 12);
  } else if (pathname === '/drinks') {
    recipesToDisplay = drinksInfos.slice(0, 12);
  }

  // Retorno de um único elemento:
  if (pathname === '/meals' && foodInfos.length === 1) {
    navigate(`${pathname}/${foodInfos[0].idMeal}`);
  }
  if (pathname === '/drinks' && drinksInfos.length === 1) {
    navigate(`${pathname}/${foodInfos[0].idDrink}`);
  }

  async function handleClick(event: any) {
    event.preventDefault();
    const categoria = event.target.id;

    console.log('handleclick!');

    const retorno = await ReceitasPorCategoria(
      'themealdb',
      'filter.php?c',
      `${categoria}`,
    );
    setListaPorCategoria(retorno);

    console.log('lista por categoria após handleclick:');
    console.log(listaPorCategoria);
  }

  if (recipesToDisplay.length !== null) {
    return (
      <div>

        <div>
          { categoriasExibicao.map((categoria, index) => {
            return (
              <span
                key={ index }
              >
                <button
                  className="category-btn"
                  data-testid={ `${categoria}-category-filter` }
                  id={ categoria }
                  onClick={ handleClick }
                >
                  {categoria}
                </button>
              </span>
            );
          })}
        </div>

        {(pathname === '/meals' && listaPorCategoria.length <= 0) ?
        && (recipesToDisplay as MealsType[]).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
            <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ `foto sobre ${recipe.strMeal}` }
              width={ 80 }
            />
          </div>
        ))}

        {pathname === '/drinks'
        && (recipesToDisplay as DrinksType[]).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
            <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ `foto sobre ${recipe.strDrink}` }
              width={ 80 }
            />
          </div>
        ))}
      </div>
    );
  }
}
