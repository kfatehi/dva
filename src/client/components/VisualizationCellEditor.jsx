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
import { getModule, getSchema, getExtensions } from '../../extensions';
import { draggedToBucket } from '../../bucket-mapping';
import { bucketsFilled, mkVisConfigFromJSON } from '../../vis';

import {
  Button, ButtonGroup,
  FormGroup, FormControl,
  ControlLabel, Col
} from 'react-bootstrap';

import './VisualizationCellEditor.css';

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
      otherCellsWithData,
      handleSubmit,
      handleCancel,
    } = this.props;

    let dataGetter = () => getData({
      parentOverride: parentId.value
    })

    const { rows, columns } = toRowCol(dataGetter())
    const { dimensions, measures } = parse(rows.first());

    let visConfig = mkVisConfigFromJSON(visConfigJSON.value);

    let bucketMap = visConfig.get('bucketMapping').get('bucketMap')

    let handleDrag = (columnIndex, bucketKey) => {
      let schemaBuckets = getSchema(visExtId.value).buckets;
      let out = draggedToBucket(visConfig, columnIndex, bucketKey, columns, schemaBuckets)
      visConfigJSON.onChange(JSON.stringify(out.toJS()))
    }

    let handleParentChange = (e) => {
      visConfigJSON.onChange('');
      parentId.onChange(e);
    }

    let schema = null
    if (visExtId.value.length > 0) {
      schema = getSchema(visExtId.value)
    }

    let saveButtonStyle = {
      marginRight:'10px',
      fontWeight: 'bold'
    }

    let cancelButtonStyle = {
      fontWeight: 'bold'
    }

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>

        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Data Source</ControlLabel>
          </Col>
          <Col xs={10}>
            <select classname="form-control" {...parentId} onChange={handleParentChange}>{otherCellsWithData.map(id =>
              <option key={id} value={id}>{getCellName(id)}</option>)}
            </select>
          </Col>
        </FormGroup>
        
        <FormGroup>
          <Col xs={2}>
            <ControlLabel>Name</ControlLabel>
         </Col>
          <Col xs={10}>
            <input className="form-control" type="text" {...name} />
          </Col>
        </FormGroup>

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
              {ext.info.description}
            </button>
          </li>)}
        </ul>

        { schema
          ?
        <div>
          <BucketMapper
            dragCallback={handleDrag}
            columns={columns}
            buckets={schema.buckets}
            bucketMapping={bucketMap}
          />
          { bucketsFilled(schema.buckets, bucketMap)
            ? 
          <Visualization
            visExtId={visExtId.value}
            visConfigJSON={visConfigJSON.value}
            getData={dataGetter}
          /> : null }
        </div> : null }
        <div className="pull-right">
          <Button className="btn-primary" style={saveButtonStyle} type="submit">Save</Button>
          <Button style={cancelButtonStyle} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    );
  }
});

export const VisualizationCellEditorForm = reduxForm({
  form: 'cell',
  fields: ['parentId', 'name', 'visExtId', 'visConfigJSON'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(DragDropContext(HTML5Backend)(VisualizationCellEditor));
