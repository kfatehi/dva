import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action-creators';
import getCellData, { getParentCandidates } from '../../get-cell-data';

import { Button, Col, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
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
      const {
        editing,
        editingOther,
        isFirstPosition,
        isLastPosition,
      } = this.props;
      const {view, edit} = states;

      const buttonGroupInstance = (
        <ButtonToolbar>
          <ButtonGroup>
            <Button disabled={!edit} onClick={this.editCell}>
              <FontAwesome name='pencil'/>
            </Button>
            <Button disabled={isFirstPosition}><FontAwesome name="arrow-up" /></Button>
            <Button disabled={isLastPosition}><FontAwesome name="arrow-down" /></Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button><FontAwesome name="database" /> Append Data</Button>
            <Button><FontAwesome name="file-code-o" /> Append Transformation</Button>
            <Button><FontAwesome name="file-text-o" /> Append Markdown</Button>
            <Button><FontAwesome name="bar-chart" /> Append Visualization</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button><FontAwesome name='remove'/></Button>
          </ButtonGroup>
        </ButtonToolbar>
      );

      function renderCellView(cellView) {
        return (
          <div>
            {cellView}
            { editingOther ? null : buttonGroupInstance }
          </div>
        );
      }

      return <Col xs={12}>
        { editing ? edit : renderCellView(view) }
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
    const cells = notebook.get('cells');
    const otherCellsWithData = getParentCandidates(cells, cellsById, cellId);
    const editing = notebook.get('editingCell') === cellId;
    const editingOther = notebook.get('editingCell') !== undefined;
    const getData = (opts) => getCellData(cellsById, cellId, opts);
    const getCellName = (id) => cellsById.get(id).get('name');
    const cellPosition = cells.findIndex(i=>i===cellId);
    const isFirstPosition = cellPosition === 0;
    const isLastPosition = cellPosition === cells.size-1;
    return {
      editing,
      editingOther,
      cell,
      cellsById,
      otherCellsWithData,
      initialValues: cell.toJS(),
      getCellName,
      getData,
      isFirstPosition,
      isLastPosition,
    };
  }

  const CellContainer = connect(
    mapStateToProps,
    actionCreators
  )(Cell);

  return CellContainer;
}
