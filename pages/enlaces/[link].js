import { getAllLinksAPI, getLinkAPI } from 'services/link';

export default function Enlace({ linkFile }) {
  return (
    <>
      <h1 className="text-4xl text-center text-gray-700">
        Descarga tu archivo
      </h1>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`${process.env.BACKEND_URL}/api/files/${linkFile}`}
          className="bg-red-500 text-center px-10 py-3 rounded uppercase text-white font-bold cursor-pointer"
        >
          Aquí
        </a>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    const { link } = params;
    const { filename } = await getLinkAPI(link);

    return {
      props: {
        linkFile: filename,
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
