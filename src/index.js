import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from './Home';
import Station from './Station';
import Fetcher from './Fetcher';
import rootReducer from './reducers'

import 'semantic-ui-css/semantic.min.css';
import 'leaflet/dist/leaflet.css';
import './style.css';

const style = {
  root: {
    maxWidth: 700,
    margin: '0 auto 100px auto'
  },
  headerContainer: {
    display: 'grid',
    height: 100
  },
  header: {
    margin: 'auto'
  }
};

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

const Header = () => (
  <div style={style.headerContainer}>
    <h1 style={style.header}>
      <Link to='/' style={style.header}>
        Movatic
      </Link>
    </h1>
  </div>
);

const Root = () => (
  <div style={style.root}>
    <Provider store={store}>
      <Router>
        <Header />
        <Fetcher>
          <Switch>
            <Route path="/:id" component={Station} />
            <Route path="/" component={Home} />
          </Switch>
        </Fetcher>
      </Router>
    </Provider>
  </div>
);

render(<Root />, document.getElementById('root'))
