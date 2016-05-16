import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action-creators';
import getCellData, { isCircular } from '../../get-cell-data';

import { Button, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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
      const btn = <Button onClick={this.editCell} bsStyle="primary">
        <FontAwesome name='pencil'/> Edit
      </Button>;
      return <Col xs={12}>
        { editing ? edit : view }
        { editing || editingOther ? null : (edit ? btn : null) }
      </Col>;
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
    const { cellId } = props;
    const notebook = state.get('notebook');
    const cellsById = notebook.get('cellsById');
    const cell = cellsById.get(cellId);
    const otherCellsWithData = notebook.get('cells').filter( id => {
      // you cannot make a cell a parent of itself
      if (id === cellId) return false;

      const type = cellsById.getIn([id, 'cellType']);

      // a DATA cell can always be a parent to other cells
      if (type === 'DATA') return true;

      // transforms can be parents
      if (type === 'TRANSFORM') {
        // but be wary of circular dependencies
        const parentId = cellsById.getIn([id, 'parentId']);
        
         return isCircular(
          cellsById.updateIn([ cellId, 'parentId' ], () => id),
          cellId
        ) ? false : true
      }

      // otherwise do not show this cell as an option
      return false;
    })
    const editing = notebook.get('editingCell') === cellId;
    const editingOther = notebook.get('editingCell') !== undefined;
    const getData = (opts) => getCellData(cellsById, cellId, opts);
    const getCellName = (id) => cellsById.get(id).get('name');
    return {
      editing,
      editingOther,
      cell,
      cellsById,
      otherCellsWithData,
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
