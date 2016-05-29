import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ItemTypes } from '../item-types';
import { DropTarget } from 'react-dnd';
import {DraggableDimension} from './Dimension';
import FontAwesome from 'react-fontawesome';  

import './Bucket.less';

const bucketTarget = {
  drop(props) {
    return {
      dragCallback: props.dragCallback,
      bucketKey: props.bucket.key
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
    const {
      connectDropTarget,
      isOver,
      items,
      bucket: { key, label },
      removeFromBucket
    } = this.props;
    return connectDropTarget(
      <div className="bucket">
        <label>{label}</label>
        <ul>{items.map((item, i) =>
          <li key={item.columnIndex}>
            <DraggableDimension ucolumnIndex={item.columnIndex} name={item.name} />
            <span
              className="remove"
              onClick={() => removeFromBucket(key, i, item.columnIndex)}>
              <FontAwesome className="text-primary" name="minus" />
            </span>
          </li>)}
        </ul>
      </div>
    );
  }
})

export const DropTargetBucket = DropTarget(ItemTypes.DIMENSION, bucketTarget, collect)(Bucket);
