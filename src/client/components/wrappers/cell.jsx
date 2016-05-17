import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../action-creators';
import getCellData, { getParentCandidates } from '../../get-cell-data';
import { getDependentCell } from '../../get-cell-dependencies';

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
        cell,
        cellId,
        cellPosition,
        cellsById,
        editing,
        editingOther,
        isFirstPosition,
        isLastPosition,
        isCompressed,
        toggleCompressCell,
        appendCell,
        removeCell,
        moveCellDown,
        moveCellUp,
      } = this.props;
      const {view, edit} = states;

      const newCellActions = [{
        label: 'Append Data',
        icon: 'database',
        handleClick: () => {
          return appendCell('DATA', {
            name: 'New data',
            atIndex: cellPosition+1,
            contentType: "application/json",
            data: JSON.stringify([])
          })
        }
      },{
        label: 'Append Transformation',
        icon: 'file-code-o',
        handleClick: () => {
          return appendCell('TRANSFORM', {
            atIndex: cellPosition+1,
            name: 'New transform',
          })
        }
      },{
        label: 'Append Markdown',
        icon: 'file-text-o',
        handleClick: () => {
          return appendCell('MARKDOWN', {
            atIndex: cellPosition+1,
            markdown: '# New markdown',
          })
        }
      },{
        label: 'Append Visualization',
        icon: 'bar-chart',
        handleClick: () => {
          return appendCell('VISUALIZATION', {
            name: 'New visualization',
            atIndex: cellPosition+1
          })
        }
      }];

      const handleMoveUp = () => moveCellUp(cellId);

      const handleMoveDown = () => moveCellDown(cellId);

      const handleRemoveCell = () => {
        let dep = getDependentCell(cellsById, cellId);
        if (dep) {
          let depCell = cellsById.get(dep);
          let depName = depCell.get('name');
          alert(`This cell is depended upon by another cell (name: ${depName})`);
        } else if (confirm('Are you sure?')) {
          return removeCell(cellId);
        }
      }

      const buttonGroupInstance = (
        <ButtonToolbar>
          <ButtonGroup>
            <Button title={isCompressed ? "Expand" : "Compress"} onClick={() => toggleCompressCell(cellId)}><FontAwesome name={isCompressed ? "expand" : "compress"} /></Button>
            <Button title="Edit" disabled={!edit} onClick={this.editCell}><FontAwesome name='pencil'/></Button>
            <Button title="Move Cell Up" onClick={handleMoveUp} disabled={isFirstPosition}><FontAwesome name="arrow-up" /></Button>
            <Button title="Move Cell Down" onClick={handleMoveDown} disabled={isLastPosition}><FontAwesome name="arrow-down" /></Button>
          </ButtonGroup>

          <ButtonGroup>{newCellActions.map((action,i) => 
            <Button key={i} title={action.label} onClick={action.handleClick}>
              <FontAwesome name={action.icon} />
              <span className='hidden-sm hidden-xs'> {action.label}</span>
            </Button>)}
          </ButtonGroup>

          <ButtonGroup>
            <Button onClick={handleRemoveCell} title="Delete Cell"><FontAwesome name='remove'/></Button>
          </ButtonGroup>
        </ButtonToolbar>
      );

      function compressedView() {
        let name = cell.get('name');
        let type = cell.get('cellType');
        return <div><i>{type}</i> {name}</div>;
      }

      function renderCellView(cellView) {
        return (
          <div>
            { isCompressed ? compressedView() : cellView}
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
    const isCompressed = cell.get('isCompressed');
    return {
      cellPosition,
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
      isCompressed,
    };
  }

  const CellContainer = connect(
    mapStateToProps,
    actionCreators
  )(Cell);

  return CellContainer;
}
