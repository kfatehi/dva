import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';


export const Visualization = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let config = this.props.config.toJS()
    let container = ReactFauxDOM.createElement('svg');
    try {
      this.props.extension.render(container, this.props.config.toJS())
      return <div className="visualization">
        {container.toReact()}
      </div>
    } catch (e) {
      return null;
    }
  }
})
