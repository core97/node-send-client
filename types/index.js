// Autenticación
export const REGISTER_SUCESS = 'REGISTER_SUCESS';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const USER_AUTHENTICATED_SUCCESS = 'USER_AUTHENTICATED_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const SET_LOADING_AUTH = 'SET_LOADING_AUTH';
export const SET_ERROR_AUTH = 'SET_ERROR_AUTH';

export const registerSucess = ({ email, name, token }) => {
  return {
    type: REGISTER_SUCESS,
    payload: {
      token,
      isAuthenticated: true,
      isLoadingAuth: false,
      errorAuth: null,
      user: { email, name },
    },
  };
};

export const logInSuccess = ({ email, name, token }) => {
  return {
    type: LOG_IN_SUCCESS,
    payload: {
      token,
      isAuthenticated: true,
      isLoadingAuth: false,
      errorAuth: null,
      user: { email, name },
    },
  };
};

export const userAuthenticatedSuccess = ({ email, name }) => {
  return {
    type: USER_AUTHENTICATED_SUCCESS,
    payload: {
      isAuthenticated: true,
      isLoadingAuth: false,
      errorAuth: null,
      user: { email, name },
    },
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
    payload: {
      token: '',
      isAuthenticated: false,
      isLoadingAuth: false,
      errorAuth: null,
      user: { email: '', name: '' },
    },
  };
};

export const setLoadingAuth = () => {
  return {
    type: SET_LOADING_AUTH,
    payload: { isLoadingAuth: true },
  };
};

export const setErrorAuth = (error) => {
  return {
    type: SET_ERROR_AUTH,
    payload: { errorAuth: error, isLoadingAuth: false },
  };
};
