import { API_URL_BASE } from './settings';

const fromApiResponse = (apiResponse) => {
  return apiResponse;
};

export function uploadFileAPI(data, token) {
  const apiURL = `${API_URL_BASE}/files`;

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: data,
  })
    .then((res) => {
      // 401 (no valid token) 200
      if (res.status === 401) {
        throw new Error('Token no válido');
      } else if (res.status >= 413) {
        throw new Error('Se ha excedido el límite del tamaño del archivo');
      }else if (res.status >= 400) {
        throw new Error('Error al subir el archivo');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}
