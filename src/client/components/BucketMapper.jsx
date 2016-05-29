import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DropTargetBucket } from './Bucket';
import {
  Button, ButtonGroup,
  FormGroup, FormControl,
  ControlLabel, Col, Row
} from 'react-bootstrap';

export const BucketMapper = React.createClass({
  mixins: [PureRenderMixin],
  getItems: function(b) {
    return (this.props.bucketMapping.get(b.key) || []).map((name) => {
      return {
        name,
        columnIndex: this.props.columns.findIndex(n => n===name)
      }
    })
  },
  render: function() {
    return (
      <div>{this.props.buckets.map(b =>
        <DropTargetBucket
          key={b.key}
          dragCallback={this.props.dragCallback}
          items={this.getItems(b)}
          bucket={b}
          removeFromBucket={this.props.removeFromBucket}
        />)}
      </div>
    );
  }
})
