import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';
import { genVisConfigFromJSON } from '../../vis';
import { toRowColImmutable as toRowCol } from '../data-converter';
import { getModule, getSchema, getExtensions } from '../../extensions';

export const Visualization = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { visExtId, visConfigJSON, getData } = this.props;
    if (! visExtId) return <div>No visualization extension selected.</div>;
    try {
      const data = getData();
      const { rows, columns } = toRowCol(getData())
      const config = genVisConfigFromJSON(visConfigJSON, rows, columns);
      const container = ReactFauxDOM.createElement('svg');
      const { render, style } = getModule(visExtId);
      style.use()
      render(container, config.toJS())
      return <div className="visualization">
        {container.toReact()}
      </div>
    } catch (e) {
      setTimeout(function() {
        throw e;
      }, 0)
      return <pre>{e.stack}</pre>;
    }
  }
})
