import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { hookHandler as hook } from '../editor-utils';
import {
  Button, ButtonGroup,
  FormGroup, FormControl,
  ControlLabel, Col
} from 'react-bootstrap';

export const NotebookHeaderEditor = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      fields: {
        name,
        isPublic,
      },
      handleSubmit,
      handleCancel
    } = this.props;

    let saveButtonStyle = {
      marginRight:'10px',
      fontWeight: 'bold'
    }

    let cancelButtonStyle = {
      fontWeight: 'bold'
    }

    let processData = function() {
      data.onChange(cmVal)
    }

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>

        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Name</ControlLabel>
          </Col>
          <Col xs={10}>
            <input className="form-control" type="text" {...name} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Visibility</ControlLabel>
          </Col>
          <Col xs={10} >
            <label>
              <input type="radio" {...isPublic} value='true' checked={String(isPublic.value) === 'true'}/> Public
            </label>
            <label>
              <input type="radio" {...isPublic} value='false' checked={String(isPublic.value) === 'false'}/> Private
            </label>
          </Col>
        </FormGroup>

        <div className="pull-right">
          <Button style={saveButtonStyle} type="submit">Save</Button>
          <Button style={cancelButtonStyle} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    );
  }
});

export const NotebookHeaderEditorForm = reduxForm({
  form: 'notebook',
  fields: ['name', 'isPublic'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(NotebookHeaderEditor);
