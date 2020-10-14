import Link from 'next/link';

export const Header = () => {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
        </a>
      </Link>
      <div>
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
      </div>
    </header>
  );
};
