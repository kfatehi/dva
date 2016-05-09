import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

export const FileImport = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <div>
        this is file import
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
  };
}

export const FileImportContainer = connect(
  mapStateToProps,
  actionCreators
)(FileImport);
