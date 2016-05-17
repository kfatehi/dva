import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button, ButtonGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export const NewCellButtonGroup = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const {
      appendCell,
      cellPosition,
    } = this.props;
    const newCellActions = [{
      label: 'Append Data',
      icon: 'database',
      handleClick: () => {
        return appendCell('DATA', {
          name: 'New data',
          atIndex: cellPosition+1,
          contentType: "application/json",
          data: JSON.stringify([])
        })
      }
    },{
      label: 'Append Transformation',
      icon: 'file-code-o',
      handleClick: () => {
        return appendCell('TRANSFORM', {
          atIndex: cellPosition+1,
          name: 'New transform',
        })
      }
    },{
      label: 'Append Markdown',
      icon: 'file-text-o',
      handleClick: () => {
        return appendCell('MARKDOWN', {
          atIndex: cellPosition+1,
          markdown: '# New markdown',
        })
      }
    },{
      label: 'Append Visualization',
      icon: 'bar-chart',
      handleClick: () => {
        return appendCell('VISUALIZATION', {
          name: 'New visualization',
          atIndex: cellPosition+1
        })
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
