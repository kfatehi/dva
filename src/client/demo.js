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
  dispatch(d)
  dispatch(e)
  dispatch(actionCreators.editCell(e.uuid));
  dispatch(actionCreators.updateCell(e.uuid, {
    "visExtId": "com.keyvan.barchart",
    "visConfigJSON": "{\"config\":{},\"bucketMapping\":{\"bucketMap\":{\"group\":[\"Student\"],\"value\":[\"Grade\"]},\"columnMap\":{\"0\":\"group\",\"1\":\"value\"}}}"
  }));
}
