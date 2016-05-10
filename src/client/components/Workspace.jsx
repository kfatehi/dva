import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

export const Workspace = React.createClass({
  mixins: [PureRenderMixin],
  getSource: function() {
    return this.props.data && this.props.data.source ?
      JSON.stringify(this.props.data.source) :
      '';
  },
  render: function() {
    return (
      <div>
        source data: {this.getSource()}
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    thing: state.get('thing')
  };
}

export const WorkspaceContainer = connect(
  mapStateToProps,
  actionCreators
)(Workspace);
