// Autenticación
export const REGISTER_SUCESS = 'REGISTER_SUCESS';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const USER_AUTHENTICATED_SUCCESS = 'USER_AUTHENTICATED_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const SET_LOADING_AUTH = 'SET_LOADING_AUTH';
export const SET_ERROR_AUTH = 'SET_ERROR_AUTH';
// Archivos y enlaces
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
export const SET_LOADING_FILE = 'SET_LOADING_FILE';
export const SET_LOADING_LINK = 'SET_LOADING_LINK';
export const SET_ERROR_FILE = 'SET_ERROR_FILE';
export const SET_ERROR_LINK = 'SET_ERROR_LINK';
export const CREATE_ALERT_FILE = 'CREATE_ALERT_FILE';
export const RESET_FILE_AND_LINK = 'RESET_FILE_AND_LINK';

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
      token: null,
      isAuthenticated: false,
      isLoadingAuth: false,
      errorAuth: null,
      user: { email: null, name: null },
    },
  };
};

export const setLoadingAuth = (isLoading) => {
  return {
    type: SET_LOADING_AUTH,
    payload: { isLoadingAuth: isLoading },
  };
};

export const setErrorAuth = (error) => {
  return {
    type: SET_ERROR_AUTH,
    payload: { errorAuth: error, isLoadingAuth: false },
  };
};

export const uploadFileSuccess = (filename, originalFilename) => {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload: {
      filename,
      originalFilename,
      isLoadingFile: false,
      errorFile: null,
    },
  };
};

export const createLinkSuccess = (url) => {
  return {
    type: CREATE_LINK_SUCCESS,
    payload: {
      urlFile: url,
      errorLink: null,
      isLoadingLink: false,
    },
  };
};

export const setLoadingFile = (isLoading) => {
  return {
    type: SET_LOADING_FILE,
    payload: {
      isLoadingFile: isLoading,
    },
  };
};

export const setLoadingLink = (isLoading) => {
  return {
    type: SET_LOADING_LINK,
    payload: {
      isLoadingLink: isLoading,
    },
  };
};

export const setErrorFile = () => {
  return {
    type: SET_ERROR_FILE,
    payload: {
      error: error.message,
      isLoadingFile: false,
    },
  };
};

export const setErrorLink = (error) => {
  return {
    type: SET_ERROR_LINK,
    payload: {
      error: error,
      isLoadingLink: false,
    },
  };
};

export const resetFileAndLink = () => {
  return {
    type: RESET_FILE_AND_LINK,
    payload: {
      filename: null,
      originalFilename: null,
      availableDownloads: 1,
      passwordFile: null,
      autorFile: null,
      urlFile: null,
      errorFile: null,
      isLoadingFile: false,
      errorLink: null,
      isLoadingLink: false,
    },
  };
};
