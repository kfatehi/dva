import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

import { List } from 'immutable';
import {Datatable} from './Datatable';
import {DraggableDimension} from './Dimension';
import {BucketMapper} from './BucketMapper';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
        
export const Workspace = React.createClass({
  mixins: [PureRenderMixin],
  getDimensions: function() {
    return (this.props.dimensions || List()).map(columnIndex => {
      return {columnIndex, name:this.props.columns.get(columnIndex)}
    });
  },
  getMeasures: function(callback) {
    return (this.props.measures || List()).map(columnIndex => {
      return {columnIndex, name:this.props.columns.get(columnIndex)}
    });
  },
  getExtensions: function(callback) {
    return (this.props.vizExts || List())
  },
  render: function() {
    return (
      <div>
        <h3>Dimensions</h3>
        <ul>{this.getDimensions().map(item =>
          <li className="dimension" key={item.columnIndex}>
            <DraggableDimension columnIndex={item.columnIndex} name={item.name} />
          </li>)}
        </ul>
        <h3>Measures</h3>
        <ul>{this.getMeasures().map(item =>
          <li className="measure" key={item.columnIndex}>
            <DraggableDimension columnIndex={item.columnIndex} name={item.name} />
          </li>)}
        </ul>
        <h3>Visualization Extensions</h3>
        <ul>{this.getExtensions().map(ext =>
          <li key={ext.get('id')}>
            <button onClick={() => this.props.selectExtension(ext.get('id'))}>
              {ext.get('id')}
            </button>
          </li>)}
        </ul>
        { this.props.vizSelected ?
          <BucketMapper
            dragCallback={this.props.draggedToBucket}
            columns={this.props.columns}
            buckets={this.props.vizSelected.get('buckets')}
            bucketMapping={this.props.bucketMap}
          />
          : null }
        <Datatable rows={this.props.rows} columns={this.props.columns} />
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    dimensions: state.getIn(['data', 'sink', 'dimensions']),
    measures: state.getIn(['data', 'sink', 'measures']),
    columns: state.getIn(['data', 'sink', 'columns']),
    rows: state.getIn(['data', 'sink', 'rows']),
    vizExts: state.getIn(['viz', 'available']),
    vizSelected: state.getIn(['viz', 'selected']),
    bucketMap: state.getIn(['viz', 'selected', 'bucketMapping', 'bucketMap']),
  };
}

export const WorkspaceContainer = connect(
  mapStateToProps,
  actionCreators
)(Workspace);

export const DragDropWorkspaceContainer = DragDropContext(HTML5Backend)(WorkspaceContainer);
