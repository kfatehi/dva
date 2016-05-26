import { Map, fromJS } from 'immutable';
import * as reducers from '../../src/client/reducers';
import * as actionCreators from '../../src/client/action-creators';
import * as serverActionCreators from '../../src/server/action-creators';
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
      parser: "json",
      data: JSON.stringify(data),
      uuid: genUUID()
    })

describe("notebook reducer", () => {
  describe("action APPEND_CELL", () => {

    it("creates a MARKDOWN cell", () => {
      let action = actionCreators.appendCell("MARKDOWN", { markdown: 'hi' })
      let nextState = reducers.notebook(undefined, action);
      let cellsById = nextState.get('cellsById');
      expect(cellsById.size === 1);
      expect(cellsById.get(action.uuid)).to.equal(fromJS({
        cellType: "MARKDOWN",
        markdown: action.markdown
      }));
    });

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
        parser: 'json',
        data: JSON.stringify(gradebookData),
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

    it("creates a cell at an index", () => {
      let action1 = appendDataCellAction(gradebookData);
      let initialState = reducers.notebook(undefined, action1);
      let action2 = actionCreators.appendCell('VISUALIZATION', {
        name: 'Gradebook Plot',
        parentId: action1.uuid,
        atIndex: 0,
      })
      let nextState = reducers.notebook(initialState, action2);
      let cells = nextState.get('cells');
      expect(nextState.getIn(['cells', 0])).to.equal(action2.uuid);
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

    describe("action TOGGLE_COMPRESS_CELL", () => {
      it("flips cell attribute 'isCompressed'", () => {
        let action1 = actionCreators.toggleCompressCell('x');
        let nextState = reducers.notebook(initialState, action1);
        expect(nextState.getIn(['cellsById', 'x', 'isCompressed'])).to.equal(true);
        let action2 = actionCreators.toggleCompressCell('x');
        let nextNextState = reducers.notebook(nextState, action2);
        expect(nextNextState.getIn(['cellsById', 'x', 'isCompressed'])).to.equal(false);
      });
    });

    describe("action REMOVE_CELL", () => {
      it("removes the cell", () => {
        let action1 = actionCreators.appendCell("MARKDOWN", { markdown: '' })
        let initialState = reducers.notebook(undefined, action1);
        let action2 = actionCreators.removeCell(action1.uuid);
        let nextState = reducers.notebook(initialState, action2);
        let cells = nextState.get('cells');
        let cellsById = nextState.get('cellsById');
        expect(cells.size).to.equal(0);
        expect(cellsById.size).to.equal(0);
      });
    });

    describe("actions that move cells", () => {
      let initialState, a, b, c = null;
      let findIndex = (list, elem) => list.findIndex(e=>elem===e);

      beforeEach(function() {
        a = actionCreators.appendCell("MARKDOWN");
        b = actionCreators.appendCell("MARKDOWN");
        c = actionCreators.appendCell("MARKDOWN");
        initialState = [a,b,c].reduce(reducers.notebook, undefined);
      });

      it("starts out in order", () => {
        let cells = initialState.get('cells');
        expect(findIndex(cells, a.uuid)).to.equal(0);
        expect(findIndex(cells, b.uuid)).to.equal(1);
        expect(findIndex(cells, c.uuid)).to.equal(2);
      });

      describe("action MOVE_CELL_UP", () => {
        it("can move 2nd cell up into the 1st position", () => {
          let action =  actionCreators.moveCellUp(b.uuid);
          let nextState = reducers.notebook(initialState, action)
          let cells = nextState.get('cells');
          expect(findIndex(cells, a.uuid)).to.equal(1);
          expect(findIndex(cells, b.uuid)).to.equal(0);
          expect(findIndex(cells, c.uuid)).to.equal(2);
        });
      });

      describe("action MOVE_CELL_DOWN", () => {
        it("can move 2nd cell down into the 3rd position", () => {
          let action =  actionCreators.moveCellDown(b.uuid);
          let nextState = reducers.notebook(initialState, action)
          let cells = nextState.get('cells');
          expect(findIndex(cells, a.uuid)).to.equal(0);
          expect(findIndex(cells, b.uuid)).to.equal(2);
          expect(findIndex(cells, c.uuid)).to.equal(1);
        });
      });
    });
  });

  describe("action SET_NOTEBOOK", () => {
    it("sets the notebook uuid, cells, and cellsById", () => {
      let uuid = 'a';
      let cells = ['b'];
      let cellsById = {'b': 'foo'}
      let action = serverActionCreators.setNotebook({
        uuid, cells, cellsById
      });
      let nextState = reducers.notebook(undefined, action);
      expect(nextState).to.equal(fromJS({
        uuid, cells, cellsById
      }))
    });
  })
});

describe("home reducer", () => {
  describe("action SET_NOTEBOOKS", () => {
    it("sets available notebooks", () => {
      let action = serverActionCreators.setNotebooks([{
        uuid: 'da26c0e5-60a0-49b5-b4dc-a83b91a967be',
        name: 'abc',
      }])

      let nextState = reducers.home(undefined, action);

      expect(nextState.get('notebooks')).to.equal(fromJS([{
        uuid: 'da26c0e5-60a0-49b5-b4dc-a83b91a967be',
        name: 'abc',
      }]))
    });
  });
});
