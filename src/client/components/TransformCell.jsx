import React from 'react';
import { TransformCellEditorForm } from './TransformCellEditor';
import cellWrapper from './wrappers/cell';

export const TransformCell = cellWrapper(React.createClass({
  render: function() {
    const {
      cell,
      cellHelpers: {
        renderCell, 
        updateCell,
        cancelEditCell,
        getCellDataAsPrettyJSON
      }
    } = this.props
    return renderCell({
      view: <div>
        <h1>{cell.get('name')}</h1>
        <pre>{getCellDataAsPrettyJSON()}</pre>
      </div>,
      edit: <TransformCellEditorForm {...this.props}
        onSubmit={updateCell}
        handleCancel={cancelEditCell}
      />
    });
  }
}))
