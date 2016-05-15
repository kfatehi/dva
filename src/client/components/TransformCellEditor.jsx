import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

export const TransformCellEditor = React.createClass({
  mixins: [PureRenderMixin],
  edit: function() {
    return this.props.editCell(this.props.cellId)
  },
  save: function(e) {
    e.preventDefault();
    return this.props.editCellSave(this.props.cellId)
  },
  cancel: function() {
    return this.props.editCellCancel(this.props.cellId)
  },
  getCellName: function(id) {
    return this.props.cellsById.get(id).get('name');
  },
  render: function() {
    const {
      fields: {
        parentId,
        name,
        func
      },
      handleSubmit,
      editing
    } = this.props

    let ref = `editor-${this.props.cellId}`;

    let getEditor = () => this.refs[ref];

    let editorProps = {
      ref,
      value:func.initialValue,
      options: {
        lineNumbers: true,
        mode: 'javascript',
      },
      onChange: (newValue) => {
        this.refs.preview.textContent = getDataPreview(newValue)
      }
    }

    let getDataPreview = (funcValue) => {
      try {
        let data = this.props.getData({funcOverride:funcValue})
        return JSON.stringify(data, null, 2);
      } catch (e) {
        return e.stack;
      }
    }


    if (editing) {
      return (
        <form onSubmit={this.save}>
          <label>Data Source</label>
          <select {...parentId}>{this.props.cellsBefore.map(id =>
            <option key={id} value={id}>{this.getCellName(id)}</option>)}
          </select>
          <label>Name</label>
          <input type="text" {...name} />
          <Codemirror {...editorProps} />
          <pre ref="preview">{getDataPreview(func.value)}</pre>
          <button type="submit">Save</button>
          <button onClick={this.cancel}>Cancel</button>
        </form>
      );
    } else {
      return (
        <button onClick={this.edit}>Edit</button>
      );
    }
  }
});

export const TransformCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'func'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(TransformCellEditor);
