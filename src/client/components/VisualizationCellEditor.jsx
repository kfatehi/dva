import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { List, fromJS } from 'immutable';
import { DragDropWorkspaceContainer } from './Workspace';
import { toRowColImmutable as toRowCol } from '../data-converter';
import parseDimensionsMeasures from '../parse-dimensions-measures';

export const VisualizationCellEditor = React.createClass({
  mixins: [PureRenderMixin],
  onChangeDataSource: function(ev) {
    ev=>fields.parentId=ev.target.value
  },
  render: function() {
    let fields = {
      name: this.props.cell.get('name'),
      parentId: this.props.cell.get('parentId'),
      visExtId: this.props.cell.get('visExtId'),
      visConfig: this.props.cell.get('visConfig'),
    }

    let editing = this.props.cellBeingEdited;

    let toggleEdit = () => {
      this.props.editingCell(this.props.cellId, !editing);
      getEditor().focus();
    }

    let save = () => {
      fromJS(fields).map(
        (v, k) => this.props.updateCell(this.props.cellId, k, v)
      );
      return this.props.editingCell(this.props.cellId, false);
    }

    let cancel =  () => {
      return this.props.editingCell(this.props.cellId, false);
    }

    let edit = () => {
      return this.props.editingCell(this.props.cellId, true);
      getEditor().focus();
    }

    if (editing) {
      let { rows, columns } = toRowCol(this.props.getData())
      let { dimensions, measures } = parseDimensionsMeasures(rows.first());
      return (
        <div>
          <label>Data Source</label>
          <select
            defaultValue={fields.parentId}
            onChange={this.onChangeDataSource}
          >{this.props.cellsBefore.map(id =>
            <option key={id} value={id}>{this.props.cellsById.get(id).get('name')}</option>)}
          </select>
          <label>Name</label>
          <input type="text"
            onChange={ev=>fields.name=ev.target.value}
            defaultValue={fields.name} />
          <DragDropWorkspaceContainer
            dimensions={dimensions}
            measures={measures}
            columns={columns}
            rows={rows}
          />
          <button onClick={save}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      );
    } else {
      return (
        <button onClick={edit}>Edit</button>
      );
    }
  }
});
