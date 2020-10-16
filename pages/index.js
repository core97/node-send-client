import Link from 'next/link';
import { useContext } from 'react';
import { Dropzone } from 'components/Dropzone';
import { Alert } from 'components/Alert';
import appContext from 'contexts/app/appContext';

export default function Home() {
  const AppContext = useContext(appContext);
  const { errorFile, urlFile } = AppContext;

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      {urlFile ? (
        <>
          <p className="text-center text-2xl mt-10">
            <span className="font-bold text-red-700 text-3xl uppercase">
              Tu url es
            </span>
            {` ${process.env.FRONTEND_URL}/enlaces/${urlFile}`}
          </p>
          <button
            className="bg-red-500 hover:cursor-pointer w-full p-2 rounded text-white uppercase font-bold mt-10"
            type="button"
            onClick={() => navigator.clipboard.writeText(`${process.env.FRONTEND_URL}/enlaces/${urlFile}`)}
          >
            Copiar enlace
          </button>
        </>
      ) : (
        <>
          {errorFile && <Alert message={errorFile} />}

          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <Dropzone />
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                Compartir archivos de forma segura y privada
              </h2>
              <p className="text-lg leading-loose">
                <span className="text-red-500 font-bold">ReactNodeSend</span> te
                permite compartir archivos con cifrado de extremo a extremo. Los
                archivos son eliminados después de ser descargados. Mantén lo
                que compartes con total seguridad, te aseguramos que tus
                archivos no permanecerán en línea para siempre.
              </p>
              <Link href="/crear-cuenta">
                <a className="text-red-500 font-bold text-lg hover:text-red-700">
                  Crea una cuenta para mayores beneficios
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
