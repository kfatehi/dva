import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

import { List } from 'immutable';
import {Datatable} from './Datatable';
import {DraggableDimension} from './Dimension';
import {BucketMapper} from './BucketMapper';
import {Visualization} from './Visualization';

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
        <h3>Data</h3>
        <Datatable rows={this.props.rows} columns={this.props.columns} />
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
        { this.props.vizSelected ? <BucketMapper
          dragCallback={this.props.draggedToBucket}
          columns={this.props.columns}
          buckets={this.props.vizSelected.get('buckets')}
          bucketMapping={this.props.bucketMap}
        /> : null }
        { this.props.vizConfig ? <Visualization
          extension={this.props.extension}
          config={this.props.vizConfig}
        /> : null }
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    vizExts: state.getIn(['viz', 'available']),
    vizSelected: state.getIn(['viz', 'selected']),
    bucketMap: state.getIn(['viz', 'selected', 'bucketMapping', 'bucketMap']),
    vizConfig: state.getIn(['viz', 'selected', 'config']),
    extension: state.getIn(['viz', 'selected', 'module'])
  };
}

export const WorkspaceContainer = connect(
  mapStateToProps,
  actionCreators
)(Workspace);

export const DragDropWorkspaceContainer = DragDropContext(HTML5Backend)(WorkspaceContainer);
