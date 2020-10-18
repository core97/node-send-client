import { API_URL_BASE } from './settings';

const fromApiResponse = (apiResponse) => {
  return apiResponse;
};

export function getLinkAPI(url) {
  const apiURL = `${API_URL_BASE}/link/${url}`;

  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status >= 300) {
        throw new Error('Error al obtener enlaces');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse);
}

export function getAllLinksAPI() {
  const apiURL = `${API_URL_BASE}/link`;

  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status >= 300) {
        throw new Error('Error al obtener enlaces');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse);
}

export function createLinkAPI(data, token) {
  const apiURL = `${API_URL_BASE}/link`;

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Token no válido');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export function verifyFilePasswordAPI({ fileUrl, filePassword }) {
  const apiURL = `${API_URL_BASE}/link/${fileUrl}`;

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filePassword }),
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Contraseña del link incorrecta');
      } else if (res.status === 404) {
        throw new Error('No existe ningún link con esa url');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}
