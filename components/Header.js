import Link from 'next/link';
import { useContext } from 'react';
import authContext from 'contexts/auth/authContext';
import appContext from 'contexts/app/appContext';

export const Header = () => {
  const AuthContext = useContext(authContext);
  const AppContext = useContext(appContext);
  const { user, isAuthenticated, logOutUser } = AuthContext;
  const { resetFileAndLink } = AppContext;

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <img onClick={resetFileAndLink} className="w-64 mb-8 md:mb-0" src="/logo.svg" />
        </a>
      </Link>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center">
            <p className="mr-4">Hola {user.name}</p>
            <button
              className="bg-black px-5 py-3 rounded-lg text-white uppercase"
              type="button"
              onClick={logOutUser}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 mr-2 rounded-lg text-white uppercase">
                Iniciar sesión
              </a>
            </Link>
            <Link href="/crear-cuenta">
              <a className="bg-black px-5 py-3 rounded-lg text-white uppercase">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
