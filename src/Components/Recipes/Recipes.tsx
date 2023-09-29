import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { an } from 'vitest/dist/types-e3c9754d';
import UserContext, { DrinksType, MealsType } from '../../Context/UserContext';
import { getFoodsCategories,
  getDrinksCategories,
  ReceitasPorCategoria } from '../../Services/API';

export default function Recipes() {
  const { foodInfos, drinksInfos } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [foodCategories, setFoodCategories] = useState<string[]>([]);
  const [drinkCategories, setDrinkCategories] = useState<string[]>([]);
  const [recipesToDisplay, setRecipesToDisplay] = useState<MealsType[] |
  DrinksType[]>([]);
  let categoriasExibicao: string[] = ([]);
  const [exibicaoPadrao, setExibicaoPadrao] = useState<MealsType[] | DrinksType[]>([]);
  const [clicked, setclicked] = useState(false);

  useEffect(() => {
    // Categories:
    async function buscaCategorias() {
      const foodsCat = await getFoodsCategories();
      setFoodCategories(foodsCat);

      const drinksCat = await getDrinksCategories();
      setDrinkCategories(drinksCat);
    }
    buscaCategorias();

    // Renderização inicial:
    if (pathname === '/meals') {
      setRecipesToDisplay(foodInfos.slice(0, 12));
      setExibicaoPadrao(foodInfos.slice(0, 12));
    } else if (pathname === '/drinks') {
      setRecipesToDisplay(drinksInfos.slice(0, 12));
      setExibicaoPadrao(drinksInfos.slice(0, 12));
    }
  }, [foodInfos, drinksInfos, pathname]);

  if (pathname === '/meals') {
    categoriasExibicao = foodCategories;
  } else if (pathname === '/drinks') {
    categoriasExibicao = drinkCategories;
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

    let retorno: MealsType[] | DrinksType[] = [];
    if (pathname === '/meals') {
      retorno = await ReceitasPorCategoria(
        'themealdb',
        'filter.php?c',
        `${categoria}`,
        'meals',
      );
    } else if (pathname === '/drinks') {
      retorno = await ReceitasPorCategoria(
        'thecocktaildb',
        'filter.php?c',
        `${categoria}`,
        'drinks',
      );
    }
    if (clicked === false) {
      setRecipesToDisplay(retorno);
      setclicked(true);
    } else if (clicked === true) {
      setRecipesToDisplay(exibicaoPadrao);
      setclicked(false);
    }
  }

  function handleDeleteFilters() {
    setRecipesToDisplay(exibicaoPadrao);
  }

  function handleDetails(event:any) {
    const receita = event.target.id;
    navigate(`${pathname}/${receita}`);
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
          <button
            data-testid="All-category-filter"
            className="category-btn"
            onClick={ handleDeleteFilters }
          >
            All
          </button>
        </div>

        {pathname === '/meals'
        && (recipesToDisplay as MealsType[]).map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe.idMeal }
            className="recipe-card"
            id={ recipe.idMeal }
            onClick={ handleDetails }
            aria-hidden="true"
          >
            <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ `foto sobre ${recipe.strMeal}` }
              width={ 80 }
            />
            <a
              href={ `/meals/${recipe.idMeal}` }
              className="btn btn-primary"
              id="details-btn"
            >
              Detalhes
            </a>
          </div>
        ))}

        {pathname === '/drinks'
        && (recipesToDisplay as DrinksType[]).map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe.idDrink }
            className="recipe-card"
            id={ recipe.idDrink }
            onClick={ handleDetails }
            aria-hidden="true"
          >
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
