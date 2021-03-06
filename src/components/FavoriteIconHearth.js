import React, { useState, useContext, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { IconButton } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { favoriteIconStyle } from './CocktailCardDesign';
import FavoriteIcon from '@material-ui/icons/Favorite';
import apiService from './services/Api';

export default function FavoriteIconHearth(props) {
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [value, setValue] = useState(props.value);
  const cocktail = props.cocktail;

  useEffect(() => {
    const getCardValue = (cocktailName) => {
      if (props.value !== undefined) {
        setValue(value);
      } else {
          setValue(
              favorites.map((favorite) => favorite.strDrink).includes(cocktailName)
          );
      }
    };

    getCardValue(cocktail.strDrink);
  }, [favorites, cocktail.strDrink, value, props.value]);

  const onClickHeart = (e) => {
    if (value === false) {
      addFavorites(e);
    } else {
      deleteFavorite(e);
    }
  };

  const addFavorites = async (e) => {
    const cocktailData = {
      strDrink: cocktail.strDrink,
      idDrink: cocktail.idDrink,
      strDrinkThumb: cocktail.strDrinkThumb,
    };
    e.preventDefault();
    await apiService.addToFavourite(
      localStorage.getItem('token'),
      cocktailData
    );
    setValue(true);
    setFavorites((prevFavorites) => [...prevFavorites, cocktailData]);
  };

  const deleteFavorite = async (e) => {
    e.preventDefault();
    await apiService.deleteFromFavourite(
      localStorage.getItem('token'),
      cocktail.idDrink
    );
    setValue(false);
    const updatedFavorites = favorites.filter(
      (favCocktail) => favCocktail.idDrink !== cocktail.idDrink
    );
    setFavorites(updatedFavorites);
  };

  return (
    <IconButton
      onClick={(e) => {
        onClickHeart(e);
      }}
      name={cocktail.strDrink}
      value={value}
    >
      {' '}
      {value ? (
        <FavoriteIcon style={favoriteIconStyle} />
      ) : (
        <FavoriteBorderOutlinedIcon style={favoriteIconStyle} />
      )}
    </IconButton>
  );
}
