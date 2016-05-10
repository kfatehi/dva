import reducer from '../../src/client/reducer';
import { Map, fromJS } from 'immutable';

let data = [{
  "Category": "A",
  "Grade": "95"
},{
  "Category": "B",
  "Grade": "88"
}]

describe("client-side reducer", () => {
  it("handles SET_SOURCE_DATA", () => {
    let nextState = reducer(undefined, {
      type: 'SET_SOURCE_DATA',
      columns: ['Category', 'Grade'],
      rows: [['A', '95'], ['B', '88']],
    })
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
});
