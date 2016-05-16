import * as actionCreators from './action-creators';

export function goodStudents(dispatch) {
  let data = [{
    "Student": "Alice",
    "Grade": "95"
  },{
    "Student": "Bob",
    "Grade": "65"
  }]

  let a = actionCreators.appendCell('DATA', {
    name: "Math Gradebook",
    contentType: "application/json",
    data: JSON.stringify(data)
  })

  let b = actionCreators.appendCell('TRANSFORM', {
    name: "Math Grades to decimal",
    parentId: a.uuid,
    func: `return data.map( row => row.update('Grade', grade => parseInt(grade) / 100 ) )`
  })

  let c = actionCreators.appendCell('TRANSFORM', {
    name: "Add Dimension: Pass/Fail",
    parentId: b.uuid,
    func: `return data.map( row => row.update('PF', () => row.get('Grade') > .7 ? 'PASS' : 'FAIL' ) )`
  })

  let d = actionCreators.appendCell('TRANSFORM', {
    name: "Filter Rows: Only Passes",
    parentId: c.uuid,
    func: `return data.filter( row => row.get('PF') === 'PASS' )`
  })

  let e = actionCreators.appendCell('VISUALIZATION', {
    name: "Good Students",
    parentId: d.uuid
  })


  dispatch(a)
  dispatch(b)
  dispatch(c)
  dispatch(actionCreators.appendCell('MARKDOWN', {
    markdown: `I am _bold_ or **italics** or is it the other way around?`,
    uuid: 'markdown!'
  }))
  dispatch(d)
  dispatch(e)
  dispatch(actionCreators.editCell(e.uuid));
  dispatch(actionCreators.updateCell(e.uuid, {
    "visExtId": "com.keyvan.barchart",
    "visConfigJSON": "{\"config\":{},\"bucketMapping\":{\"bucketMap\":{\"group\":[\"Student\"],\"value\":[\"Grade\"]},\"columnMap\":{\"0\":\"group\",\"1\":\"value\"}}}"
  }));

  //dispatch(
  //  {type: "EDIT_CELL", uuid: "markdown!"}
  //)
}

export function sankey(dispatch) {
  dispatch(actionCreators.appendCell('MARKDOWN', {
    markdown: `# Sankey Demo
This is a demo of a **sankey** visualization. 

## Limitations

Unfortunately due to the nature of \`react-faux-dom\` which we use for d3 rendering
within a _pure React component_, the nodes of the sankey are not draggable.

We hope to iron out this bug in the future without having to compromise the
pure-functional code style used consistently throughout the app.

In the meantime, please enjoy the static version.`
  }))

  let data = [{
    "source": "Barry",
    "target": "Elvis",
    "value": "2"
  },{
    "source": "Frodo",
    "target": "Elvis",
    "value": "2"
  },{
    "source": "Frodo",
    "target": "Sarah",
    "value": "2"
  },{
    "source": "Barry",
    "target": "Alice",
    "value": "2"
  },{
    "source": "Elvis",
    "target": "Sarah",
    "value": "2"
  },{
    "source": "Elvis",
    "target": "Alice",
    "value": "2"
  },{
    "source": "Sarah",
    "target": "Alice",
    "value": "4"
  }]

  let a = actionCreators.appendCell('DATA', {
    name: "Sankey Data",
    contentType: "application/json",
    data: JSON.stringify(data)
  })

  let b = actionCreators.appendCell('TRANSFORM', {
    name: "Test",
    parentId: a.uuid,
    func: `return data`
  })

  let c = actionCreators.appendCell('VISUALIZATION', {
    name: "Sankey Viz",
    parentId: b.uuid
  })

  let d = actionCreators.appendCell('VISUALIZATION', {
    name: "Barchart Viz",
    parentId: b.uuid
  })
  dispatch(a)
  dispatch(b)
  dispatch(c)
  dispatch(d)
  dispatch(actionCreators.updateCell(c.uuid, {
    "visExtId": "com.brett.sankeyV2",
    "visConfigJSON": "{\"config\":{},\"bucketMapping\":{\"bucketMap\":{\"source\":[\"source\"],\"target\":[\"target\"],\"value\":[\"value\"]},\"columnMap\":{\"0\":\"source\",\"1\":\"target\",\"2\":\"value\"}}}"
  }));
  dispatch(actionCreators.updateCell(d.uuid, {
    "visExtId": "com.keyvan.barchart",
    "visConfigJSON": "{\"config\":{},\"bucketMapping\":{\"bucketMap\":{\"group\":[\"source\"],\"value\":[\"value\"]},\"columnMap\":{\"0\":\"source\",\"1\":\"value\"}}}"
  }));
}
