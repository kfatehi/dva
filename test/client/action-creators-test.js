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

  describe("editingCell", () => {
    it("is type FLAG_NOTEBOOK", () => {
      let action = actionCreators.editingCell('hi', true)
      expect(action.type).to.equal('FLAG_NOTEBOOK');
    });
    it("sets the editing flag true", () => {
      let action = actionCreators.editingCell('hi', true)
      expect(action.uuid).to.equal('hi');
      expect(action.key).to.equal('editingCell');
      expect(action.value).to.equal(true);
    })
    it("sets the editing flag false", () => {
      var action = actionCreators.editingCell('hi', false)
      expect(action.uuid).to.equal('hi');
      expect(action.key).to.equal('editingCell');
      expect(action.value).to.equal(false);
    });
  });

  describe("updateCell", () => {
    it("is type UPDATE_CELL", () => {
      var action = actionCreators.updateCell('hi', 'func', 'value')
      expect(action.type).to.equal('UPDATE_CELL');
    });
    it("updates a field on the cell", () => {
      var action = actionCreators.updateCell('hi', 'func', 'value')
      expect(action.uuid).to.equal('hi');
      expect(action.key).to.equal('func');
      expect(action.value).to.equal('value');
    });
  });
});
