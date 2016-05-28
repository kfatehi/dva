import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import ReactMarkdown from 'react-markdown';
import 'codemirror/mode/markdown/markdown';
import { hookHandler as hook } from '../editor-utils';
import {
  Button, ButtonGroup,
  FormGroup, FormControl,
  ControlLabel, Col,
  Row
} from 'react-bootstrap';

const Markdown = React.createClass({
  getInitialState: function() {
    return { source: '' }
  },
  render: function() {
    let source = this.state.source || this.props.source || '';
    return <ReactMarkdown source={source}/>;
  }
})

export const MarkdownCellEditor = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      fields: {
        markdown
      },
      cellsBefore,
      getCellName,
      handleSubmit,
      handleCancel
    } = this.props

    let cmVal = markdown.value;

    let editorProps = {
      onChange: source => {
        cmVal = source;
        this.refs.preview.replaceState({ source });
      },
      onFocusChange: (focused) => {
        markdown.onChange(cmVal);
        this.refs.preview.replaceState({ 
          source: cmVal
        });
      },
      value: markdown.value,
      options: {
        lineNumbers: true,
        mode: 'markdown',
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
      <form onSubmit={hook(handleSubmit,()=>markdown.onChange(cmVal))}>
        <Row>
          <Col sm={6}>
            <Codemirror {...editorProps} />

            <div className="pull-right">
              <Button className="btn-primary" style={saveButtonStyle} type="submit">Save</Button>
              <Button style={cancelButtonStyle} onClick={handleCancel}>Cancel</Button>
            </div>

          </Col>
          <Col sm={6}>
            <Markdown ref="preview" source={markdown.value}/>
          </Col>
        </Row>
      </form>
    );
  }
});

export const MarkdownCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['markdown'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(MarkdownCellEditor);
