import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { reduxForm } from 'redux-form';
import { Map, List, fromJS } from 'immutable';
import { toRowColImmutable as toRowCol } from '../data-converter';
import { parse, getDimensions, getMeasures } from '../dimensions-and-measures';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {Datatable} from './Datatable';
import {DraggableDimension} from './Dimension';
import {BucketMapper} from './BucketMapper';
import {Visualization} from './Visualization';
import { getSchema, getExtensions } from '../../extensions';
import { draggedToBucket } from '../../bucket-mapping';

import './VisualizationCellEditor.css';

function newVisConfig() {
  return Map({
    config: Map({}),
    bucketMapping: Map({
      bucketMap: Map({}),
      columnMap: Map({})
    })
  });
}

export const VisualizationCellEditor = React.createClass({
  mixins: [PureRenderMixin],
  setVisExt: function(e, id) {
    e.preventDefault()
    if (this.props.fields.visExtId.value !== id) {
      const { fields: { visExtId, visConfigJSON  } } = this.props;
      visConfigJSON.onChange('');
      visExtId.onChange(id);
    }
  },
  render: function() {
    const {
      fields: {
        parentId,
        name,
        visExtId,
        visConfigJSON
      },
      getCellName,
      getData,
      cellsBefore,
      handleSubmit,
      handleCancel,
    } = this.props;

    const { rows, columns } = toRowCol(getData())
    const { dimensions, measures } = parse(rows.first());

    let visConfig = null;
    if (visConfigJSON.value.length > 0) {
      visConfig = fromJS(JSON.parse(visConfigJSON.value))
    } else {
      visConfig = newVisConfig()
    }

    let handleDrag = (columnIndex, bucketKey) => {
      let schemaBuckets = getSchema(visExtId.value).buckets;
      let out = draggedToBucket(visConfig, columnIndex, bucketKey, columns, schemaBuckets)
      visConfigJSON.onChange(JSON.stringify(out.toJS()))
    }

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
          dragCallback={handleDrag}
          columns={columns}
          buckets={getSchema(visExtId.value).buckets}
          bucketMapping={visConfig.get('bucketMapping').get('bucketMap')}
        /> : null }

        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    );
  }
});

export const VisualizationCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'visExtId', 'visConfigJSON'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(DragDropContext(HTML5Backend)(VisualizationCellEditor));
