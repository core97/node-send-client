import {
  REGISTER_SUCESS,
  LOG_IN_SUCCESS,
  USER_AUTHENTICATED_SUCCESS,
  LOG_OUT,
  SET_LOADING_AUTH,
  SET_ERROR_AUTH,
} from 'types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING_AUTH:
      return {
        ...state,
        isLoadingAuth: action.payload.isLoadingAuth,
      };
    case SET_ERROR_AUTH:
      return {
        ...state,
        isLoadingAuth: action.payload.isLoadingAuth,
        errorAuth: action.payload.errorAuth,
      };
    case REGISTER_SUCESS:
    case USER_AUTHENTICATED_SUCCESS:
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token || state.token,
        isAuthenticated: action.payload.isAuthenticated,
        isLoadingAuth: action.payload.isLoadingAuth,
        errorAuth: action.payload.errorAuth,
      };
    case LOG_OUT:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        isLoadingAuth: action.payload.isLoadingAuth,
        errorAuth: action.payload.errorAuth,
      };
    default:
      return state;
  }
};

export default reducer;
