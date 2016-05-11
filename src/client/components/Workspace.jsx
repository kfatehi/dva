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
    return (this.props.dimensions || List()).map(i => {
      return this.props.columns.get(i)
    });
  },
  getMeasures: function(callback) {
    return (this.props.measures || List()).map(i => {
      return this.props.columns.get(i)
    });
  },
  getExtensions: function(callback) {
    return (this.props.vizExts || List())
  },
  render: function() {
    return (
      <div>
        <h3>Dimensions</h3>
        <ul>{this.getDimensions().map((name, i) =>
          <li className="dimension" key={i}>
            <DraggableDimension columnIndex={i} name={name} />
          </li>)}
        </ul>
        <h3>Measures</h3>
        <ul>{this.getMeasures().map((name, i) =>
          <li className="measure" key={i}>{name}</li>)}
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
            buckets={this.props.vizSelected.get('buckets')} />
          : null }
        <Datatable rows={this.props.rows} columns={this.props.columns} />
      </div>
    );
  }
})

function mapStateToProps(state) {
  const dimensions = state.getIn(['data', 'sink', 'dimensions']);
  const measures = state.getIn(['data', 'sink', 'measures']);
  const columns = state.getIn(['data', 'sink', 'columns']);
  const rows = state.getIn(['data', 'sink', 'rows']);
  const vizExts = state.getIn(['viz', 'available']);
  const vizSelected = state.getIn(['viz', 'selected']);
  return { rows, columns, dimensions, measures, vizExts, vizSelected };
}

export const WorkspaceContainer = connect(
  mapStateToProps,
  actionCreators
)(Workspace);

export const DragDropWorkspaceContainer = DragDropContext(HTML5Backend)(WorkspaceContainer);
