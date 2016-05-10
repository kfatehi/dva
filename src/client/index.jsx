import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory } from 'react-router';
import remoteActionMiddleware from './remote-action-middleware';

import reducer from './reducer';
import App from './components/App';
import { WorkspaceContainer } from './components/Workspace';

const socket = io();

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);


const store = createStoreWithMiddleware(reducer);

socket.on('action', action => {
  console.log('got action from server', action);
  store.dispatch(action);
});

store.subscribe(() => {
  console.log(store.getState().toJS());
})


const routes = <Route component={App}>
  <Route path="/" component={WorkspaceContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('mount')
)
