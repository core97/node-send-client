import { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import { uploadFileAPI } from 'services/file';
import { createLinkAPI } from 'services/link';
import {
  uploadFileSuccess,
  createLinkSuccess,
  setErrorFile,
  setErrorLink,
  setLoadingFile,
  setLoadingLink,
  CREATE_ALERT_FILE
} from 'types';

const initialState = {
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
};

const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const uploadFile = async (formData, originalFilename, token) => {
    try {
      dispatch(setLoadingFile(true));

      const { filename } = await uploadFileAPI(formData, token);

      dispatch(uploadFileSuccess(filename, originalFilename));
    } catch (error) {
      dispatch(setErrorFile(error.message));
    }
  };

  const createLink = async (token) => {
    const data = {
      filename: state.filename,
      originalFilename: state.originalFilename,
      availableDownloads: state.availableDownloads,
      passwordFile: state.passwordFile,
      autorFile: state.autorFile,
    };

    try {
      dispatch(setLoadingLink(true));

      const { url } = await createLinkAPI(data, token);

      dispatch(createLinkSuccess(url));
    } catch (error) {
      dispatch(setErrorLink(error.message));
    }
  };

  const createAlertFile = (alertFile) => {
    dispatch({
      type: CREATE_ALERT_FILE,
      payload: { alertFile }
    });
  };

  return (
    <appContext.Provider
      value={{
        filename: state.filename,
        originalFilename: state.originalFilename,
        isLoadingFile: state.isLoadingFile,
        errorFile: state.errorFile,
        availableDownloads: state.availableDownloads,
        passwordFile: state.passwordFile,
        autorFile: state.autorFile,
        urlFile: state.urlFile,
        uploadFile,
        createLink,
        createAlertFile
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;