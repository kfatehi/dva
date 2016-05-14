import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import { Router, Route, hashHistory } from 'react-router';
import remoteActionMiddleware from './remote-action-middleware';

import * as reducers from './reducers';
import App from './components/App';
import { DragDropWorkspaceContainer } from './components/Workspace';
import { NotebookContainer } from './components/Notebook';

import './index.css';

const socket = io();

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('action', action => {
  store.dispatch(action);
});


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path="/" component={NotebookContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
