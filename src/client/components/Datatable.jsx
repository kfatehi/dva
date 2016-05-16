import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import { toRowColImmutable as toRowCol } from '../data-converter';
import d3 from 'd3';

export const Datatable = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const props = this.props;
    if (props.columns && props.rows) {
      return Table(props.columns, props.rows);
    } else if (props.data) {
      const { rows, columns } = toRowCol(props.data);
      return Table(columns, rows);
    } else {
      return null;
    }
  }
})


const Table = (columns, rows) => {
  let container = ReactFauxDOM.createElement('div');

  var table = d3.select(container)
    .append("table")

  table.attr('class', 'table table-bordered table-hover table-condensed');

  table.append('thead').append("tr")
    .selectAll("td").data(columns.toJS())
    .enter().append('td').text(d=>d)

  table.append('tbody')
    .selectAll("tr").data(rows.toJS()).enter().append("tr")
    .selectAll("td").data(d=>d).enter().append("td").text(d=>d)

  return container.toReact();
}

