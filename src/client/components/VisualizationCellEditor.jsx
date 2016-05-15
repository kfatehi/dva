import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { List, fromJS } from 'immutable';
import { toRowColImmutable as toRowCol } from '../data-converter';
import { parse, getDimensions, getMeasures } from '../dimensions-and-measures';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {Datatable} from './Datatable';
import {DraggableDimension} from './Dimension';
import {BucketMapper} from './BucketMapper';
import {Visualization} from './Visualization';
import { getSchema, getExtensions } from '../../extensions';

import './VisualizationCellEditor.css';

export const VisualizationCellEditor = React.createClass({
  mixins: [PureRenderMixin],
  setVisExt: function(e, id) {
    e.preventDefault()
    this.props.fields.visExtId.onChange(id);
  },
  render: function() {
    const {
      fields: {
        parentId,
        name,
        visExtId,
        bucketMapping
      },
      getCellName,
      getData,
      cellsBefore,
      handleSubmit,
      handleCancel,
    } = this.props;


    let deserialize = (value) => {
      return value.length > 0 ? JSON.parse(value) : {}
    }
    const { rows, columns } = toRowCol(getData())
    const { dimensions, measures } = parse(rows.first());
    return (
      <form onSubmit={handleSubmit}>
        <label>Data Source</label>
        <select {...parentId}>{cellsBefore.map(id =>
          <option key={id} value={id}>{getCellName(id)}</option>)}
        </select>
        <label>Name</label>
        <input type="text" {...name} />

        <h3>Data</h3>
        <Datatable rows={rows} columns={columns} />

        <h3>Dimensions</h3>
        <ul>{getDimensions(dimensions, columns).map(item =>
          <li className="dimension" key={item.columnIndex}>
            <DraggableDimension columnIndex={item.columnIndex} name={item.name} />
          </li>)}
        </ul>

        <h3>Measures</h3>
        <ul>{getMeasures(measures, columns).map(item =>
          <li className="measure" key={item.columnIndex}>
            <DraggableDimension columnIndex={item.columnIndex} name={item.name} />
          </li>)}
        </ul>

        <h3>Visualization Extensions</h3>
        <ul>{getExtensions().map(ext =>
          <li key={ext.info.id}>
            <button onClick={(e) => this.setVisExt(e, ext.info.id)}
              className={visExtId.value === ext.info.id ? 'vis-selected' : null}>
              {ext.info.id}
            </button>
          </li>)}
        </ul>

        { visExtId.value.length > 0 ? <BucketMapper
          dragCallback={this.props.draggedToBucket}
          columns={columns}
          buckets={getSchema(visExtId.value).buckets}
          bucketMapping={deserialize(bucketMapping.value)}
        /> : null }

        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    );
  }
});

export const VisualizationCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'visExtId', 'bucketMapping'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(DragDropContext(HTML5Backend)(VisualizationCellEditor));
