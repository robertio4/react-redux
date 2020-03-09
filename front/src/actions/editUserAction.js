import {
  GET_USER_EDIT,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR
} from '../types';

import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

// Obtener usuario a editar
export function getEditUserAction(user) {
  return async dispatch => {
    dispatch(getEditUser(user));
  };
}

// Editar Usuario
export function editUserAction(user, history) {
  return async dispatch => {
    dispatch(editUser(user));

    try {
      // Petición a la API
      const response = await clientAxios.put(`/users/${user.id}`, user);

      // Actualizar el state
      dispatch(editUserSuccess(response.data));

      // Feedback
      Swal.fire('Success!', 'The user has been saved', 'success');

      // Redirección al listado
      history.push('/');
    } catch (error) {
      if (error.response) {
        // Actualizar state con el error
        dispatch(editUserError(error.response.data));
      } else {
        dispatch(editUserError(false));

        // Feedback
        Swal.fire('Oops...', 'Something went wrong!', 'error');
      }
    }
  };
}

const getEditUser = user => ({
  type: GET_USER_EDIT,
  payload: user
});

const editUser = user => ({
  type: EDIT_USER,
  payload: user
});

const editUserSuccess = user => ({
  type: EDIT_USER_SUCCESS,
  payload: user
});

const editUserError = msgError => ({
  type: EDIT_USER_ERROR,
  payload: msgError
});
