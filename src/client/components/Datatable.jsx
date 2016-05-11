import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// http://oli.me.uk/2015/09/09/d3-within-react-the-right-way/
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

  /*
import * as barchart from '../../extensions/com.keyvan.barchart';

const renderTable = (container, columns, rows) => {
let container = ReactFauxDOM.createElement('svg');
  barchart.render(container, {
    height: 500,
    width: 200,
    data: [{
      group: 'stuff',
      value: .9
    },{
      group: 'moar',
      value: .5
    },{
      group: 'mo22ar',
      value: .7
    }]
  })
}
*/

const renderTable = (container, columns, rows) => {
  var table = d3.select(container)
    .append("table")

  // render head
  table.append('thead').append("tr")
    .selectAll("td").data(columns).enter().append('td').text(d=>d)

  // render body
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
