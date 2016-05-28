import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import { List, Map, fromJS } from 'immutable';

import { Grid, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router';
import './Home.less';

import FontAwesome from 'react-fontawesome';  

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { notebooks, createNewNotebook } = this.props;
    const colProps = { xs: 12, sm: 4};
    return (
      <div className="notebook-list">
      <h1>My Notebooks</h1>
        <Row>{ notebooks.map(nb =>
          <Col {...colProps} key={nb.get('uuid')}>
            <div className="icon_container">  
              <Link
                  to={`/notebook/${nb.get('uuid')}`}>
                <FontAwesome className="existing_icon" name="bar-chart"  /> <br/> 
                <span className="notebook_name">
                {nb.get('name')}
                </span>
              </Link>
            </div>
          </Col>)}
          <Col {...colProps}>
            <div className="icon_container" style={{cursor:'pointer'}} onClick={createNewNotebook}>
              <FontAwesome className="new_icon" name="plus-square"  /> <br/> 
              <span className="notebook_name">Create New Notebook</span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
})

function mapStateToProps(state) {
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
