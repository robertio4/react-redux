import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import createNewUserAction from '../actions/createNewUserAction';

// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
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

const NewUser = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // State del componente
  const [user, setUser] = useState(stateInicial);
  const [errorNew, setErrorNew] = useState();

  // Acceder al state del store
  const { error } = useSelector(state => state.users);

  useEffect(() => {
    setErrorNew(error);
  }, [error]);

  // actualiza el state
  const updateState = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const { name, lastName, age, email } = user;

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
  const submitNewUser = e => {
    e.preventDefault();

    // validar
    const error = validate();
    if (error) {
      setErrorNew(error);
      return;
    }

    // Lanzar action para crear nuevo usuario
    dispatch(createNewUserAction(user, history));
  };

  return (
    <Card className={classes.root}>
      <form
        onSubmit={submitNewUser}
        className={classes.root}
        noValidate
        autoComplete='off'
      >
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2' align='center'>
            Add new user
          </Typography>

          {errorNew && <Alert severity='error'>{errorNew}</Alert>}

          <TextField
            id='name'
            label='Name'
            color='primary'
            className={classes.textField}
            fullWidth
            onChange={e => updateState(e)}
          />
          <TextField
            id='lastName'
            label='Last Name'
            color='primary'
            className={classes.textField}
            fullWidth
            onChange={e => updateState(e)}
          />
          <TextField
            id='age'
            label='Age'
            type='number'
            className={classes.textField}
            fullWidth
            onChange={e => updateState(e)}
          />
          <TextField
            id='email'
            label='Email'
            className={classes.textField}
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
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default NewUser;
