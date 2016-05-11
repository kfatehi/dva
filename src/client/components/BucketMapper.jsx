import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DropTargetBucket } from './Bucket';

export const BucketMapper = React.createClass({
  mixins: [PureRenderMixin],
  getItems: function(b) {
    return this.props.bucketMapping.get(b.get('key')).map((name) => {
      return {
        name,
        columnIndex: this.props.columns.findIndex(n => n===name)
      }
    })
  },
  render: function() {
    // render a bunch of inputs that i can drag into that are based on this visuzlation's bucket schema
    return (
      <div>{(this.props.buckets || [] ).map(b =>
        <DropTargetBucket
          key={b.get('key')}
          dragCallback={this.props.dragCallback}
          items={this.getItems(b)}
          bucket={b}
        />)}
      </div>
    );
  }
})
