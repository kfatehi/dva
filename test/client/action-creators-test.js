import * as actionCreators from '../../src/client/action-creators';

describe("action creators", () => {
  describe("appendCell", () => {
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
});
