import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import getCellData from '../get-cell-data';

import { TransformCellEditorForm } from './TransformCellEditor';
import { VisualizationCellEditor } from './VisualizationCellEditor';

export const NotebookCell = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    switch (this.props.cell.get('cellType')) {
      case 'DATA':
        return this.renderDataCell();
      case 'TRANSFORM':
        return this.renderTransformCell();
      case 'VISUALIZATION':
        return this.renderVisualizationCell();
    }
    return null;
  },
  getCellDataAsPrettyJSON: function() {
    return JSON.stringify(this.props.getData(), null, 2)
  },
  editCell: function() {
    return this.props.editCell(this.props.cellId)
  },
  renderDataCell: function() {
    return <div>
      <h1>{this.props.cell.get('name')}</h1>
      <pre>{this.getCellDataAsPrettyJSON()}</pre>
    </div>;
  },
  renderTransformCell: function() {
    return <div>{ this.props.editing ? null :
      <div>
        <h1>{this.props.cell.get('name')}</h1>
        <pre>{this.getCellDataAsPrettyJSON()}</pre>
      </div>}
      { this.props.editing ? 
        <TransformCellEditorForm {...this.props} />
        :
      <button onClick={this.editCell}>Edit</button> }
    </div>;
  },
  renderVisualizationCell: function() {
    return <div>{ this.props.editing ? null :
      <div>
        <h1>{this.props.cell.get('name')}</h1>
        a viz goes here
      </div>}
      <VisualizationCellEditor {...this.props} />
    </div>;
  }
})

function mapStateToProps(state, props) {
  let notebook = state.get('notebook');
  let cellsById = notebook.get('cellsById');
  let cell = cellsById.get(props.cellId);
  let cellsBefore = notebook.get('cells').takeUntil(id=>id === props.cellId);
  let editing = notebook.get('editingCell') === props.cellId;
  let getData = (opts) => getCellData(cellsById, props.cellId, opts);
  return {
    editing,
    cell,
    cellsById,
    cellsBefore,
    initialValues: cell.toJS(),
    getData
  };
}

export const NotebookCellContainer = connect(
  mapStateToProps,
  actionCreators
)(NotebookCell);
