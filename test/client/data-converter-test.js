import { fromJS } from 'immutable';
import { toRowCol, toRowColImmutable } from '../../src/client/data-converter';

describe("data converter", () => {
  describe("toRowCol", () => {
    it("converts a list of row maps to an object with list columns and list rows", () => {
      let data = [{
        "Student": "Alice",
        "Grade": "95"
      },{
        "Student": "Bob",
        "Grade": "65"
      }]
      let { rows, columns } = toRowCol(data);
      expect(columns).to.deep.equal(['Student', 'Grade']);
      expect(rows).to.deep.equal([['Alice','95'],['Bob','65']]);
    });
  });

  describe("toRowColImmutable", () => {
    it("converts a list of row maps to an object with list columns and list rows", () => {
      let data = fromJS([{
        "Student": "Alice",
        "Grade": "95"
      },{
        "Student": "Bob",
        "Grade": "65"
      }])
      let { rows, columns } = toRowColImmutable(data);
      expect(columns).to.equal(fromJS(['Student', 'Grade']));
      expect(rows).to.equal(fromJS([['Alice','95'],['Bob','65']]));
    });
  });
});
