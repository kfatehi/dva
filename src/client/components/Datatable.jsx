import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

const renderTable = (container, columns, rows) => {
  var table = d3.select(container)
    .append("table")

  table.append('thead').append("tr")
    .selectAll("td").data(columns).enter().append('td').text(d=>d)

  table.append('tbody')
    .selectAll("tr").data(rows).enter().append("tr")
    .selectAll("td").data(d=>d).enter().append("td").text(d=>d)
}

export const Datatable = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    if (this.props.columns && this.props.rows) {
      let el = ReactFauxDOM.createElement('div');
      renderTable(el, this.props.columns.toJS(), this.props.rows.toJS());
      return el.toReact();
    } else {
      return null;
    }
  }
})
