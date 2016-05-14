import getCellData from '../../src/client/get-cell-data';

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

  it("can get data from a TRANSFORM cell", () => {
    let data = getCellData(cellsById, '81ff74ac-bba6-4f33-beec-63ebfb021c9d');
    expect(data).to.equal(fromJS([{
      "Student": "Alice",
      "Grade": 0.95
    },{
      "Student": "Bob",
      "Grade": 0.65
    }]))
  });
});
