import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button, ButtonGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export const NewCellButtonGroup = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      appendCell,
      editCell,
      cellPosition,
    } = this.props;
    const newCellActions = [{
      label: 'Append Data',
      icon: 'database',
      handleClick: () => {
        editCell(appendCell('DATA', {
          name: 'New data',
          atIndex: cellPosition+1,
          contentType: "application/json",
          data: JSON.stringify([])
        }).uuid)
      }
    },{
      label: 'Append Transformation',
      icon: 'file-code-o',
      handleClick: () => {
        editCell(appendCell('TRANSFORM', {
          atIndex: cellPosition+1,
          name: 'New transform',
        }).uuid)
      }
    },{
      label: 'Append Markdown',
      icon: 'file-text-o',
      handleClick: () => {
        editCell(appendCell('MARKDOWN', {
          atIndex: cellPosition+1,
          markdown: '# New markdown',
        }).uuid)
      }
    },{
      label: 'Append Visualization',
      icon: 'bar-chart',
      handleClick: () => {
        editCell(appendCell('VISUALIZATION', {
          name: 'New visualization',
          atIndex: cellPosition+1
        }).uuid)
      }
    }];
    return (
      <ButtonGroup>{newCellActions.map((action,i) => 
        <Button key={i} title={action.label} onClick={action.handleClick}>
          <FontAwesome name={action.icon} />
          <span className='hidden-sm hidden-xs'> {action.label}</span>
        </Button>)}
      </ButtonGroup>
    );
  }
})
