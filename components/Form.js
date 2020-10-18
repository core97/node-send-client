import { useState, useContext } from 'react';
import appContext from 'contexts/app/appContext';

export const Form = () => {
  const [hasPassword, setHasPassword] = useState(false);
  const AppContext = useContext(appContext);
  const { addPasswordToFile, addDownloadsToFile } = AppContext;

  return (
    <form className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras:</label>
        <select
          onChange={(e) => addDownloadsToFile(parseInt(e.target.value))}
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
        >
          <option value="" selected disabled>
            --- Seleccione ---
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descarga</option>
          <option value="10">10 Descarga</option>
          <option value="20">20 Descarga</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">
            Proteger con contraseña
          </label>
          <input
            type="checkbox"
            onChange={() => setHasPassword(!hasPassword)}
          />
        </div>
        {hasPassword && (
          <input
            type="password"
            onChange={(e) => addPasswordToFile(e.target.value)}
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
          />
        )}
      </div>
    </form>
  );
};
