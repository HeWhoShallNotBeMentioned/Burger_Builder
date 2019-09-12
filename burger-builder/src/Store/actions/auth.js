import axios from 'axios';

import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './actionTypes';

require('dotenv').config();

export const authStart = () => {
  return { type: AUTH_START };
};

export const authSuccess = authData => {
  return {
    type: AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const fetchAuth = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const { data } = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzONL_c7wZAIqQIEk3dBqwzGaUl0VT8pg',
        //process.env.FIREBASE_API_KEY,
        authData
      );
      console.log('auth data from firebase   ', data);
      dispatch(authSuccess(data));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};
