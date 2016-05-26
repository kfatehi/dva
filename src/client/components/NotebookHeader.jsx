import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Grid, Row, Col, Button } from 'react-bootstrap';

export const NotebookHeader = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      name,
      isPublic
    } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <p>Name: {name}</p>
          <p>{isPublic ? 'Public' : 'Private'} Notebook</p>
        </Col>
      </Row>
    );
  }
})

function mapStateToProps(state, props) {
  const notebook = state.get('notebook');
  const name = notebook.get('name', 'Untitled');
  const isPublic = notebook.get('isPublic', false);
  return {
    name,
    isPublic
  };
}

export const NotebookHeaderContainer = connect(
  mapStateToProps,
  actionCreators
)(NotebookHeader);
