import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Codemirror from 'react-codemirror';
import { fromJS } from 'immutable';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');

export const CellEditor = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let fields = {
      func: this.props.cell.get('func'),
      name: this.props.cell.get('name'),
      parentId: this.props.cell.get('parentId')
    }

    let editing = this.props.cellBeingEdited;
    let ref = `editor-${this.props.cellId}`;
    let getEditor = () => this.refs[ref];
    let editorProps = {
      ref,
      value:fields.func,
      options: {
        lineNumbers: true,
        mode: 'javascript',
      },
      onChange: (newValue) => fields.func = newValue, 
    }

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
            <option value={id}>{this.props.cellsById.get(id).get('name')}</option>)}
          </select>
          <label>Name</label>
          <input type="text"
            onChange={ev=>fields.name=ev.target.value}
            defaultValue={fields.name} />
          <Codemirror {...editorProps} />
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
