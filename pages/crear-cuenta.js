import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import authContext from 'contexts/auth/authContext';
import { Alert } from 'components/Alert';

export default function CrearCuenta() {
  const { register, handleSubmit, errors } = useForm();
  const AuthContext = useContext(authContext);
  const { errorAuth, isLoadingAuth, registerUser } = AuthContext;

  const onSubmit = (data, e) => {
    e.target.reset();
    registerUser(data);
  };

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
        Crear Cuenta
      </h2>

      {errorAuth && <Alert message={errorAuth}/>}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-black text-sm mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                name="name"
                placeholder="Nombre de usuario"
                ref={register({
                  required: {
                    value: true,
                    message: 'Este campo es obligatorio',
                  },
                })}
              />
              <div className="my-4">
                {errors.name && (
                  <span className="text-red-700">{errors.name.message}</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="email"
                name="email"
                placeholder="Email de usuario"
                ref={register({
                  required: {
                    value: true,
                    message: 'Este campo es obligatorio',
                  },
                  pattern: {
                    value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                    message: 'Introduce un email válido',
                  },
                })}
              />
              <div className="my-4">
                {errors.email && (
                  <span className="text-red-700">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-black text-sm mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña de usuario"
                ref={register({
                  required: {
                    value: true,
                    message: 'Este campo es obligatorio',
                  },
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 carácteres',
                  },
                })}
              />
              <div className="my-4">
                {errors.password && (
                  <span className="text-red-700">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <input
              className="bg-red-500 hover:cursor-pointer w-full p-2 rounded text-white uppercase font-bold"
              type="submit"
              value={isLoadingAuth ? 'Cargando' : 'Crear Cuenta'}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
