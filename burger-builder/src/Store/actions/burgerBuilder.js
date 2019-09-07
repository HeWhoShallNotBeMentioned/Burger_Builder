import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from './actionTypes';

import axios from '../../axios-orders';

export const addIngredient = name => {
  return { type: ADD_INGREDIENT, ingredientName: name };
};

export const removeIngredient = name => {
  return { type: REMOVE_INGREDIENT, ingredientName: name };
};

export const setIngredients = ingredients => {
  return { type: SET_INGREDIENTS, ingredients: ingredients };
};

export const fetchIngredientsFailed = () => {
  return { type: FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/ingredients.json');
      dispatch(setIngredients(data));
    } catch (error) {
      console.log(error);
      dispatch(fetchIngredientsFailed());
    }
  };
};
