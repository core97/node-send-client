import { API_URL_BASE } from './settings';

const fromApiResponse = (apiResponse) => {
  return apiResponse;
};

export function userAuthenticatedAPI(token) {
  const apiURL = `${API_URL_BASE}/auth`;

  return fetch(apiURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Token no válido');
      } else if (res.status >= 400) {
        throw new Error('Error al comprobar el token');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export function logInUserAPI(user) {
  const apiURL = `${API_URL_BASE}/auth`;

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('El usuario no existe');
      } else if (res.status === 403) {
        throw new Error('La contraseña es incorrecta');
      } else if (res.status >= 400) {
        throw new Error('Error login del usuario');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export function registerUserAPI(user) {
  const apiURL = `${API_URL_BASE}/users`;

  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 422) {
        throw new Error('El usuario ya existe');
      } else if (res.status === 403) {
        throw new Error('La contraseña es incorrecta');
      } else if (res.status >= 400) {
        throw new Error('Error al crear el usuario');
      } else {
        return res.json();
      }
    })
    .then(fromApiResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}
