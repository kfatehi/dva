import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { List, fromJS } from 'immutable';
import { DragDropWorkspaceContainer } from './Workspace';
import { toRowColImmutable as toRowCol } from '../data-converter';
import parseDimensionsMeasures from '../parse-dimensions-measures';

export const VisualizationCellEditor = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      fields: {
        parentId,
        name
      },
      getCellName,
      getData,
      cellsBefore,
      handleSubmit,
      handleCancel,
    } = this.props;
    const { rows, columns } = toRowCol(getData())
    const { dimensions, measures } = parseDimensionsMeasures(rows.first());
    const workspaceProps = { dimensions, measures, rows, columns }
    return (
      <form onSubmit={handleSubmit}>
        <label>Data Source</label>
        <select {...parentId}>{cellsBefore.map(id =>
          <option key={id} value={id}>{getCellName(id)}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />
        <DragDropWorkspaceContainer {...workspaceProps} />
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    );
  }
});

export const VisualizationCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(VisualizationCellEditor);
