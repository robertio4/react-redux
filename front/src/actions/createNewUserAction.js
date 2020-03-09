import { ADD_USER, ADD_USER_SUCCESS, ADD_USER_ERROR } from '../types';

import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevo usuario
export default function createNewUserAction(user, history) {
  return async dispatch => {
    dispatch(addUser());

    try {
      // Petición a la API
      const response = await clientAxios.post('/users', user);

      // Actualizar el state con el usuario
      dispatch(addUserSuccess(response.data));

      // Feedback
      Swal.fire('Success!', 'The user was added successfully', 'success');

      // Redirección al listado
      history.push('/');
    } catch (error) {
      if (error.response) {
        // Actualizar state con el error
        dispatch(addUserError(error.response.data));
      } else {
        dispatch(addUserError(false));

        // Feedback
        Swal.fire('Oops...', 'Something went wrong!', 'error');
      }
    }
  };
}

const addUser = () => ({
  type: ADD_USER,
  payload: true
});

const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user
});

const addUserError = msgError => ({
  type: ADD_USER_ERROR,
  payload: msgError
});
