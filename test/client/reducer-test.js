import reducer from '../../src/client/reducer';
import { Map, fromJS } from 'immutable';

import { getSchema } from '../../src/extensions';

import { draggedToBucket } from '../../src/client/action-creators';

let barchartSchema = getSchema('com.keyvan.barchart');

let data = [{
  "Category": "A",
  "Grade": "95"
},{
  "Category": "B",
  "Grade": "88"
}]

let setSourceData = function() {
  return {
    type: 'SET_SOURCE_DATA',
    columns: ['Category', 'Grade'],
    rows: [['A', '95'], ['B', '88']],
  }
}

let setVizSchema = function(schema) {
  return { type: 'SET_VISUALIZATION_SCHEMA', schema };
}

describe("client-side reducer", () => {
  it("handles SET_SOURCE_DATA", () => {
    let nextState = reducer(undefined, setSourceData())
    expect(nextState).to.equal(fromJS({
      data: {
        source: {
          columns: ['Category', 'Grade'],
          rows: [['A', '95'], ['B', '88']]
        },
        transforms: [],
        sink: {
          columns: ['Category', 'Grade'],
          rows: [['A', '95'], ['B', '88']],
          measures: [1],
          dimensions: [0]
        }
      }
    }))
  });

  it("handles SET_VISUALIZATION_EXTENSIONS with one extension", () => {
    let nextState = reducer(undefined, {
      type: 'SET_VISUALIZATION_EXTENSIONS',
      extensions: [{
        "id": "barchart",
        "description": "Simple barchart"
      }]
    });

    expect(nextState).to.equal(fromJS({
      viz: {
        available: [{
          "id": "barchart",
          "description": "Simple barchart"
        }],
      }
    }))
  });

  it("handles SET_VISUALIZATION_EXTENSIONS with multiple extensions", () => {
    let nextState = reducer(undefined, {
      type: 'SET_VISUALIZATION_EXTENSIONS',
      extensions: [{
        "id": "barchart",
        "description": "Simple barchart"
      },{
        "id": "sankey",
        "description": "simply sankey"
      }]
    });

    expect(nextState).to.equal(fromJS({
      viz: {
        available: [{
          "id": "barchart",
          "description": "Simple barchart"
        },{
          "id": "sankey",
          "description": "simply sankey"
        }],
      }
    }))
  });

  describe("handling of SET_VISUALIZATION_SCHEMA", () => {
    it("sets the actual selected viz extension by id", () => {
      let nextState = reducer(undefined, setVizSchema(barchartSchema)) 

      expect(nextState.getIn(['viz', 'selected', 'id'])).to.equal('com.keyvan.barchart');
    });

    it("sets the buckets", () => {
      let nextState = reducer(undefined, setVizSchema(barchartSchema));

      expect(nextState.getIn(['viz', 'selected', 'buckets'])).to.equal(fromJS(
        barchartSchema.buckets
      ));
    });

    it("creates the empty bucket mapping", () => {
      let nextState = reducer(undefined, setVizSchema(barchartSchema));

      let bucketMapping = nextState.getIn(['viz', 'selected', 'bucketMapping']);
      expect(bucketMapping).to.equal(fromJS({
        columnMap: {},
        bucketMap: {
          'group': [],
          'value': []
        }
      }));
    });
  });

  describe("handles DRAGGED_TO_BUCKET", () => {
    it("updates the bucket mapping", () => {
      let actions = [ setSourceData(), setVizSchema(barchartSchema) ];
      let currentState = actions.reduce(reducer, Map());
      let nextState = reducer(currentState, draggedToBucket(0, 'group'))
      let bucketMapping = nextState.getIn(['viz', 'selected', 'bucketMapping']);
      expect(bucketMapping).to.equal(fromJS({
        columnMap: {
          '0': 'group'
        },
        bucketMap: {
          'group': ['Category'],
          'value': []
        }
      }));
    });

    it("prevents the same dimension twice in the same bucket", () => {
      let actions = [
        setSourceData(), setVizSchema(barchartSchema),
        draggedToBucket(0, 'group'),
        draggedToBucket(0, 'group')
      ];
      let state = actions.reduce(reducer, Map());
      expect(
        state.getIn(['viz', 'selected', 'bucketMapping'])
      ).to.equal(fromJS({
        columnMap: {
          '0': 'group'
        },
        bucketMap: {
          'group': ['Category'],
          'value': []
        }
      }));
    });

    it("moves the dimension when mapped twice in different buckets", () => {
      let actions = [
        setSourceData(), setVizSchema(barchartSchema),
        draggedToBucket(0, 'group'),
        draggedToBucket(0, 'value')
      ];
      let state = actions.reduce(reducer, Map());
      expect(
        state.getIn(['viz', 'selected', 'bucketMapping'])
      ).to.equal(fromJS({
        columnMap: {
          '0': 'value'
        },
        bucketMap: {
          'group': [],
          'value': ['Category']
        }
      }));
    });

    it("can map another dimension to a different bucket", () => {
      let actions = [
        setSourceData(), setVizSchema(barchartSchema),
        draggedToBucket(0, 'group'),
        draggedToBucket(1, 'value')
      ];
      let state = actions.reduce(reducer, Map());
      expect(
        state.getIn(['viz', 'selected', 'bucketMapping'])
      ).to.equal(fromJS({
        columnMap: {
          '0': 'group',
          '1': 'value'
        },
        bucketMap: {
          'group': ['Category'],
          'value': ['Grade']
        }
      }));
    });

    it("does not bug out after a few drags", () => {
      let actions = [
        setSourceData(), setVizSchema(barchartSchema),
        draggedToBucket(1, 'group'),
        draggedToBucket(0, 'group'),
        draggedToBucket(0, 'value')
      ];
      let state = actions.reduce(reducer, Map());
      expect(
        state.getIn(['viz', 'selected', 'bucketMapping'])
      ).to.equal(fromJS({
        columnMap: {
          '1': 'group',
          '0': 'value'
        },
        bucketMap: {
          'group': ['Grade'],
          'value': ['Category']
        }
      }));
    });
  });
});
