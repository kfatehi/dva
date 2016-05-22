import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Grid, Row } from 'react-bootstrap';

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { notebooks } = this.props;
    console.log(notebooks.toJS());
    return (
      <Grid>{ notebooks.map(nb =>
        <Row key={nb.get('uuid')}>
          {nb.get('name')}
        </Row>)}
      </Grid>
    );
  }
})

function mapStateToProps(state) {
  console.log(state.toJS());
  const home = state.get('home');
  const notebooks = home.get('notebooks', List());
  return {
    notebooks
  };
}

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home);
