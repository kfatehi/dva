import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Grid, Row } from 'react-bootstrap';

import { Link } from 'react-router';

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { notebooks } = this.props;
    console.log(notebooks.toJS());
    return (
      <div>
        <Link to={`/notebook/new`}>New Notebook</Link>
        <ul>{ notebooks.map(nb =>
          <li key={nb.get('uuid')}>
            <Link
              to={`/notebook/${nb.get('uuid')}`}>
              {nb.get('name')}
            </Link>
          </li>)}
        </ul>
      </div>
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
