import React from 'react';
import { MarkdownCellEditorForm } from './MarkdownCellEditor';
import cellWrapper from './wrappers/cell';
import ReactMarkdown from 'react-markdown';

export const MarkdownCell = cellWrapper(React.createClass({
  render: function() {
    const {
      cell,
      cellHelpers: {
        renderCell, 
        updateCell,
        cancelEditCell,
      }
    } = this.props
    return renderCell({
      view: <div>
        <h1>{cell.get('name')}</h1>
        <ReactMarkdown source={cell.get('markdown')}/>
      </div>,
      edit: <MarkdownCellEditorForm {...this.props}
        onSubmit={updateCell}
        handleCancel={cancelEditCell}
      />
    });
  }
}))
