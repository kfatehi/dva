import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Datatable } from './Datatable';
import { hookHandler as hook } from '../editor-utils';

export const DataCellEditor = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      fields: {
        name,
        data,
        parser,
      },
      getData,
      otherCellsWithData,
      getCellName,
      handleSubmit,
      handleCancel
    } = this.props

    function getDataPreview(data, parser) {
      try {
        return getData({ data, parser });
      } catch (e) {
        return e.stack;
      }
    }

    let cmVal = data.value;

    let editorProps = {
      onChange: value => {
        cmVal = value;
        let data = getDataPreview(value, parser.value);
        this.refs.datatable.replaceState({ data });
      },
      value: data.value,
      options: { theme: 'tomorrow-night-bright' }
    }

    let parserOptions = [{
      id: 'json',
    },{
      id: 'csv',
    }]

    return (
      <form onSubmit={hook(handleSubmit,()=>data.onChange(cmVal))}>
        <label>Content Type</label>
        <select {...parser}>{parserOptions.map(ct =>
          <option key={ct.id} value={ct.id}>{ct.id}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <Codemirror {...editorProps} />
        <Datatable ref='datatable' data={getDataPreview(data.value, parser.value)} />
        <ButtonGroup>
          <Button bsStyle="success" type="submit">Save</Button>
          <Button bsStyle="danger" onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      </form>
    );
  }
});

export const DataCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['name', 'data', 'parser'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(DataCellEditor);
