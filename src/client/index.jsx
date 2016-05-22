import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import { Router, Route, hashHistory } from 'react-router';
import remoteActionMiddleware from './remote-action-middleware';
import {reducer as formReducer} from 'redux-form';
import * as reducers from './reducers';
import App from './components/App';
import { NotebookContainer } from './components/Notebook';
import { HomeContainer } from './components/Home';
import { fromJS } from 'immutable';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'font-awesome/less/font-awesome.less';
import 'bootstrap/less/bootstrap.less';

//import demo from './demos/contrived-students';
//import demo from './demos/contrived-sankey';
import demo from './demos/titanic';

const socket = io();

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const reducer = combineReducers({
  form: (state = fromJS({}), action) => fromJS(formReducer(state.toJS(), action)),
  notebook: reducers.notebook,
  home: reducers.home,
});

const store = createStoreWithMiddleware(reducer);

socket.on('action', action => {
  store.dispatch(action);
});

window.mountApplication = function(){
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path="/" component={HomeContainer} />
          <Route path="/notebooks/:id" component={NotebookContainer} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('mount')
  )
}
