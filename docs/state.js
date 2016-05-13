var jsonString = JSON.stringify([{
  "Student": "Alice",
  "Grade": "95"
},{
  "Student": "Bob",
  "Grade": "89"
}])

{
  notebook: {
    cells: {}
  }
}

{
  type: "APPEND_CELL",
  name: "Gradebook",
  cellType: "DATA",
  contentType: "application/json"
  data: jsonString
}

{
  notebook: {
    cells: {
      'c64e714b-798a-465f-ad2d-827995da9087': {
        name: "Gradebook",
        cellType: "DATA",
        data: [{
          "Student": "Alice",
          "Grade": "95"
        },{
          "Student": "Bob",
          "Grade": "65"
        }]
      },{
      '81ff74ac-bba6-4f33-beec-63ebfb021c9d':{
        active: true,
        type: "TRANSFORM",
        name: "Grades to decimal",
        parentId: 'c64e714b-798a-465f-ad2d-827995da9087',
        func: `return data.map( row => row.update('Grade', grade => parseInt(grade) / 100 ) )`
      },
      'cfb8e701-c1a1-4a3c-91fb-094fc863eaba':{
        active: true,
        type: "TRANSFORM",
        name: "Add Dimension: Pass/Fail",
        parentId: '81ff74ac-bba6-4f33-beec-63ebfb021c9d',
        func: `return data.map( row => row.update('Letter', () => row.get('Grade') > .7 ? 'PASS' : 'FAIL' ) )`
      },
      'c522c2ae-b24b-4bbd-8633-3311c6b78c8d':{
        active: true,
        type: "TRANSFORM",
        name: "Filter Rows: Only Failures",
        parentId: 'cfb8e701-c1a1-4a3c-91fb-094fc863eaba',
        func: `return data.filter( row => row.get('Letter') === 'FAIL' )`
      },
      'e5374b05-61ae-41eb-a090-f24b2cdfd194': {
        active: true,
        type: "TRANSFORM",
        name: "Filter Rows: Only Passes",
        parentId: 'cfb8e701-c1a1-4a3c-91fb-094fc863eaba',
        func: `return data.filter( row => row.get('Letter') === 'PASS' )`
      },
      '31a4dc9e-ea97-44b2-8095-bb42d2458ce5': {
        type: "VISUALIZATION",
        name: "The shitty students",
        parentId: 'c522c2ae-b24b-4bbd-8633-3311c6b78c8d',
        vizExtId: 'my.barchart',
        vizConfig: {}
      },
      'dc18fc21-78c4-4131-84a6-86f8340b87cf': {
        type: "VISUALIZATION",
        name: "The good students",
        parentId: 'e5374b05-61ae-41eb-a090-f24b2cdfd194',
        vizExtId: 'my.barchart',
        vizConfig: {}
      }
    }
  }
}

cellToDelID

hasDeps = cells.find((cell ) => cell.parentId === celltoDelId)



