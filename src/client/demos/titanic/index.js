import { appendCell, updateCell } from '../../action-creators';

import './style.less';

function replaceAll(str, map) {
  return Object.keys(map).reduce((str, key) => {
    return str.replace(key, map[key]);
  }, str);
}

export default function(dispatch) {
  const README = dispatch(appendCell('MARKDOWN', {
    markdown: replaceAll(require('./README.md'), {
      '{ship}': require('./RMS_Titanic_3.jpg'),
      '{lifeboat}': require('./Titanic-lifeboat.gif')
    })
  }))

  const DATA = dispatch(appendCell('DATA', {
    name: 'titanic3.csv',
    parser: 'csv',
    data: require('./data.csv')
  }));

  const REDUCE = dispatch(appendCell('TRANSFORM', {
    name: 'Survivors and Non-survivors by Passenger Class',
    parentId: DATA.uuid,
    func: `
return fromJS(data.toJS().reduce((list, row) => {
  let { pclass, survived } = row;
  if (pclass === '') return list;
  pclass = 'Class '+pclass;
  survived = survived === '1' ? 'YES' : 'NO';
  let idx = list.findIndex(row=> {
    return row.pclass===pclass && row.survived===survived;
  });
  if (idx !== -1) {
    list[idx].count++;
    return list;
  } else
    return list.concat({
      pclass: pclass,
      survived: survived,
      count:1
    });
  return list;
}, []));
    `
  }));

  const SANKEY1 = dispatch(appendCell('VISUALIZATION', {
    parentId: REDUCE.uuid,
    name: REDUCE.name,
  }))

  dispatch(updateCell(SANKEY1.uuid, {
    visExtId: "com.brett.sankeyV2",
    visConfigJSON: "{\"config\":{},\"bucketMapping\":{\"bucketMap\":{\"source\":[\"pclass\"],\"target\":[\"survived\"],\"value\":[\"count\"]},\"columnMap\":{\"0\":\"source\",\"1\":\"target\",\"2\":\"value\"}}}"
  }))
}
