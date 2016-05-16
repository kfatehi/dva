import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { fromJS } from 'immutable';
import * as actionCreators from '../action-creators';
import Codemirror from 'react-codemirror';
import ReactMarkdown from 'react-markdown';
import 'codemirror/mode/markdown/markdown';

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
      onChange: markdown.onChange,
      value: markdown.value,
      options: {
        lineNumbers: true,
        mode: 'markdown',
      },
    }

    return (
      <form onSubmit={handleSubmit}>
        <Codemirror {...editorProps} />
        <ReactMarkdown source={markdown.value}/>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    );
  }
});

export const MarkdownCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['markdown'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(MarkdownCellEditor);
