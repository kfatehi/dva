import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

import * as barchart from '../../extensions/com.keyvan.barchart';

export const Visualization = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let config = this.props.config.toJS()
    console.log(config);
    let container = ReactFauxDOM.createElement('svg');
    try {
      barchart.render(container, this.props.config.toJS())
      return container.toReact()
    } catch (e) {
      return null;
    }
  }
})
