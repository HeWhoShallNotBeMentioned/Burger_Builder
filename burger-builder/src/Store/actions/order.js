import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL } from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = orderData => {
  return async dispatch => {
    try {
      const orderResponse = await axios.post('/orders.json', orderData);
      console.log('orderResponse', orderResponse);
      dispatch(purchaseBurgerSuccess(orderResponse, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
      console.log('error', error);
    }
  };
};
