import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import { Datatable } from './Datatable';
import { hookHandler as hook } from '../editor-utils';
import {
  Button, ButtonGroup,
  FormGroup, FormControl,
  ControlLabel, Col
} from 'react-bootstrap';
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

    function getDataPreview(data, parser) {
      try {
        return getData({ data, parser });
      } catch (e) {
        return e.stack;
      }
    }

    let cmVal = data.value;

    let updatePreview = () => {
      this.refs.preview.replaceState({ 
        data: getDataPreview(cmVal, parser.value)
      });
    }

    let debouncedUpdatePreview = debounce(updatePreview, 400);

    let editorProps = {
      onChange: value => {
        cmVal = value;
        debouncedUpdatePreview();
      },
      onFocusChange: (focused) => {
        data.onChange(cmVal);
        updatePreview()
      },
      value: data.value,
      options: { theme: 'tomorrow-night-bright' }
    }

    let parserOptions = [{
      id: 'json',
    },{
      id: 'csv',
    }]

    let saveButtonStyle = {
      marginRight:'10px',
      fontWeight: 'bold'
    }

    let cancelButtonStyle = {
      fontWeight: 'bold'
    }

    return (
      <form className="form-horizontal" onSubmit={hook(handleSubmit,()=>data.onChange(cmVal))}>

        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Data Name</ControlLabel>
          </Col>
          <Col xs={10}>
            <input className="form-control" type="text" {...name} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Content Type</ControlLabel>
          </Col>
          <Col xs={10} >
            <select className="form-control" type="select"
             {...parser}>{parserOptions.map(ct =>
              <option key={ct.id} value={ct.id}>{ct.id}</option>)}
            </select>
          </Col>
        </FormGroup>

        <Codemirror {...editorProps} />
        <Datatable ref='preview' data={getDataPreview(data.value, parser.value)} />

        <div className="pull-right">
          <Button style={saveButtonStyle} type="submit">Save</Button>
          <Button style={cancelButtonStyle} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    );
  }
});

export const DataCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['name', 'data', 'parser'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(DataCellEditor);
