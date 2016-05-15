import React from 'react';
import cellWrapper from './wrappers/cell';
import { VisualizationCellEditorForm } from './VisualizationCellEditor';
import { Visualization } from './Visualization';

export const VisualizationCell = cellWrapper(React.createClass({
  render: function() {
    const {
      cell,
      getData,
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
        <Visualization
          visExtId={cell.get('visExtId')}
          visConfigJSON={cell.get('visConfigJSON')}
          getData={getData}
        />
      </div>,
      edit: <VisualizationCellEditorForm {...this.props}
        onSubmit={updateCell}
        handleCancel={cancelEditCell}
      />
    });
  }
}))
