import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from '../actions/actionTypes';

import { updatedObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return updatedObject(state, { purchased: false });
    case PURCHASE_BURGER_START:
      return updatedObject(state, { loading: true });
    case PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case PURCHASE_BURGER_FAIL:
      return updatedObject(state, { loading: false });
    case FETCH_ORDERS_START:
      return updatedObject(state, { loading: true });
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case FETCH_ORDERS_FAIL:
      return updatedObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
