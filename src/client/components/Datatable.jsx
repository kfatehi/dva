import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactFauxDOM from 'react-faux-dom';
import { toRowColImmutable as toRowCol } from '../data-converter';
import { List } from 'immutable';
import d3 from 'd3';

export const Datatable = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const props = this.props;
    const opts = this.props.tableOpts || {
      maxRows: 10
    }

    function truncateTable(rows, limit) {
      if (limit && limit < rows.size) {
        return {
          rows: rows.take(limit),
          hidden: rows.size-limit
        };
      } else {
        return {rows, hidden: 0};
      }
    }

    function renderTable(allRows, columns) {
      const { rows, hidden } = truncateTable(allRows, opts.maxRows);
      return <div>
        {Table(columns, rows, opts)}
        { hidden > 0 ?
          <span><i>{hidden} additional row{hidden > 1 ? 's' : null} hidden</i></span>
          : null }
      </div>;
    }

    if (props.columns && props.rows) {
      return renderTable(props.rows, props.columns);
    } else if (props.data) {
      if (List.isList(props.data)) {
        try {
          const { rows, columns } = toRowCol(props.data);
          return renderTable(rows, columns);
        } catch (e) {
          return <pre>{e.stack}</pre>;
        }
      } else {
        return <pre>{props.data}</pre>;
      }
    } else {
      return null;
    }
  }
})


const Table = (columns = List(), rows = List()) => {
  if (rows.size === 0) {
    return <span><i>No data to show</i></span>;
  } else {
    let el = ReactFauxDOM.createElement('table');
    let table = d3.select(el);

    table.attr('class', 'table table-bordered table-hover table-condensed');

    table.append('thead').append("tr")
      .selectAll("td").data(columns.toJS())
      .enter().append('td').text(d=>d)

    table.append('tbody')
      .selectAll("tr").data(rows.toJS())
      .enter().append("tr")
      .selectAll("td").data(d=>d).enter().append("td").text(d=>d)

    return el.toReact();
  }
}

