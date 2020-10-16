import { API_URL_BASE } from './settings';

const fromApiResponse = (apiResponse) => {
  return apiResponse;
};

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
