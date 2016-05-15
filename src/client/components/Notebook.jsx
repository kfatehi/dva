import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { DataCell } from './DataCell';
import { TransformCell } from './TransformCell';
import { VisualizationCell } from './VisualizationCell';


import './Notebook.less';

export const Notebook = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { cells, cellsById } = this.props;
    const renderCell = (id) => {
      switch (cellsById.getIn([id, 'cellType'])) {
        case 'DATA':
          return <DataCell cellId={id} />
        case 'TRANSFORM':
          return <TransformCell cellId={id} />
        case 'VISUALIZATION':
          return <VisualizationCell cellId={id} />
        default:
          return null;
      }
    }
    return <ul className="notebook">{ cells.map(id =>
      <li key={id}>{renderCell(id)}</li>)}
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
