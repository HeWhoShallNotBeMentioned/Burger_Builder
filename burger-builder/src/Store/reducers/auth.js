import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
} from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return updatedObject(state, { error: null, loading: true });
    case AUTH_SUCCESS:
      return updatedObject(state, {
        error: null,
        loading: false,
        userId: action.userId,
        token: action.idToken,
      });
    case SET_AUTH_REDIRECT_PATH:
      return updatedObject(state, { authRedirectPath: action.path });
    case AUTH_LOGOUT:
      return updatedObject(state, { token: null, userId: null });
    case AUTH_FAIL:
      return updatedObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
