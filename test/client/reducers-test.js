import { Map, fromJS } from 'immutable';
import * as reducers from '../../src/client/reducers';
import * as actionCreators from '../../src/client/action-creators';
import genUUID from '../../src/uuid';

let gradebookData = [{
  "Student": "Alice",
  "Grade": "95"
},{
  "Student": "Bob",
  "Grade": "65"
}]

let appendDataCellAction = (data) =>
  actionCreators
    .appendCell('DATA', {
      name: "Math Gradebook",
      contentType: "application/json",
      data: JSON.stringify(data),
      uuid: genUUID()
    })

describe("notebook reducer", () => {
  describe("action APPEND_CELL", () => {

    it("creates first DATA cell", () => {
      let action = appendDataCellAction(gradebookData)
      let nextState = reducers.notebook(undefined, action);

      let cells = nextState.get('cells');
      expect(cells.size).to.equal(1);
      expect(cells.get(0)).to.equal(action.uuid);

      let cellsById = nextState.get('cellsById');
      expect(cellsById.size === 1);
      expect(cellsById.get(action.uuid)).to.equal(fromJS({
        cellType: "DATA",
        name: action.name,
        data: gradebookData
      }));
    });

    it("creates a TRANSFORM cell with parent DATA cell", () => {
      let action1 = appendDataCellAction(gradebookData);
      let initialState = reducers.notebook(undefined, action1);
      let action2 = actionCreators.appendCell('TRANSFORM', {
        name: "Math Grades to decimal",
        parentId: action1.uuid,
        func: `return data.map( row => row.update('Grade', grade => parseInt(grade) / 100 ) )`,
        uuid: genUUID()
      });
      let nextState = reducers.notebook(initialState, action2);

      let cells = nextState.get('cells');
      expect(cells.size).to.equal(2);
      expect(cells.get(1)).to.equal(action2.uuid);

      let cellsById = nextState.get('cellsById');
      expect(cellsById.size === 2);
      expect(cellsById.get(action2.uuid)).to.equal(fromJS({
        cellType: 'TRANSFORM',
        name: action2.name,
        parentId: action2.parentId,
        func: action2.func
      }));
    });

    it("creates a VISUALIZATION cell with parent DATA cell", () => {
      let action1 = appendDataCellAction(gradebookData);
      let initialState = reducers.notebook(undefined, action1);
      let action2 = actionCreators.appendCell('VISUALIZATION', {
        name: 'Gradebook Plot',
        parentId: action1.uuid
      })
      let nextState = reducers.notebook(initialState, action2);
      let cells = nextState.get('cells');
      expect(cells.size).to.equal(2);
      expect(cells.get(1)).to.equal(action2.uuid);

      let cellsById = nextState.get('cellsById');
      expect(cellsById.size === 2);
      let cell = cellsById.get(action2.uuid);
      expect(cell.get('cellType')).to.equal('VISUALIZATION');
    });
  });

  describe("cell mutation", () => {
    let initialState = null;

    beforeEach(function() {
      let a = appendDataCellAction(gradebookData);
      let b = actionCreators.appendCell('TRANSFORM', {
        name: '', parentId: a.uuid, func: '', uuid: 'b'
      });
      initialState = [a,b].reduce(reducers.notebook, Map({}));
    })

    describe("action EDIT_CELL", () => {
      it("flags a field on the notebook to indicate this cell is under edit", () => {
        let action = actionCreators.editCell('b');
        let nextState = reducers.notebook(initialState, action);
        expect(nextState.get('editingCell')).to.equal('b');
      });
    });

    describe("action CANCEL_EDIT_CELL", () => {
      it("unsets flag indicating the cell is no longer under edit", () => {
        let action = actionCreators.cancelEditCell('x');
        let nextState = reducers.notebook(initialState, action);
        expect(nextState.get('editingCell')).to.equal(undefined);
      });
    });

    describe("action UPDATE_CELL", () => {
      it("updates multiple fields on a cell", () => {
        let action = actionCreators.updateCell('x', {a:1,b:2});
        let nextState = reducers.notebook(initialState, action);
        expect(nextState.getIn(['cellsById', 'x', 'a'])).to.equal(1);
        expect(nextState.getIn(['cellsById', 'x', 'b'])).to.equal(2);
      });

      it("unsets flag indicating the cell is no longer under edit", () => {
        let action = actionCreators.updateCell('x', {a:1,b:2});
        let nextState = reducers.notebook(initialState, action);
        expect(nextState.get('editingCell')).to.equal(undefined);
      });
    });
  });
});
