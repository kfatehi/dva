var jsonString = JSON.stringify([{
  "Student": "Alice",
  "Grade": "95"
},{
  "Student": "Bob",
  "Grade": "89"
}])

{
  type: "APPEND_CELL",
  name: "Gradebook",
  cellType: "DATA",
  contentType: "application/json"
  data: jsonString
}

// no notebook loaded

{
  notebook: null
}

// List out available notebooks

{
  publicNotebooks: [{
    id: '4ea8af4f-8d38-49e1-9db2-e25087e230eb'
  }],
  myNotebooks: [{
    id: '0787c045-f5ad-4ef6-9db1-16402b619c15'
  }]
}



// a notebook is loaded

{
  notebook: {
    id: '047836d9-d37a-4eb6-b7a0-27e51d3cdabc',
    editingCell: null, // id of cell in edit mode
    cells: [
      'c64e714b-798a-465f-ad2d-827995da9087',
      '24066b02-a089-47cf-a15a-4aa34db7ef81',
      '81ff74ac-bba6-4f33-beec-63ebfb021c9d',
      '76f3bf01-b4f9-44e8-8848-e907cd7a3e77',
      'ac41f073-d928-40e1-9495-029c900fa32a',
      'cfb8e701-c1a1-4a3c-91fb-094fc863eaba',
      'c522c2ae-b24b-4bbd-8633-3311c6b78c8d',
      'e5374b05-61ae-41eb-a090-f24b2cdfd194',
      '31a4dc9e-ea97-44b2-8095-bb42d2458ce5',
      'dc18fc21-78c4-4131-84a6-86f8340b87cf',
    ],
    cellsById: {
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
      '24066b02-a089-47cf-a15a-4aa34db7ef81': {
        name: "Science Gradebook",
        cellType: "DATA",
        data: [{
          "Student": "Alice",
          "Grade": "56"
        },{
          "Student": "Bob",
          "Grade": "95"
        }]
      },
      '81ff74ac-bba6-4f33-beec-63ebfb021c9d':{
        active: true,
        cellType: "TRANSFORM",
        name: "Math Grades to decimal",
        parentId: 'c64e714b-798a-465f-ad2d-827995da9087',
        func: `return data.map( row => row.update('Grade', grade => parseInt(grade) / 100 ) )`
      },
      '76f3bf01-b4f9-44e8-8848-e907cd7a3e77': { 
        active: true,
        cellType: "TRANSFORM",
        name: "Science Grades to decimal",
        parentId: '24066b02-a089-47cf-a15a-4aa34db7ef81',
        func: `return data.map( row => row.update('Grade', grade => parseInt(grade) / 100 ) )`
      },
      'ac41f073-d928-40e1-9495-029c900fa32a':{
        cellType: "JOIN",
        name: "Gradebook",
        dataSources: ['81ff74ac-bba6-4f33-beec-63ebfb021c9d', '76f3bf01-b4f9-44e8-8848-e907cd7a3e77']
        func: `return a.map((row, i) => Map({ "Student": row.get('Student'), "Math Grade": row.get('Grade'), "Science Grade": b.get(i).get('Grade') }))`
      },
      'cfb8e701-c1a1-4a3c-91fb-094fc863eaba':{
        active: true,
        cellType: "TRANSFORM",
        name: "Add Dimension: Pass/Fail",
        parentId: '81ff74ac-bba6-4f33-beec-63ebfb021c9d',
        func: `return data.map( row => row.update('Letter', () => row.get('Grade') > .7 ? 'PASS' : 'FAIL' ) )`
      },
      'c522c2ae-b24b-4bbd-8633-3311c6b78c8d':{
        active: true,
        cellType: "TRANSFORM",
        name: "Filter Rows: Only Failures",
        parentId: 'cfb8e701-c1a1-4a3c-91fb-094fc863eaba',
        func: `return data.filter( row => row.get('Letter') === 'FAIL' )`
      },
      'e5374b05-61ae-41eb-a090-f24b2cdfd194': {
        active: true,
        cellType: "TRANSFORM",
        name: "Filter Rows: Only Passes",
        parentId: 'cfb8e701-c1a1-4a3c-91fb-094fc863eaba',
        func: `return data.filter( row => row.get('Letter') === 'PASS' )`
      },
      '31a4dc9e-ea97-44b2-8095-bb42d2458ce5': {
        cellType: "VISUALIZATION",
        name: "The shitty students",
        parentId: 'c522c2ae-b24b-4bbd-8633-3311c6b78c8d',
        vizExtId: 'my.barchart',
        vizConfig: {}
      },
      'dc18fc21-78c4-4131-84a6-86f8340b87cf': {
        cellType: "VISUALIZATION",
        name: "The good students",
        parentId: 'e5374b05-61ae-41eb-a090-f24b2cdfd194',
        vizExtId: 'my.barchart',
        vizConfig: {}
      }
    }
  }
}

cellToDelID

hasDeps = cells.find((cell ) => cell.parentId === cellToDelId)



