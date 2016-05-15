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
});
