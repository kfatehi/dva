import { Map, fromJS } from 'immutable';
import * as reducers from '../../src/client/reducers';
import * as actionCreators from '../../src/client/action-creators';
import genUUID from '../../src/uuid';

let data = [{
  "Student": "Alice",
  "Grade": "95"
},{
  "Student": "Bob",
  "Grade": "65"
}]

describe("notebook reducer", () => {
  describe("action APPEND_CELL", () => {
    it("creates first DATA cell", () => {
      let uuid = genUUID();
      var action = actionCreators.appendCell('DATA', {
        name: "Math Gradebook",
        contentType: "application/json",
        data: JSON.stringify(data), uuid
      })

      let nextState = reducers.notebook(undefined, action);

      let cells = nextState.get('cells');
      expect(cells.size).to.equal(1);
      expect(cells.get(0)).to.equal(uuid);

      let cellsById = nextState.get('cellsById');
      expect(cellsById.size === 1);
      expect(cellsById.get(uuid)).to.equal(fromJS({
        name: "Math Gradebook",
        cellType: "DATA",
        data: [{
          "Student": "Alice",
          "Grade": "95"
        },{
          "Student": "Bob",
          "Grade": "65"
        }]
      }));
    });
  });
});
