import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import ReactMarkdown from 'react-markdown';
import 'codemirror/mode/markdown/markdown';
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import debounce from 'debounce';

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

    let editorProps = {
      onChange: debounce(markdown.onChange, 200),
      value: markdown.value,
      options: {
        lineNumbers: true,
        mode: 'markdown',
        theme: 'tomorrow-night-bright'
      },
    }

    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Codemirror {...editorProps} />
            <ButtonGroup>
              <Button bsStyle="success" type="submit">Save</Button>
              <Button bsStyle="danger" onClick={handleCancel}>Cancel</Button>
            </ButtonGroup>
          </Col>
          <Col sm={6}>
            <ReactMarkdown source={markdown.value}/>
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
