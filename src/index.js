import * as TableActions from './actions/TableActions';
import TableReducer from './reducers/TableReducer';
import TableComponent from './components/TableComponent';

import React from 'react';

import { render } from 'react-dom';
import { createStore } from 'redux';

function createTableComponent( container ) {

  let store = createStore(TableReducer);

  function renderComponent() {
    var state = store.getState();
    console.log(state);
    render( <TableComponent
      title = {state.title}
      rows = {state.rows}
      onTitleClick = { () => {
          store.dispatch(TableActions.changeTitleColor());
        }
      }
    />, container );
  }

  store.subscribe(renderComponent);
  renderComponent();
}

/*title = {state.title}
rows = {state.rows}
onTitleClick = { () => {
    store.dispatch(TableActions.changeTitleColor());
  }
}*/

export default createTableComponent;
