import React from 'react';
import './App.css';
import theme from './theme';

import Header from './components/Header';
import Users from './components/Users';
import NewUser from './components/NewUser';
import EditUser from './components/EditUser';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router>
        <Provider store={store}>
          <Header />
          <Container maxWidth='md'>
            <Box my={5}>
              <Switch>
                <Route exact path='/' component={Users} />
                <Route exact path='/users/new' component={NewUser} />
                <Route exact path='/users/edit/:id' component={EditUser} />
              </Switch>
            </Box>
          </Container>
        </Provider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
