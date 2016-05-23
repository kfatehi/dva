import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Datatable } from './Datatable';
import debounce from 'debounce';

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

    function getDataPreview(parentId, funcValue) {
      try {
        return getData({
          parentOverride: parentId,
          funcOverride: funcValue
        });
      } catch (e) {
        return e.stack;
      }
    }

    let editorValue = func.value;

    let editorProps = {
      onChange: value => {
        editorValue = value;
        let data = getDataPreview(parentId.value, value);
        this.refs.datatable.replaceState({ data });
      },
      value: func.value,
      options: {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'tomorrow-night-bright'
      },
    }

    function _handleSubmit(e) {
      e.persist();
      func.onChange(editorValue);
      setTimeout(function() {
        handleSubmit(e);
      },0);
    }

    return (
      <form onSubmit={_handleSubmit}>
        <label>Data Source</label>
        <select {...parentId}>{otherCellsWithData.map(id =>
          <option key={id} value={id}>{getCellName(id)}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <Codemirror {...editorProps} />
        <Datatable ref='datatable' data={getDataPreview(parentId.value, func.value)} />
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
