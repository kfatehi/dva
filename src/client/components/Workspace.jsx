import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

import {Datatable} from './Datatable';

export const Workspace = React.createClass({
  mixins: [PureRenderMixin],
  getDimensions: function() {
    return (this.props.dimensions || []).map(i => {
      return this.props.columns.get(i)
    });
  },
  getMeasures: function(callback) {
    return (this.props.measures || []).map(i => {
      return this.props.columns.get(i)
    });
  },
  getExtensions: function(callback) {
    return [{
      id: 'barchart'
    }]
  },
  render: function() {
    return (
      <div>
        <h3>Dimensions</h3>
        <ul>{this.getDimensions().map((name, i) =>
          <li className="dimension" key={i}>{name}</li>)}
        </ul>
        <h3>Measures</h3>
        <ul>{this.getMeasures().map((name, i) =>
          <li className="measure" key={i}>{name}</li>)}
        </ul>
        <h3>Extensions</h3>
        <ul>{this.getExtensions().map(ext =>
          <li key={ext.id}>
            <button onClick={() => this.props.chooseExtension(ext.id)}>
              {ext.id}
            </button>
          </li>)}
        </ul>
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
  return { rows, columns, dimensions, measures };
}

export const WorkspaceContainer = connect(
  mapStateToProps,
  actionCreators
)(Workspace);
