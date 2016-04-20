import React from 'react';

class TableComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    return (<table>
      <thead>
        <tr onClick={this.props.onTitleClick}>
          <th style={ {color: this.props.title.color} }>
            {this.props.title.text}
          </th>
        </tr>
      </thead>
      <tbody>
        {this.props.rows.map(function (text, idx) {
          return (<tr key="{idx}">
              <td>{text}</td>
          </tr>);
        })}
      </tbody>
    </table>);
  }
}

TableComponent.PropTypes = {
  title: React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired
  }),
  rows: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  onTitleClick: React.PropTypes.function
};

export default TableComponent;
