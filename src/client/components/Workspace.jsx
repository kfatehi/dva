import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

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
  render: function() {
    return (
      <div>
        <h3>Dimensions</h3>
        <ul>{this.getDimensions().map((name, i) =>
          <li key={i}>{name}</li>)}
        </ul>
        <h3>Measures</h3>
        <ul>{this.getMeasures().map((name, i) =>
          <li key={i}>{name}</li>)}
        </ul>
      </div>
    );
  }
})

function mapStateToProps(state) {
  const dimensions = state.getIn(['data', 'sink', 'dimensions']);
  const measures = state.getIn(['data', 'sink', 'measures']);
  const columns = state.getIn(['data', 'sink', 'columns']);
  return { columns, dimensions, measures };
}

export const WorkspaceContainer = connect(
  mapStateToProps,
  actionCreators
)(Workspace);
