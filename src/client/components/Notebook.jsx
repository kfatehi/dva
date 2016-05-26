import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { DataCell } from './DataCell';
import { TransformCell } from './TransformCell';
import { VisualizationCell } from './VisualizationCell';
import { MarkdownCell } from './MarkdownCell';
import { NewCellButtonGroup } from './NewCellButtonGroup';
import { NotebookHeaderContainer } from './NotebookHeader';

import { Grid, Row, Col, Button } from 'react-bootstrap';

import './Notebook.less';

export const Notebook = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    if (this.props.isLoading) 
      this.props.loadNotebook(this.props.params.id);
  },
  componentWillUnmount: function() {
    this.props.unsetNotebook();
  },
  render: function() {
    const {
      cells,
      cellsById,
      cellType,
      isLoading
    } = this.props;
    const header = <NotebookHeaderContainer />;
    const renderCell = (id) => {
      const cellType = cellsById.getIn([id, 'cellType'])
      switch (cellType) {
        case 'DATA':
          return <DataCell cellId={id} />
        case 'TRANSFORM':
          return <TransformCell cellId={id} />
        case 'VISUALIZATION':
          return <VisualizationCell cellId={id} />
        case 'MARKDOWN':
          return <MarkdownCell cellId={id} />
        default:
          return <div>Unimplemented Cell Type {}</div>;
      }
    }
    if (isLoading) {
      return <div>Loading...</div>
    } else {
      if (cells.size === 0) {
        return <div>
          {header}
          <NewCellButtonGroup cellPosition={-1} {...this.props} />
        </div>;
      } else {
        return (
          <Grid className="notebook">{header}{ cells.map(id =>
            <Row className="cell" key={id}>
              {renderCell(id)}
            </Row>)}
          </Grid>
        );
      }
    }
  }
})

function mapStateToProps(state, props) {
  const id = props.params.id;
  const isNew = props.params.id === 'new';
  const notebook = state.get('notebook');
  const loadedId = notebook.get('uuid');
  const isLoading = isNew ? false : id !== loadedId;
  const cells = notebook.get('cells', List());
  const cellsById = notebook.get('cellsById', Map());
  return {
    isLoading,
    cells,
    cellsById,
  };
}

export const NotebookContainer = connect(
  mapStateToProps,
  actionCreators
)(Notebook);
