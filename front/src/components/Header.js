import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link color='inherit' component={RouterLink} to='/'>
              Test React
            </Link>
          </Typography>
          <Button
            variant='outlined'
            color={'secondary'}
            component={RouterLink}
            to='/users/new'
            startIcon={<AddIcon />}
          >
            Add user
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
