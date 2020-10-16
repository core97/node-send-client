import {
  UPLOAD_FILE_SUCCESS,
  CREATE_LINK_SUCCESS,
  SET_LOADING_FILE,
  SET_LOADING_LINK,
  SET_ERROR_FILE,
  SET_ERROR_LINK,
  CREATE_ALERT_FILE,
} from 'types';

const reducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        filename: action.payload.filename,
        originalFilename: action.payload.originalFilename,
        isLoadingFile: action.payload.isLoadingFile,
        errorFile: action.payload.errorFile,
      };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        urlFile: action.payload.urlFile,
        isLoadingLink: action.payload.isLoadingFile,
        errorLink: action.payload.errorFile,
      };
    case SET_LOADING_FILE: {
      return {
        ...state,
        isLoadingFile: action.payload.isLoadingFile,
      };
    }
    case SET_LOADING_LINK:
      return {
        ...state,
        isLoadingLink: action.payload.isLoadingLink,
      };
    case SET_ERROR_FILE:
      return {
        ...state,
        errorFile: action.payload.error,
        isLoadingFile: action.payload.isLoadingFile,
      };
    case SET_ERROR_LINK:
      return {
        ...state,
        errorLink: action.payload.error,
        isLoadingLink: action.payload.isLoadingLink,
      };
    case CREATE_ALERT_FILE:
      return {
        ...state,
        errorFile: action.payload.alertFile,
      };
    default:
      return state;
  }
};

export default reducer;
