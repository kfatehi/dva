import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Grid, Row, Col, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { NotebookHeaderEditorForm } from './NotebookHeaderEditor';

export const NotebookHeader = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      name,
      isPublic,
      isEditing,
      editNotebook,
      cancelEditNotebook,
      updateNotebook,
    } = this.props;
    let cleanData = done => data => {
      return done(Object.assign({}, data, {
        isPublic: String(data.isPublic) === 'true' ? true : false
      }))
    }
    return (
      <Row>
        <Col xs={12}>{
          isEditing ?
            <NotebookHeaderEditorForm
              initialValues={{ name, isPublic }}
              onSubmit={cleanData(updateNotebook)}
              handleCancel={cancelEditNotebook}
            />
            :
          <div>
            <p>Name: {name}</p>
            <span><FontAwesome name={isPublic ? 'eye' : 'eye-slash'}/> {isPublic ? 'Public' : 'Private'}</span>
            <Button title="Edit" onClick={editNotebook}><FontAwesome name='pencil'/></Button>
          </div>}
      </Col>
    </Row>
    );
  }
})

function mapStateToProps(state, props) {
  const notebook = state.get('notebook');
  const name = notebook.get('name', 'Untitled');
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
