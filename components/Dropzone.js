import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileAPI } from 'services/file';
import authContext from 'contexts/auth/authContext';
import appContext from 'contexts/app/appContext';

export const Dropzone = () => {
  const AuthContext = useContext(authContext);
  const AppContext = useContext(appContext);
  const { token } = AuthContext;
  const { isLoadingFile, createAlertFile, uploadFile, createLink } = AppContext;

  const onDropRejected = useCallback(() => {
    createAlertFile(
      'No se pudo subir el archivo el límite es 1 MB, obtén una cuenta para subir archivos más grandes.'
    );
    setTimeout(() => {
      createAlertFile(null);
    }, 4000);
  });

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('myFile', acceptedFiles[0]);
    const originalFilename = acceptedFiles[0].path;
    await uploadFile(formData, originalFilename, token);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: token ? 1024 * 1024 * 10 : 1024,
  });

  const paintFiles = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl text-center">{file.name}</p>
      <p className="text-sm text-gray-500 text-center">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{paintFiles}</ul>
          {isLoadingFile ? (
            <p className="my-10 text-center text-gray-600">Cargando archivo</p>
          ) : (
            <button
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              type="button"
              onClick={() => createLink(token)}
            >
              Obtener Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
          <input className="h-full" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el archivo
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona un archivo y arrástralo aquí
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Selecciona archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
