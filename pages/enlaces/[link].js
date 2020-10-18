import { useState } from 'react';
import { Alert } from 'components/Alert';
import { getAllLinksAPI, getLinkAPI } from 'services/link';
import { verifyFilePasswordAPI } from 'services/link';

export default function Enlace({ filename, fileUrl, password }) {
  const [hasPassword, setHasPassword] = useState(password);
  const [filePassword, setFilePassword] = useState('');
  const [alertPassword, setAlertPassword] = useState(null);

  // Verificar contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { fileUrl, filePassword };
      const { password } = await verifyFilePasswordAPI(data);
      // password es boolean
      setHasPassword(password);
    } catch (error) {
      setAlertPassword(error.message);
      setTimeout(() => {
        setAlertPassword(null);
      }, 3000);
    }
  };

  return (
    <>
      {hasPassword ? (
        <div className="flex flex-col items-center mt-5">
          <p className="mb-5 text-center">
            Este enlace esta protegido por una contraseña, colócalo a
            continuación
          </p>

          {alertPassword && <Alert message={alertPassword} />}

          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-black text-sm mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  className="shadow appeareance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Introduzca la contraseña"
                  value={filePassword}
                  onChange={(e) => setFilePassword(e.target.value)}
                />
                <input
                  className="bg-red-500 hover:cursor-pointer w-full p-2 rounded text-white uppercase font-bold"
                  type="submit"
                  value="Validar contraseña"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.BACKEND_URL}/api/files/${filename}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase text-white font-bold cursor-pointer"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    const { link: linkParam } = params;
    const { link, password } = await getLinkAPI(linkParam);
    const { filename, url } = link;

    return {
      props: {
        filename,
        fileUrl: url,
        password: password || false,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        linkFile: null,
      },
    };
  }
}

export async function getStaticPaths() {
  try {
    const { links } = await getAllLinksAPI();
    return {
      paths: links.map((eachLink) => {
        return {
          params: {
            link: eachLink.url,
          },
        };
      }),
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: false,
    };
  }
}
