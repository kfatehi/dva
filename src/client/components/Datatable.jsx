import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

const renderTable = (container, columns, rows) => {
  var table = d3.select(container)
    .append("table")

  table.append('thead').append("tr")
    .selectAll("td").data(columns.toJS()).enter().append('td').text(d=>d)

  table.append('tbody')
    .selectAll("tr").data(rows.toJS()).enter().append("tr")
    .selectAll("td").data(d=>d).enter().append("td").text(d=>d)
}

export const Datatable = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    console.log(this.props);
    if (this.props.columns && this.props.rows) {
      let el = ReactFauxDOM.createElement('div');
      renderTable(el, this.props.columns, this.props.rows);
      return el.toReact();
    } else {
      return null;
    }
  }
})
