import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Grid, Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export const NotebookHeader = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      name,
      isPublic,
      isEditing,
      editNotebook,
      updateNotebook,
    } = this.props;

    let makePrivate = () => updateNotebook({ isPublic: false });
    let makePublic = () => updateNotebook({ isPublic: true });
    if (isEditing) {
      return (
        <Row>
          <Col xs={12}>
            <p>Name: {name}</p>
            {isPublic ?
              <Button title="Edit" onClick={makePrivate}><FontAwesome name='eye-slash'/> Make private</Button>
              :
            <Button title="Edit" onClick={makePublic}><FontAwesome name='eye'/> Make public</Button>
            }
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col xs={12}>
            <p>Name: {name}</p>
            <span><FontAwesome name={isPublic ? 'eye' : 'eye-slash'}/> {isPublic ? 'Public' : 'Private'}</span>
          </Col>
        </Row>
      );
    }
  }
})

function mapStateToProps(state, props) {
  const notebook = state.get('notebook');
  const name = notebook.get('name', 'Untitled');
  console.log(notebook.toJS());
  const isPublic = notebook.get('isPublic', false);
  const isEditing = notebook.get('editingNotebook');
  return {
    name,
    isPublic,
    isEditing
  };
}

export const NotebookHeaderContainer = connect(
  mapStateToProps,
  actionCreators
)(NotebookHeader);
