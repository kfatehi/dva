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

    let broken = false;

    function getDataPreview(parentId, funcValue) {
      try {
        broken = false;
        return getData({
          parentOverride: parentId,
          funcOverride: funcValue
        });
      } catch (e) {
        broken = true;
        return e.stack;
      }
    }

    let editorProps = {
      onChange: debounce(func.onChange, 200),
      value: func.value,
      options: {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'tomorrow-night-bright'
      },
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Data Source</label>
        <select {...parentId}>{otherCellsWithData.map(id =>
          <option key={id} value={id}>{getCellName(id)}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <Codemirror {...editorProps} />
        <Datatable data={getDataPreview(parentId.value, func.value)} />
        <ButtonGroup>
          <Button bsStyle="success" disabled={broken} type="submit">Save</Button>
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
