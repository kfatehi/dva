import getCellData, { isCircular } from '../../src/client/get-cell-data';

import { fromJS } from 'immutable';

describe("getCellData", () => {
  let cellsById = fromJS({
    'c64e714b-798a-465f-ad2d-827995da9087':{
      name: "Math Gradebook",
      cellType: "DATA",
      data: [{
        "Student": "Alice",
        "Grade": "95"
      },{
        "Student": "Bob",
        "Grade": "65"
      }]
    },
    '81ff74ac-bba6-4f33-beec-63ebfb021c9d':{
      name: "Math Grades to decimal",
      cellType: "TRANSFORM",
      parentId: 'c64e714b-798a-465f-ad2d-827995da9087',
      func: `return data.map( row => row.update('Grade', grade => parseInt(grade) / 100 ) )`
    },
    'cfb8e701-c1a1-4a3c-91fb-094fc863eaba':{
      name: "Add Dimension: Pass/Fail",
      cellType: "TRANSFORM",
      parentId: '81ff74ac-bba6-4f33-beec-63ebfb021c9d',
      func: `return data.map( row => row.update('PF', () => row.get('Grade') > .7 ? 'PASS' : 'FAIL' ) )`
    },
    'e5374b05-61ae-41eb-a090-f24b2cdfd194': {
      cellType: "TRANSFORM",
      name: "Filter Rows: Only Passes",
      parentId: 'cfb8e701-c1a1-4a3c-91fb-094fc863eaba',
      func: `return data.filter( row => row.get('PF') === 'PASS' )`
    },
    '62e87ecd-1ea9-4c2c-bc2d-9eb47e528346': {
      cellType: "TRANSFORM",
      name: "Just a Lib Test",
      parentId: 'cfb8e701-c1a1-4a3c-91fb-094fc863eaba',
      func: `return data.map( row => List.of(1) )`
    },
    'fbab120b-a409-4dc4-b8c2-dc1fdf65a1a1': {
      cellType: "VISUALIZATION",
      name: "Good Students",
      parentId: 'e5374b05-61ae-41eb-a090-f24b2cdfd194',
    }
  });

  it("can get data from a DATA cell", () => {
    let data = getCellData(cellsById, 'c64e714b-798a-465f-ad2d-827995da9087');
    expect(data).to.equal(fromJS([{
      "Student": "Alice",
      "Grade": "95"
    },{
      "Student": "Bob",
      "Grade": "65"
    }]))
  });

  it("can get data from a mutating TRANSFORM cell 1 level deep", () => {
    let data = getCellData(cellsById, '81ff74ac-bba6-4f33-beec-63ebfb021c9d');
    expect(data).to.equal(fromJS([{
      "Student": "Alice",
      "Grade": 0.95
    },{
      "Student": "Bob",
      "Grade": 0.65
    }]))
  });

  it("can get data from a calculating TRANSFORM cell 2 levels deep", () => {
    let data = getCellData(cellsById, 'cfb8e701-c1a1-4a3c-91fb-094fc863eaba');
    expect(data).to.equal(fromJS([{
      "Student": "Alice",
      "Grade": 0.95,
      "PF": "PASS"
    },{
      "Student": "Bob",
      "Grade": 0.65,
      "PF": "FAIL"
    }]))
  });

  it("can get data from a filtering TRANSFORM cell 3 levels deep", () => {
    let data = getCellData(cellsById, 'e5374b05-61ae-41eb-a090-f24b2cdfd194');
    expect(data).to.equal(fromJS([{
      "Student": "Alice",
      "Grade": 0.95,
      "PF": "PASS"
    }]))
  });

  it("can use immutable", () => {
    let data = getCellData(cellsById, '62e87ecd-1ea9-4c2c-bc2d-9eb47e528346');
    expect(data).to.equal(fromJS([ [1], [1] ]))
  });

  it("can override the function", () => {
    let data = getCellData(cellsById, 'e5374b05-61ae-41eb-a090-f24b2cdfd194', {
      funcOverride: 'return "hi"'
    });
    expect(data).to.equal('hi');
  });

  it("can override the parent", () => {
    let data = getCellData(cellsById, 'fbab120b-a409-4dc4-b8c2-dc1fdf65a1a1', {
      parentOverride: '81ff74ac-bba6-4f33-beec-63ebfb021c9d'
    });
    expect(data).to.equal(fromJS([{
      "Student": "Alice",
      "Grade": 0.95,
    },{
      "Student": "Bob",
      "Grade": 0.65,
    }]))
  });


  it("can get data from a VISUALIZATION cell 4 levels deep", () => {
    let data = getCellData(cellsById, 'fbab120b-a409-4dc4-b8c2-dc1fdf65a1a1');
    expect(data).to.equal(fromJS([{
      "Student": "Alice",
      "Grade": 0.95,
      "PF": "PASS"
    }]))
  });

  describe("isCircular", () => {
    it("can test if a parent change would cause a circular dependency", () => {
      let cellId = '81ff74ac-bba6-4f33-beec-63ebfb021c9d';
      let badParent = 'e5374b05-61ae-41eb-a090-f24b2cdfd194';
      let circularCellsById = cellsById
        .updateIn([cellId, 'parentId'], () => badParent);
      expect(isCircular(circularCellsById, cellId)).to.equal(true);
    });
  });
});
