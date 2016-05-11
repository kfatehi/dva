{
  data: {
    // { type: "SET_SOURCE_DATA", info: {}, columns: [], rows: [] }
    source: {
      columns: ['Student ID', 'Grade'],
      rows: [['1234567', '95'], ['4556788', '88']],
      info: {} // data set metadata, e.g. it's CSV, or MySQL, a timestamp; show or not show a refresh button
    },

    // { type: "SET_TRANSFORMS", mutators: [{ func: '[stringified function body]', type: 'filter' }] }
    transforms: [{
      func: '[stringified function body]',
      type: 'filter' // user can reduce the number of rows with this array of functions
      errors: [], // debugging purposes
    },{
      func: '[stringified function body]',
      type: 'calculation' // user can create, remove, manipulate columns with this array of functions
      errors: [], // debugging purposes
    }],

    sink: {
      // { type: "COMPUTE_SINK_DATA" }
      // this applies all the transforms, resulting in a final, filtered and typed data set
      columns: ['Student ID', 'Grade'],
      rows: [['1234567', '95'], ['4556788', '88']],

      // { type: "SET_COLUMN_TYPE", index: 0, columnType: 'dimension' }
      // this action would allow user to correct/override/set if a column is a measure or dimension
      measures: [], // a list of indices
      dimensions: [], // a list of indices
    }
  },

  viz: {
    available: [{
      id: 'my.barchart',
      schema: {}
    }],

    // { type: "SET_VISUALIZATION_SCHEMA", id: 'my.barchart' }
    selected: {
      id: 'my.barchart',
      buckets: {} // from the schema

      bucketMapping: {},
      props: {},

      config: {} // passed into render
    }
  }
}
