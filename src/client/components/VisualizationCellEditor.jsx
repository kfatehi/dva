import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { fromJS } from 'immutable';

export const VisualizationCellEditor = React.createClass({
  mixins: [PureRenderMixin],
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
      return (
        <div>
          <label>Data Source</label>
          <select
            defaultValue={fields.parentId}
            onChange={ev=>fields.parentId=ev.target.value}
          >{this.props.cellsBefore.map(id =>
            <option key={id} value={id}>{this.props.cellsById.get(id).get('name')}</option>)}
          </select>
          <label>Name</label>
          <input type="text"
            onChange={ev=>fields.name=ev.target.value}
            defaultValue={fields.name} />
          <div>viz goes here still</div>
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
