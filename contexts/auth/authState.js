import { useReducer } from 'react';
import { useRouter } from 'next/router';
import authContext from './authContext';
import authReducer from './authReducer';
import {
  registerSucess,
  logInSuccess,
  userAuthenticatedSuccess,
  logOut,
  setLoadingAuth,
  setErrorAuth,
} from 'types';
import {
  registerUserAPI,
  logInUserAPI,
  userAuthenticatedAPI,
} from 'services/user';

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
  isAuthenticated: false,
  user: {
    name: typeof window !== 'undefined' ? localStorage.getItem('name') : '',
    email: typeof window !== 'undefined' ? localStorage.getItem('email') : '',
  },
  isLoadingAuth: false,
  errorAuth: null,
};

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  const registerUser = async (user) => {
    try {
      dispatch(setLoadingAuth());

      const { email, name, token } = await registerUserAPI(user);

      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);

      dispatch(registerSucess({ email, name, token }));

      router.push('/');
    } catch (error) {
      dispatch(setErrorAuth(error.message));
    }
  };

  // Autenticar usuarios
  const logInUser = async (user) => {
    try {
      dispatch(setLoadingAuth());
      const { email, name, token } = await logInUserAPI(user);

      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);

      dispatch(logInSuccess({ email, name, token }));

      router.push('/');
    } catch (error) {
      dispatch(setErrorAuth(error.message));
    }
  };

  const logOutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    dispatch(logOut());
  };

  const userAuthenticated = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        dispatch(setLoadingAuth());

        const { user } = await userAuthenticatedAPI(token);
        const { email, name } = user;

        console.log('AUTHENTICATED')
        console.log(user)
        console.log(email)
        console.log(name)

        dispatch(userAuthenticatedSuccess({ email, name }));

      } catch (error) {
        if (error.message === 'Token no válido') {
          console.log('No valid token');
        } else {
          dispatch(setErrorAuth(error.message));
        }
      }
    }
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        isLoadingAuth: state.isLoadingAuth,
        errorAuth: state.errorAuth,
        registerUser,
        logInUser,
        logOutUser,
        userAuthenticated,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
