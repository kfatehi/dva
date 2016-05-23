import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Datatable } from './Datatable';
import { hookHandler as hook } from '../editor-utils';

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
      otherCellsWithData,
      getCellName,
      handleSubmit,
      handleCancel
    } = this.props

    function getDataPreview(parentId, cmValue) {
      try {
        return getData({
          parentOverride: parentId,
          funcOverride: cmValue
        });
      } catch (e) {
        return e.stack;
      }
    }

    let cmVal = func.value;

    let editorProps = {
      onChange: value => {
        cmVal = value;
        let data = getDataPreview(parentId.value, value);
        this.refs.preview.replaceState({ data });
      },
      onFocusChange: (focused) => {
        func.onChange(cmVal);
        this.refs.preview.replaceState({ 
          data: getDataPreview(parentId.value, cmVal)
        });
      },
      value: func.value,
      options: {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'tomorrow-night-bright'
      },
    }

    return (
      <form onSubmit={hook(handleSubmit,()=>func.onChange(cmVal))}>
        <label>Data Source</label>
        <select {...parentId}>{otherCellsWithData.map(id =>
          <option key={id} value={id}>{getCellName(id)}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <Codemirror {...editorProps} />
        <Datatable ref='preview' data={getDataPreview(parentId.value, func.value)} />
        <ButtonGroup>
          <Button bsStyle="success" type="submit">Save</Button>
          <Button bsStyle="danger" onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      </form>
    );
  }
});

export const TransformCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'func'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(TransformCellEditor);
