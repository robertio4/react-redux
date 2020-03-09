import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import deleteUserAction from '../actions/deleteUserAction';
import { getEditUserAction } from '../actions/editUserAction';

// Material-ui
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const User = ({ user }) => {
  const { id, name, lastName, age, email } = user;

  const dispatch = useDispatch();
  const history = useHistory(); // Habilitar history para redireccionar

  // Confirmación borrado
  const checkDeleteUser = id => {
    // Alert confimación
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        // Lanzar acción
        dispatch(deleteUserAction(id));
      }
    });
  };

  const redirect = user => {
    dispatch(getEditUserAction(user));
    history.push(`/users/edit/${user.id}`);
  };

  console.log(id);

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell align='right'>{age}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <IconButton aria-label='edit user' onClick={() => redirect(user)}>
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label='delete user'
          onClick={() => checkDeleteUser(id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default User;
