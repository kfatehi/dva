import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Datatable } from './Datatable';
import debounce from 'debounce';

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

    let broken = false;

    function getDataPreview(data, contentType) {
      try {
        broken = false;
        console.log(data, contentType);
        return getData({
          dataOverride: data,
          contentTypeOverride: contentType
        });
      } catch (e) {
        broken = true;
        return e.stack;
      }
    }

    let editorProps = {
      onChange: debounce(data.onChange, 200),
      value: data.value,
      options: { theme: 'tomorrow-night-bright' }
    }

    let contentTypes = [{
      id: 'application/json',
    },{
      id: 'text/csv',
    }]

    return (
      <form onSubmit={handleSubmit}>
        <label>Content Type</label>
        <select {...contentType}>{contentTypes.map(ct =>
          <option key={ct.id} value={ct.id}>{ct.id}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <Codemirror {...editorProps} />
        <Datatable data={getDataPreview(data.value, contentType.value)} />
        <ButtonGroup>
          <Button bsStyle="success" disabled={broken} type="submit">Save</Button>
          <Button bsStyle="danger" onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      </form>
    );
  }
});

export const DataCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['name', 'data', 'contentType'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(DataCellEditor);
