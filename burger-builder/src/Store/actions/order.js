import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from './actionTypes';

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

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = orderData => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const orderResponse = await axios.post('/orders.json', orderData);
      console.log('orderResponse', orderResponse);
      dispatch(purchaseBurgerSuccess(orderResponse.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
      console.log('error', error);
    }
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = error => {
  return {
    type: FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return { type: FETCH_ORDERS_START };
};

export const fetchOrders = () => {
  return async dispatch => {
    try {
      dispatch(fetchOrdersStart());
      const { data } = await axios.get('/orders.json');
      console.log('orders.data-----', data);
      const fetchedOrders = [];
      for (let key in data) {
        fetchedOrders.push({ ...data[key], id: key });
      }
      console.log('fetchedOrders-----', fetchedOrders);
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
};
