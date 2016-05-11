import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DragSource } from 'react-dnd';

export const Dimension = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div>{this.props.name}</div>
    );
  }
})

const ItemTypes = {
  DIMENSION: 'dimension'
}

const dimensionSource = {
  beginDrag(props) {
    return {};
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
