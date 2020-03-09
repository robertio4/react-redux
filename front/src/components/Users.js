import React, { useEffect } from 'react';
import User from './User';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import getUsersActions from '../actions/getUsersActions';

// Material-ui
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 630
  }
});

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // Ejecutar el action para obtener los usuarios
    const getUsers = newUser => dispatch(getUsersActions());
    getUsers();
  }, []);

  // Obtener los usuarios del state
  const { users, loading, error } = useSelector(state => state.users);

  return (
    <div>
      <Typography paragraph variant='h5' component='h2' align='center'>
        Users
      </Typography>

      {error && <Alert severity='error'>{error}</Alert>}

      {loading ? (
        <Typography paragraph variant='h6' component='h4' align='center'>
          Cargando ...
        </Typography>
      ) : users.length ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align='right' style={{ minWidth: 100 }}>
                    Age
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <User key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Typography paragraph variant='h6' component='h4' align='center'>
          No data
        </Typography>
      )}
    </div>
  );
};

export default Users;
