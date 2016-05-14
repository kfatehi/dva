import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import getCellData from '../get-cell-data';
import Codemirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');

require('codemirror/lib/codemirror.css');


export const NotebookCell = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let cell = this.props.cellsById.get(this.props.cellId);
    switch (cell.get('cellType')) {
      case 'DATA':
        return this.renderDataCell(cell);
      case 'TRANSFORM':
        return this.renderTransformCell(cell);
    }
    return null;
  },
  getCellDataAsPrettyJSON: function(cell) {
    const data = getCellData(this.props.cellsById, this.props.cellId);
    return JSON.stringify(data, null, 2)
  },
  renderDataCell: function(cell) {
    return <div>
      <h1>{cell.get('name')}</h1>
      <pre>{this.getCellDataAsPrettyJSON()}</pre>
    </div>;
  },
  renderTransformCell: function(cell) {
    let editing = cell.get('editing');
    let editorProps = {
      value: cell.get('func'),
      options: {
        lineNumbers: true,
        mode: 'javascript',
        readOnly: !editing
      },
      onChange: (newCode) => {

      }
    }
    return <div>
      <button onClick={() => this.props.editingCell(this.props.cellId, !editing)}>
        { editing ? 'Save' : 'Edit' }
      </button>
      <h1>{cell.get('name')}</h1>
      <Codemirror {...editorProps} />
      <pre>{this.getCellDataAsPrettyJSON()}</pre>
    </div>;
  }
})

