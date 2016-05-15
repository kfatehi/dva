import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action-creators';
import getCellData from '../../get-cell-data';

import { Button } from 'react-bootstrap';

export default function(Component){
  const Cell = React.createClass({
    mixins: [PureRenderMixin],
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
    renderCell: function(states) {
      const {editing, editingOther} = this.props;
      const {view, edit} = states;
      const btn = <Button onClick={this.editCell} bsStyle="primary">Edit</Button>;
      return <div>
        { editing ? edit : view }
        { editing || editingOther ? null : (edit ? btn : null) }
      </div>;
    },
    render: function() {
      const cellHelpers = {
        getCellDataAsPrettyJSON: this.getCellDataAsPrettyJSON,
        renderCell: this.renderCell,
        editCell: this.editCell,
        updateCell: this.updateCell,
        cancelEditCell: this.cancelEditCell,
      };
      return <Component cellHelpers={cellHelpers} {...this.props} />;
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

  const CellContainer = connect(
    mapStateToProps,
    actionCreators
  )(Cell);

  return CellContainer;
}
