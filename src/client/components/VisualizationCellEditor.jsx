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
  ControlLabel, Col, Row
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
        <Row>
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
              <ControlLabel>Visualization</ControlLabel>
           </Col>
            <Col xs={10}>
              <select classname="form-control" {...visExtId}>{getExtensions().map(ext =>
                <option key={ext.info.id} value={ext.info.id}>
                  {ext.info.description}
                </option>)}
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
        </Row>

        <Row>
          <Col xs={12}><Datatable rows={rows} columns={columns} /></Col>
        </Row>

        <Row>
          <Col sm={4}>
            <Col xs={6} sm={12}>
              <div className="well">
                <ControlLabel>Dimensions</ControlLabel>
                <ul>{getDimensions(dimensions, columns).map(item =>
                  <li className="dimension" key={item.columnIndex}>
                    <DraggableDimension columnIndex={item.columnIndex} name={item.name} />
                  </li>)}
                </ul>

                <ControlLabel>Measures</ControlLabel>
                <ul>{getMeasures(measures, columns).map(item =>
                  <li className="measure" key={item.columnIndex}>
                    <DraggableDimension columnIndex={item.columnIndex} name={item.name} />
                  </li>)}
                </ul>
              </div>
            </Col>

            { schema
              ?
            <Col xs={6} sm={12}>
              <div className="well">
                <BucketMapper
                  dragCallback={handleDrag}
                  columns={columns}
                  buckets={schema.buckets}
                  bucketMapping={bucketMap}
                />
              </div>
            </Col>
            : null }
          </Col>

          <Col xs={12} sm={8}>
            { schema && bucketsFilled(schema.buckets, bucketMap)
              ? 
            <Visualization
              visExtId={visExtId.value}
              visConfigJSON={visConfigJSON.value}
              getData={dataGetter}
            /> : null }
          </Col>
        </Row>

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
