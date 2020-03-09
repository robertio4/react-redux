import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from '../types';

import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

// Obtener usuarios
export default function getUsersAction(user) {
  return async dispatch => {
    dispatch(getUsers());

    try {
      // Petición a la API
      const request = await clientAxios.get('/users');

      // Actualizar el state con el usuario
      const users = request.data;
      dispatch(getUsersSuccess(users));

      // Feedback
      //Swal.fire('Success!', 'The user was added successfully', 'success');
    } catch (error) {
      if (error.response) {
        // Actualizar state con el error
        dispatch(getUsersError(error.response.data));
      } else {
        dispatch(getUsersError(false));

        // Feedback
        Swal.fire('Oops...', 'Something went wrong!', 'error');
      }
    }
  };
}

const getUsers = () => ({
  type: GET_USERS,
  payload: true
});

const getUsersSuccess = user => ({
  type: GET_USERS_SUCCESS,
  payload: user
});

const getUsersError = msgError => ({
  type: GET_USERS_ERROR,
  payload: msgError
});
