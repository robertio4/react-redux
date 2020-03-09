import { DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_ERROR } from '../types';

import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

// Eliminar usuario
export default function deleteUserAction(id) {
  return async dispatch => {
    dispatch(deleteUser(id));

    try {
      // Petición a la API
      await clientAxios.delete(`/users/${id}`);

      // Lanzar el altion
      dispatch(deleteUserSuccess());

      // Feedback
      Swal.fire('Success!', 'The user has been deleted.', 'success');
    } catch (error) {
      if (error.response) {
        // Actualizar state con el error
        dispatch(deleteUserError(error.response.data));
      } else {
        dispatch(deleteUserError(false));

        // Feedback
        Swal.fire('Oops...', 'Something went wrong!', 'error');
      }
    }
  };
}

const deleteUser = id => ({
  type: DELETE_USER,
  payload: id
});

const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS
});

const deleteUserError = msgError => ({
  type: DELETE_USER_ERROR,
  payload: msgError
});
