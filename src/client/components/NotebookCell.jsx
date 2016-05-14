import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import getCellData from '../get-cell-data';

import { CellEditor } from './CellEditor';

export const NotebookCell = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let cell = this.props.cell;
    switch (cell.get('cellType')) {
      case 'DATA':
        return this.renderDataCell(cell);
      case 'TRANSFORM':
        return this.renderTransformCell(cell);
    }
    return null;
  },
  getCellDataAsPrettyJSON: function(cell) {
    return JSON.stringify(this.props.getData(), null, 2)
  },
  renderDataCell: function() {
    return <div>
      <h1>{this.props.cell.get('name')}</h1>
      <pre>{this.getCellDataAsPrettyJSON()}</pre>
    </div>;
  },
  renderTransformCell: function() {
    return <div>{ this.props.cellBeingEdited ? null :
      <div>
        <h1>{this.props.cell.get('name')}</h1>
        <pre>{this.getCellDataAsPrettyJSON()}</pre>
      </div>}
      <CellEditor {...this.props} />
    </div>;
  }
})

function mapStateToProps(state, props) {
  let notebook = state.get('notebook');
  let cellsById = notebook.get('cellsById');
  let cell = cellsById.get(props.cellId);
  let cellsBefore = notebook.get('cells').takeUntil(id=>id === props.cellId);
  let cellBeingEdited = notebook.get('editingCell') === props.cellId;
  let getData = (opts) => getCellData(cellsById, props.cellId, opts);
  return { cellBeingEdited, cell, cellsById, cellsBefore, getData };
}

export const NotebookCellContainer = connect(
  mapStateToProps,
  actionCreators
)(NotebookCell);