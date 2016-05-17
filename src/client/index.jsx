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
import { fromJS } from 'immutable';
import * as demos from './demo';

//import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/tomorrow-night-bright.css';

import 'font-awesome/less/font-awesome.less';
import 'bootstrap/less/bootstrap.less';

const socket = io();

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const reducer = combineReducers({
  form: (state = fromJS({}), action) => fromJS(formReducer(state.toJS(), action)),
  notebook: reducers.notebook,
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
          <Route path="/" component={NotebookContainer} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('mount')
  )

  demos.goodStudents(store.dispatch)
  //demos.sankey(store.dispatch)
}
