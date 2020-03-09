import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { editUserAction } from '../actions/editUserAction';

// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  textField: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  button: {
    margin: theme.spacing(1),
    align: 'right'
  }
}));

const stateInicial = {
  name: '',
  lastName: '',
  age: 0,
  email: ''
};

const EditUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // State del componente
  const [user, setUser] = useState(stateInicial);
  const [errorEdit, setErrorEdit] = useState();

  const { userEdit, error } = useSelector(state => state.users);

  // Añadir el usuario a editar en el state del componente
  useEffect(() => {
    if (userEdit) setUser(userEdit);
  }, [userEdit]);

  useEffect(() => {
    setErrorEdit(error);
  }, [error]);

  // actualiza el state
  const updateState = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const validate = () => {
    if (
      name.trim() === '' ||
      lastName.trim() === '' ||
      age.trim() === '' ||
      email.trim() === ''
    ) {
      return 'All fields are required';
    }
    return null;
  };

  // Cuando el usuario haga submit
  const submitEditUser = e => {
    e.preventDefault();

    // validar
    const error = validate();
    if (error) {
      setErrorEdit(error);
      return;
    }

    // Lanzar action para editar usuario
    dispatch(editUserAction(user, history));
  };

  const { name, lastName, age, email } = user;

  return (
    <Card className={classes.root}>
      <form
        onSubmit={submitEditUser}
        className={classes.root}
        noValidate
        autoComplete='off'
      >
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2' align='center'>
            Edit user
          </Typography>

          {errorEdit && <Alert severity='error'>{errorEdit}</Alert>}

          <TextField
            id='name'
            label='Name'
            color='primary'
            className={classes.textField}
            value={name}
            fullWidth
            onChange={e => updateState(e)}
          />
          <TextField
            id='lastName'
            label='Last Name'
            color='primary'
            className={classes.textField}
            value={lastName}
            fullWidth
            onChange={e => updateState(e)}
          />
          <TextField
            id='age'
            label='Age'
            type='number'
            className={classes.textField}
            value={age}
            fullWidth
            onChange={e => updateState(e)}
          />
          <TextField
            id='email'
            label='Email'
            className={classes.textField}
            value={email}
            fullWidth
            onChange={e => updateState(e)}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default EditUser;
