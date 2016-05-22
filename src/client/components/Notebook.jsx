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

import { Grid, Row } from 'react-bootstrap';

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
      isLoading
    } = this.props;
    const renderCell = (id) => {
      switch (cellsById.getIn([id, 'cellType'])) {
        case 'DATA':
          return <DataCell cellId={id} />
        case 'TRANSFORM':
          return <TransformCell cellId={id} />
        case 'VISUALIZATION':
          return <VisualizationCell cellId={id} />
        case 'MARKDOWN':
          return <MarkdownCell cellId={id} />
        default:
          return <div>{id}</div>;
      }
    }
    if (isLoading) {
      return <div> loading </div>
    } else {
      if (cells.size === 0) {
        return <NewCellButtonGroup cellPosition={-1} {...this.props} />
      } else {
        return (
          <Grid className="notebook">{ cells.map(id =>
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
  const loadedId = state.getIn(['notebook', 'uuid']);
  return {
    isLoading: isNew ? false : id !== loadedId,
    cells: state.getIn(['notebook', 'cells']) || List(),
    cellsById: state.getIn(['notebook', 'cellsById']) || Map()
  };
}

export const NotebookContainer = connect(
  mapStateToProps,
  actionCreators
)(Notebook);

// JSON.stringify($r.props.store.getState().get('notebook').toJS(), null, 2)
