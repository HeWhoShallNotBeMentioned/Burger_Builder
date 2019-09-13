import axios from 'axios';

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from './actionTypes';

require('dotenv').config();

export const authStart = () => {
  return { type: AUTH_START };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = expTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }),
      expTime * 1000;
  };
};

export const fetchAuth = (email, password, isSignUp) => {
  return async dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      process.env.FIREBASE_API_KEY;
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        process.env.FIREBASE_API_KEY;
    }
    try {
      const { data } = await axios.post(url, authData);
      console.log('auth data from firebase   ', data);
      dispatch(authSuccess(data.idToken, data.localId));

      dispatch(checkAuthTimeout(data.expiresIn));
    } catch (error) {
      console.log('error auth fail', error.response.data.error);
      dispatch(authFail(error.response.data.error));
    }
  };
};
