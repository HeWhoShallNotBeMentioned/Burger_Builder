import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
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
    case AUTH_FAIL:
      return updatedObject(state, { error: true, loading: false });
    default:
      return state;
  }
};

export default reducer;
