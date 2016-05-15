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
  getDataPreview: function (funcValue) {
    try {
      return JSON.stringify(this.props.getData({
        funcOverride: funcValue
      }), null, 2);
    } catch (e) {
      return e.stack;
    }
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

    let editorProps = {
      value:func.initialValue,
      options: {
        lineNumbers: true,
        mode: 'javascript',
      },
      onChange: (newValue) => {
        this.refs.preview.textContent = this.getDataPreview(newValue)
      }
    }
    return (
      <form onSubmit={this.save}>
        <label>Data Source</label>
        <select {...parentId}>{this.props.cellsBefore.map(id =>
          <option key={id} value={id}>{this.getCellName(id)}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <Codemirror {...editorProps} />
        <pre ref="preview">{this.getDataPreview(func.value)}</pre>
        <button type="submit">Save</button>
        <button onClick={this.cancel}>Cancel</button>
      </form>
    );
  }
});

export const TransformCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'func'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(TransformCellEditor);
