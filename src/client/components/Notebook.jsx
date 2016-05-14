import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Datatable } from './Datatable';
import { NewCellForm } from './NewCellForm';

import './Notebook.css';

export const NotebookCell = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    switch (this.props.cell.get('cellType')) {
      case 'DATA':
        return this.renderDataCell();
    }
    return null;
  },
  renderDataCell: function() {
    const data = this.props.cell.get('data');
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  },
})

export const Notebook = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <ul className="notebook">{ this.props.cells.map(id =>
      <li key={id}>
        <NotebookCell cell={this.props.cellsById.get(id)}/>
      </li>)}
    </ul>;
  }
})

function mapStateToProps(state) {
  return {
    cells: state.getIn(['notebook', 'cells']) || List(),
    cellsById: state.getIn(['notebook', 'cellsById']) || Map()
  };
}

export const NotebookContainer = connect(
  mapStateToProps,
  actionCreators
)(Notebook);
