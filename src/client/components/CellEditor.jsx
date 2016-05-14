import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Codemirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');

export const CellEditor = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let editing = this.props.cellBeingEdited;
    let ref = `editor-${this.props.cellId}`;
    let editorProps = {
      ref,
      value: this.props.cell.get('func'),
      options: {
        lineNumbers: true,
        mode: 'javascript',
      },
      onChange: (newCode) => {

      }
    }
    let toggleEdit = () => {
      this.props.editingCell(this.props.cellId, !editing)
      this.refs[ref].focus()
    }

    let save =  () => {
      return this.props.editingCell(this.props.cellId, false);
    }

    let cancel =  () => {
      return this.props.editingCell(this.props.cellId, false);
    }

    let edit = () => {
      return this.props.editingCell(this.props.cellId, true);
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
