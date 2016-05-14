import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import { Router, Route, hashHistory } from 'react-router';
import remoteActionMiddleware from './remote-action-middleware';

import * as reducers from './reducers';
import App from './components/App';
import { DragDropWorkspaceContainer } from './components/Workspace';
import { NotebookContainer } from './components/Notebook';

import * as actionCreators from './action-creators';

//import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';

import './index.css';

const socket = io();

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const reducer = combineReducers({
  notebook: reducers.notebook,
});

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

let data = [{
  "Student": "Alice",
  "Grade": "95"
},{
  "Student": "Bob",
  "Grade": "65"
}]

let a = actionCreators.appendCell('DATA', {
  name: "Math Gradebook",
  contentType: "application/json",
  data: JSON.stringify(data)
})

let b = actionCreators.appendCell('TRANSFORM', {
  name: "Math Grades to decimal",
  parentId: a.uuid,
  func: `return data.map( row => row.update('Grade', grade => parseInt(grade) / 100 ) )`
})

let c = actionCreators.appendCell('TRANSFORM', {
  name: "Add Dimension: Pass/Fail",
  parentId: b.uuid,
  func: `return data.map( row => row.update('PF', () => row.get('Grade') > .7 ? 'PASS' : 'FAIL' ) )`
})

let d = actionCreators.appendCell('TRANSFORM', {
  name: "Filter Rows: Only Passes",
  parentId: c.uuid,
  func: `return data.filter( row => row.get('PF') === 'PASS' )`
})

let e = actionCreators.appendCell('VISUALIZATION', {
  name: "Good Students",
  parentId: d.uuid,
})

store.dispatch(a)
store.dispatch(b)
store.dispatch(c)
store.dispatch(d)
store.dispatch(e)
