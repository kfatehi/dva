import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../item-types';

export const Dimension = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div>{this.props.name}</div>
    );
  }
})

const dimensionSource = {
  beginDrag(props) {
    return {};
  },
  endDrag(props, monitor, component) {
    let result = monitor.getDropResult();
    if (result) {
      result.dragCallback(props.columnIndex, result.bucketKey)
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

Dimension.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export const DraggableDimension = DragSource(ItemTypes.DIMENSION, dimensionSource, collect)(Dimension);
