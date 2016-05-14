import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Codemirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');

export const CellEditor = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let value = this.props.cell.get('func');
    let editing = this.props.cellBeingEdited;
    let ref = `editor-${this.props.cellId}`;
    let getEditor = () => this.refs[ref];
    let editorProps = {
      ref,
      value,
      options: {
        lineNumbers: true,
        mode: 'javascript',
      },
      onChange: (newValue) => value = newValue, 
    }

    let toggleEdit = () => {
      this.props.editingCell(this.props.cellId, !editing);
      getEditor().focus();
    }

    let save = () => {
      this.props.updateCell(this.props.cellId, 'func', value);
      this.props.editingCell(this.props.cellId, false);
    }

    let cancel =  () => {
      return this.props.editingCell(this.props.cellId, false);
    }

    let edit = () => {
      return this.props.editingCell(this.props.cellId, true);
      getEditor().focus();
    }

    if (editing) {
      return (
        <div>
          <Codemirror {...editorProps} />
          <button onClick={save}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      );
    } else {
      return (
        <button onClick={edit}>
          Edit Transform Function
        </button>
      );
    }
  }
});
