import { getDependentCell } from '../../src/client/get-cell-dependencies';
import { fromJS } from 'immutable';

describe("getCellDependencies", () => {
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

  it("returns no deps if no deps", () => {
    let noDeps = 'fbab120b-a409-4dc4-b8c2-dc1fdf65a1a1';
    let dep = getDependentCell(cellsById, noDeps);
    expect(dep).to.equal(null);
  });


  it("returns the dep cell's id if it has one", () => {
    let root = 'c64e714b-798a-465f-ad2d-827995da9087';
    let depId = '81ff74ac-bba6-4f33-beec-63ebfb021c9d';
    let dep = getDependentCell(cellsById, root);
    expect(dep).to.equal(depId);
  });
});
