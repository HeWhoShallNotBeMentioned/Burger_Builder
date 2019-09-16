import reducer from './auth';

import { AUTH_SUCCESS } from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        { type: AUTH_SUCCESS, userId: 'TOMMY', idToken: 'some-token' }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'TOMMY',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
