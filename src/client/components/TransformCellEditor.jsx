import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import { Datatable } from './Datatable';
import { hookHandler as hook } from '../editor-utils';
import {
  Button, ButtonGroup,
  FormGroup, FormControl,
  ControlLabel, Col
} from 'react-bootstrap';

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

    let saveButtonStyle = {
      marginRight:'10px',
      fontWeight: 'bold'
    }

    let cancelButtonStyle = {
      fontWeight: 'bold'
    }

    return (
      <form className="form-horizontal" onSubmit={hook(handleSubmit,()=>func.onChange(cmVal))}>
        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Data Source</ControlLabel>
          </Col>
          <Col xs={10}>
            <select className="form-control" {...parentId}>{otherCellsWithData.map(id =>
              <option key={id} value={id}>{getCellName(id)}</option>)}
            </select>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Name</ControlLabel>
          </Col>
          <Col xs={10}>
            <input className="form-control" type="text" {...name} />
          </Col>
        </FormGroup>

        <Codemirror {...editorProps} />
        <Datatable ref='preview' data={getDataPreview(parentId.value, func.value)} />

        <div className="pull-right">
          <Button style={saveButtonStyle} type="submit">Save</Button>
          <Button style={cancelButtonStyle} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    );
  }
});

export const TransformCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'func'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(TransformCellEditor);
