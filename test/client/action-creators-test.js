import * as actionCreators from '../../src/client/action-creators';

describe("action creators", () => {
  describe("appendCell", () => {
    it("is type APPEND_CELL", () => {
      var action = actionCreators.appendCell('DATA')
      expect(action.type).to.equal('APPEND_CELL')
    });
    it("generates a UUID", () => {
      var action = actionCreators.appendCell('DATA')
      expect(action.uuid.length).to.be.gt(10);
    });
    it("allows overriding the UUID", () => {
      var action = actionCreators.appendCell('DATA', { uuid: 'hi' })
      expect(action.uuid).to.equal('hi');
    });
  });

  describe("edit", () => {
    it("is type EDIT_CELL", () => {
      let action = actionCreators.editCell('hi');
      expect(action.type).to.equal('EDIT_CELL')
    });
    it("sets the correct uuid", () => {
      let action = actionCreators.editCell('hi');
      expect(action.uuid).to.equal('hi');
    })
  });

  describe("updateCell", () => {
    it("is type UPDATE_CELL", () => {
      var action = actionCreators.updateCell('hi', {});
      expect(action.uuid).to.equal('hi');
      expect(action.type).to.equal('UPDATE_CELL');
    });
    it("stores all params", () => {
      var action = actionCreators.updateCell('hi', {a:'b',c:'d'})
      expect(action.uuid).to.equal('hi');
      expect(action.params.a).to.equal('b');
      expect(action.params.c).to.equal('d');
    });
  });

  describe("cancelEditCell", () => {
    it("is type CANCEL_EDIT_CELL", () => {
      var action = actionCreators.cancelEditCell('hi');
      expect(action.type).to.equal('CANCEL_EDIT_CELL');
      expect(action.uuid).to.equal('hi');
    });
  });

  describe("draggedToBucket", () => {
    it("is type DRAGGED_TO_BUCKET", () => {
      const action = actionCreators.draggedToBucket()
      expect(action.type).to.equal('DRAGGED_TO_BUCKET')
    });

    it("is stores a number and a string", () => {
      const action = actionCreators.draggedToBucket(1, 'foo');
      expect(action.columnIndex).to.equal(1);
      expect(action.bucketKey).to.equal('foo');
    });
  });

  describe("toggleCompressCell", () => {
    it("is type TOGGLE_COMPRESS_CELL", () => {
      var action = actionCreators.toggleCompressCell('hi');
      expect(action.uuid).to.equal('hi');
      expect(action.type).to.equal('TOGGLE_COMPRESS_CELL');
    });
  });

  describe("removeCell", () => {
    it("is type REMOVE_CELL", () => {
      var action = actionCreators.removeCell('hi');
      expect(action.uuid).to.equal('hi');
      expect(action.type).to.equal('REMOVE_CELL');
    });
  });
});
