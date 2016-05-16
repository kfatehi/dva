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
      view: <ReactMarkdown source={cell.get('markdown')}/>,
      edit: <MarkdownCellEditorForm {...this.props}
        onSubmit={updateCell}
        handleCancel={cancelEditCell}
      />
    });
  }
}))
