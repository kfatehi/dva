import { List } from 'immutable';

export function toRowCol(data) {
  if (data.length > 0) {
    let columns = Object.keys(data[0]);
    let rows = data.map(row=> columns.map(key=>row[key]));
    return { rows, columns };
  } else {
    return { rows: [], columns: [] };
  }
}

export function toRowColImmutable(data) {
  if (data.size > 0) {
    let columns = List(data.get(0).keys());
    let rows = data.map(row=> columns.map(key=>row.get(key)));
    return { rows, columns };
  } else {
    return { rows: List([]), columns: List([]) };
  }
}
