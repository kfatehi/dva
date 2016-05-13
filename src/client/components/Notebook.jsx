import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List } from 'immutable';

import { Datatable } from './Datatable';
import { NewCellForm } from './NewCellForm';

import './Notebook.css';

export const Notebook = React.createClass({
  mixins: [PureRenderMixin],
  renderCell: function(cell) {
    switch (cell.get('type')) {
      case 'DATA_TABLE':
        return <Datatable columns={cell.get('columns')} rows={cell.get('rows')} />;
      case 'UNSPECIFIED':
        return <NewCellForm />;
    }
  },
  render: function() {
    return <div className="notebook">
      <h1>{this.props.name}</h1>
      <ul>{(this.props.cells || []).map((cell, i) => 
        <li className="cell" key={i}>
          {this.renderCell(cell)}
        </li>)}
        <button onClick={() => this.props.appendCell()}>
          Append Cell
        </button>
      </ul>
    </div>;
  }
})

function mapStateToProps(state) {
  console.log(state);
  return {
    name: state.getIn(['notebook', 'title']),
    cells: state.getIn(['notebook', 'cells'])
  };
}

export const NotebookContainer = connect(
  mapStateToProps,
  actionCreators
)(Notebook);
