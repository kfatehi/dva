import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ItemTypes } from '../item-types';
import { DropTarget } from 'react-dnd';

const bucketTarget = {
  drop(props) {
    return {
      dragCallback: props.dragCallback,
      bucketKey: props.bucket.get('key')
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export const Bucket = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div>{this.props.bucket.get('label')}</div>
    );
  }
})

export const DropTargetBucket = DropTarget(ItemTypes.DIMENSION, bucketTarget, collect)(Bucket);
