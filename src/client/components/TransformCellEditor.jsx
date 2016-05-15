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
  render: function() {
    const {
      fields: {
        parentId,
        name,
        func
      },
      getData,
      cellsBefore,
      getCellName,
      handleSubmit,
      handleCancel
    } = this.props

    let broken = false;

    function getDataPreview(parentId, funcValue) {
      try {
        broken = false;
        return JSON.stringify(getData({
          parentOverride: parentId,
          funcOverride: funcValue
        }), null, 2);
      } catch (e) {
        broken = true;
        return e.stack;
      }
    }

    let editorProps = {
      onChange: func.onChange,
      value: func.value,
      options: {
        lineNumbers: true,
        mode: 'javascript',
      },
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Data Source</label>
        <select {...parentId}>{cellsBefore.map(id =>
          <option key={id} value={id}>{getCellName(id)}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <Codemirror {...editorProps} />
        <pre ref="preview">{getDataPreview(parentId.value, func.value)}</pre>
        <button disabled={broken} type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    );
  }
});

export const TransformCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'func'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(TransformCellEditor);
