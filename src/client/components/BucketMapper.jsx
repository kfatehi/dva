import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DropTargetBucket } from './Bucket';

export const BucketMapper = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    // render a bunch of inputs that i can drag into that are based on this visuzlation's bucket schema
    return (
      <div>{(this.props.buckets || [] ).map(b =>
        <DropTargetBucket key={b.get('key')}
          dragCallback={this.props.dragCallback}
          bucket={b} />)}
      </div>
    );
  }
})
