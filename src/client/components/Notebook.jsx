import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Datatable } from './Datatable';
import { NewCellForm } from './NewCellForm';

import getCellData from '../get-cell-data';

import './Notebook.css';

export const NotebookCell = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    switch (this.props.cell.get('cellType')) {
      case 'DATA':
        return this.renderDataCell();
      case 'TRANSFORM':
        return this.renderTransformCell();
    }
    return null;
  },
  renderDataCell: function(_data) {
    const data = _data || getCellData(this.props.cellsById, this.props.cell);
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  },
  renderTransformCell: function() {
    const parentId = this.props.cell.get('parentId');

    let funcChain = List.of(Function("data", this.props.cell.get('func')));

    // go through parents until you find a DATA
    const parentCell = this.props.cellsById.get(parentId);

    if (parentCell.get('cellType') === 'DATA') {
      // get the data and run the func chain
      let out = funcChain.reduce((data,fn) => fn(data), parentCell.get('data'))
      return this.renderDataCell(out.toJS());
    } else {
      return null;
    }
  }
})

export const Notebook = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <ul className="notebook">{ this.props.cells.map(id =>
      <li key={id}>
        <NotebookCell
          cellsById={this.props.cellsById}
          cell={this.props.cellsById.get(id)}
        />
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
