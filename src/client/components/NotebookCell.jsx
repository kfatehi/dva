import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import getCellData from '../get-cell-data';

import { TransformCellEditorForm } from './TransformCellEditor';
import { VisualizationCellEditorForm } from './VisualizationCellEditor';
import { Visualization } from './Visualization';

import { Button } from 'react-bootstrap';

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
  updateCell: function(params, dispatch) {
    return this.props.updateCell(this.props.cellId, params)
  },
  cancelEditCell: function(e) {
    e.preventDefault();
    return this.props.cancelEditCell(this.props.cellId)
  },
  renderDataCell: function() {
    return this.renderCell({
      view: <div>
        <h1>{this.props.cell.get('name')}</h1>
        <pre>{this.getCellDataAsPrettyJSON()}</pre>
      </div>
    });
  },
  renderTransformCell: function() {
    return this.renderCell({
      view: <div>
        <h1>{this.props.cell.get('name')}</h1>
        <pre>{this.getCellDataAsPrettyJSON()}</pre>
      </div>,
      edit: <TransformCellEditorForm {...this.props}
        onSubmit={this.updateCell}
        handleCancel={this.cancelEditCell}
      />
    });
  },
  renderVisualizationCell: function() {
    return this.renderCell({
      view: <div>
        <h1>{this.props.cell.get('name')}</h1>
        <Visualization
          visExtId={this.props.cell.get('visExtId')}
          visConfigJSON={this.props.cell.get('visConfigJSON')}
          getData={this.props.getData}
        />
      </div>,
      edit: <VisualizationCellEditorForm {...this.props}
        onSubmit={this.updateCell}
        handleCancel={this.cancelEditCell}
      />
    });
  },
  renderCell: function(states) {
    const {editing, editingOther} = this.props;
    const {view, edit} = states;
    const btn = <Button onClick={this.editCell} bsStyle="primary">Edit</Button>;
    return <div>
      { editing ? edit : view }
      { editing || editingOther ? null : (edit ? btn : null) }
    </div>;
  }
})

function mapStateToProps(state, props) {
  let notebook = state.get('notebook');
  let cellsById = notebook.get('cellsById');
  let cell = cellsById.get(props.cellId);
  let cellsBefore = notebook.get('cells').takeUntil(id=>id === props.cellId);
  let editing = notebook.get('editingCell') === props.cellId;
  let editingOther = notebook.get('editingCell') !== undefined;
  let getData = (opts) => getCellData(cellsById, props.cellId, opts);
  let getCellName = (id) => cellsById.get(id).get('name');
  return {
    editing,
    editingOther,
    cell,
    cellsById,
    cellsBefore,
    initialValues: cell.toJS(),
    getCellName,
    getData,
  };
}

export const NotebookCellContainer = connect(
  mapStateToProps,
  actionCreators
)(NotebookCell);
