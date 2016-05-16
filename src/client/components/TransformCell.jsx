import React from 'react';
import { TransformCellEditorForm } from './TransformCellEditor';
import cellWrapper from './wrappers/cell';
import {Datatable} from './Datatable';

export const TransformCell = cellWrapper(React.createClass({
  render: function() {
    const {
      cell,
      getData,
      cellHelpers: {
        renderCell, 
        updateCell,
        cancelEditCell,
      }
    } = this.props
    return renderCell({
      view: <div>
        <h1>{cell.get('name')}</h1>
        <Datatable data={getData()} />
      </div>,
      edit: <TransformCellEditorForm {...this.props}
        onSubmit={updateCell}
        handleCancel={cancelEditCell}
      />
    });
  }
}))
