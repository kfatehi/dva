import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';
import { generateVisConfig } from '../../vis';
import { toRowColImmutable as toRowCol } from '../data-converter';
import { getModule, getSchema, getExtensions } from '../../extensions';

export const Visualization = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { visExtId, visConfigJSON, getData } = this.props;
    const data = getData();
    const { rows, columns } = toRowCol(getData())
    const config = generateVisConfig(visConfigJSON, rows, columns);
    const container = ReactFauxDOM.createElement('svg');
    try {
      getModule(visExtId).render(container, config.toJS())
      return <div className="visualization">
        {container.toReact()}
      </div>
    } catch (e) {
      return <div>{e.stack}</div>;
    }
  }
})
