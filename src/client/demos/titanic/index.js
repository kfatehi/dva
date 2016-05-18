import { appendCell } from '../../action-creators';

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
}
