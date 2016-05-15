import React from 'react';
import cellWrapper from './wrappers/cell';

export const DataCell = cellWrapper(React.createClass({
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
      </div>
    });
  }
}))
